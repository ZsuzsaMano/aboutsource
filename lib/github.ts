import { Repository } from "@/types/repo";
import { Octokit } from "octokit";
import { RequestError } from "@octokit/request-error";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export async function getRepositories() {
  //await new Promise((resolve) => setTimeout(resolve, 5000)); slow load test
  "use cache";

  try {
    const response = await octokit.request("GET /users/{username}/repos", {
      username: "aboutsource",
      per_page: 50,
      sort: "pushed",
      direction: "desc",
    });

    console.log(`The status of the response is: ${response.status}`);
    console.log(`The request URL was: ${response.url}`);
    console.log(
      `The x-ratelimit-remaining response header is: ${response.headers["x-ratelimit-remaining"]}`,
    );

    const repositories: Repository[] = await Promise.all(
      response.data.map(async (repo) => {
        const commitsResponse = await octokit.request(
          "GET /repos/{owner}/{repo}/commits",
          {
            owner: "aboutsource",
            repo: repo.name,
            per_page: 1,
          },
        );

        const commit = commitsResponse.data[0];

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

      if (status === 401) {
        console.error(
          `Unauthorized: Invalid GITHUB_TOKEN. Message: ${message}`,
        );
      } else if (
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
