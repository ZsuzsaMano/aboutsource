import { Repository } from "@/types/repo";
import { readCache, writeCache } from "./cache";
import { fetchRepositoriesFromGithub } from "./github";

export async function getRepositories(): Promise<Repository[]> {
  const cached = await readCache();

  try {
    const { repositories, changed } = await fetchRepositoriesFromGithub();

    if (changed) {
      await writeCache(repositories);
    }

    return repositories;
  } catch (error) {
    console.error("GitHub unavailable:", error);

    if (cached) {
      console.log(`Using cached repositories from ${cached.updatedAt}`);

      return cached.repositories;
    }

    throw error;
  }
}
