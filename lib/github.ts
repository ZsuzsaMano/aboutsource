import { Repository } from "@/types/repo";
import { Octokit } from "octokit";
import { RequestError } from "@octokit/request-error";
import { cacheLife } from "next/cache";
import { throttling } from "@octokit/plugin-throttling";

const MyOctokit = Octokit.plugin(throttling);

const octokit = new MyOctokit({
  auth: process.env.GITHUB_TOKEN,
  throttle: {
    onRateLimit: (retryAfter, options, octokit, retryCount) => {
      octokit.log.warn(
        `Request quota exhausted for request ${options.method} ${options.url}`,
      );

      if (retryCount < 2) {
        octokit.log.info(`Retrying after ${retryAfter} seconds!`);
        return true;
      }
    },
    onSecondaryRateLimit: (retryAfter, options, octokit) => {
      // does not retry, only logs a warning
      octokit.log.warn(
        `SecondaryRateLimit detected for request ${options.method} ${options.url}`,
      );
    },
  },
});

const GITHUB_USERNAME = "ZsuzsaMano";

export async function getRepositories() {
  "use cache";

  cacheLife({
    stale: 0,
    revalidate: 60,
  });

  try {
    const response = await octokit.request("GET /users/{username}/repos", {
      username: GITHUB_USERNAME,
      per_page: 50,
      sort: "pushed",
      direction: "desc",
    });

    const remainingLimit = response.headers["x-ratelimit-remaining"]
      ? parseInt(response.headers["x-ratelimit-remaining"])
      : 0;
    console.log(`The status of the response is: ${response.status}`);
    console.log(`The request URL was: ${response.url}`);
    console.log(
      `The x-ratelimit-remaining response header is: ${response.headers["x-ratelimit-remaining"]}`,
    );
    console.log(remainingLimit);
    console.log("response.data.length", response.data.length);
    if (remainingLimit < response.data.length) {
      throw new Error("rate limit exhausted");
    }

    const repositories: Repository[] = await Promise.all(
      response.data.map(async (repo) => {
        const commitsResponse = await octokit.request(
          "GET /repos/{owner}/{repo}/commits",
          {
            owner: GITHUB_USERNAME,
            repo: repo.name,
            per_page: 1,
          },
        );
        console.log(`The status of the response is: ${commitsResponse.status}`);
        console.log(`The request URL was: ${commitsResponse.url}`);
        console.log(
          `The x-ratelimit-remaining commitsResponse header is: ${commitsResponse.headers["x-ratelimit-remaining"]}`,
        );

        const commit = commitsResponse.data[0];

        console.log("commit.commit.message,", commit.commit.message);

        return {
          id: repo.id,
          name: repo.name,
          url: repo.html_url,
          latestCommit: {
            message: commit.commit.message,
            author: commit.commit.author?.name ?? "Unknown",
            date: commit.commit.author?.date ?? "",
            sha: commit.sha ?? "",
          },
        };
      }),
    );

    return repositories;
  } catch (error) {
    if (error instanceof RequestError) {
      const status = error.response?.status;
      const message = (error.response?.data as { message?: string } | undefined)
        ?.message;
      if (
        status === 403 ||
        error.response?.headers["x-ratelimit-remaining"] === "0"
      ) {
        const remaining = error.response?.headers["x-ratelimit-remaining"];
        console.error(
          `Rate limit hit! Remaining: ${remaining}. Message: ${message}`,
        );
      } else {
        console.error(
          `GitHub API Error! Status: ${status}. Message: ${message}`,
        );
      }
      console.error(error);
    } else {
      console.error("Unexpected error:", error);
    }

    throw error;
  }
}
