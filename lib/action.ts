"use server";

import { updateTag } from "next/cache";
import { getRepositories } from "./github";

export async function refreshRepos() {
  await getRepositories();
  updateTag("repositories");
}
