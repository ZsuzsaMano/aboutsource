import { Repository } from "@/types/repo";
import { Octokit } from "octokit";
import { throttling } from "@octokit/plugin-throttling";
import { readCache } from "./cache";

const MyOctokit = Octokit.plugin(throttling);

const octokit = new MyOctokit({
  auth: process.env.GITHUB_TOKEN,
  throttle: {
    onRateLimit: (retryAfter, options, octokit, retryCount) => {
      octokit.log.warn(
        `Request quota exhausted for request ${options.method} ${options.url}`,
      );
      return false;
    },
    onSecondaryRateLimit: (retryAfter, options, octokit) => {
      // does not retry, only logs a warning
      octokit.log.warn(
        `SecondaryRateLimit detected for request ${options.method} ${options.url}`,
      );
    },
  },
});

const GITHUB_USERNAME = "aboutsource";

export async function fetchRepositoriesFromGithub(): Promise<{
  repositories: Repository[];
  changed: boolean;
}> {
  const response = await octokit.request("GET /users/{username}/repos", {
    username: GITHUB_USERNAME,
    per_page: 50,
    sort: "pushed",
    direction: "desc",
  });

  const cached = await readCache();

  if (
    cached &&
    response.data[0].pushed_at === cached.repositories[0].pushed_at
  ) {
    console.log(`Using cached repositories from ${cached.updatedAt}`);
    return { repositories: cached.repositories, changed: false };
  }

  const remainingLimit = response.headers["x-ratelimit-remaining"]
    ? parseInt(response.headers["x-ratelimit-remaining"])
    : 0;
  console.log(`The status of the response is: ${response.status}`);
  console.log(`The request URL was: ${response.url}`);
  console.log(
    `The x-ratelimit-remaining response header is: ${response.headers["x-ratelimit-remaining"]}`,
  );
  console.log(remainingLimit);

  const repositories: Repository[] = await Promise.all(
    //TODO look up if github allows parallel fetch
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
        pushed_at: repo.pushed_at,
        latestCommit: {
          message: commit.commit.message,
          author: commit.commit.author?.name ?? "Unknown",
          date: commit.commit.author?.date ?? "",
          sha: commit.sha ?? "",
        },
      };
    }),
  );
  return { repositories: repositories, changed: true };
}
