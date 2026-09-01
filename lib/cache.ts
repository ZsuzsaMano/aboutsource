import { Repository } from "@/types/repo";
import { promises as fs } from "node:fs";
import path from "node:path";

const CACHE_FILE = path.join("/tmp", "github-repositories.json");

export type GithubCache = {
  repositories: Repository[];
  updatedAt: string;
};

export async function readCache(): Promise<GithubCache | null> {
  try {
    const file = await fs.readFile(CACHE_FILE, "utf8");

    return JSON.parse(file) as GithubCache;
  } catch {
    return null;
  }
}

export async function writeCache(repositories: Repository[]): Promise<void> {
  await fs.mkdir(path.dirname(CACHE_FILE), {
    recursive: true,
  });

  const cache: GithubCache = {
    repositories,
    updatedAt: new Date().toISOString(),
  };

  await fs.writeFile(CACHE_FILE, JSON.stringify(cache, null, 2), "utf8");
}
