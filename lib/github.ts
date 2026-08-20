import { Repository } from "@/types/repo";
import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export async function getRepositories() {
  const response = await octokit.request("GET /users/{username}/repos", {
    username: "aboutsource",
    per_page: 50,
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
        },
      };
    }),
  );

  repositories.sort(
    (a, b) =>
      new Date(b.latestCommit.date).getTime() -
      new Date(a.latestCommit.date).getTime(),
  );

  return repositories;
}
