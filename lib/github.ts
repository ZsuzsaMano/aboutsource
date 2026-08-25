import { Repository } from "@/types/repo";
import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export async function getRepositories() {
  //await new Promise((resolve) => setTimeout(resolve, 5000)); slow load test

  const response = await octokit.request("GET /users/{username}/repos", {
    username: "aboutsource",
    per_page: 50,
    sort: "pushed",
    direction: "desc",
  });

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
}
