import { GithubCache, Repository } from "@/types/repo";
import { promises as fsa } from "node:fs";
import fs from "fs";
import path from "node:path";

const CACHE_FILE = path.join("/tmp", "github-repositories.json");

export async function readCache(): Promise<GithubCache | null> {
  try {
    const file = await fsa.readFile(CACHE_FILE, "utf8");

    return JSON.parse(file) as GithubCache;
  } catch {
    return null;
  }
}

export async function writeCache(repositories: Repository[]): Promise<void> {
  await fsa.mkdir(path.dirname(CACHE_FILE), {
    recursive: true,
  });

  const cache: GithubCache = {
    repositories,
    updatedAt: new Date().toISOString(),
  };

  fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2), "utf8");
}
