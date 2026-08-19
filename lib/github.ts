import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export async function getRepositories() {
  const response = await octokit.request(
    "GET /users/{username}/repos",
    {
      username: "aboutsource",
      per_page: 50,
    }
  );

  return response.data;
}