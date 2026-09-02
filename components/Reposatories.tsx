"use client";
import { Repository } from "@/types/repo";
import Repo from "./Repo";
import { use, useTransition } from "react";
import { refreshRepos } from "@/lib/action";

type RepositoriesProps = {
  reposPromise: Promise<Repository[]>;
};

const Reposatories = ({ reposPromise }: RepositoriesProps) => {
  const [pending, startTransition] = useTransition();
  const repos = use(reposPromise);
  return (
    <>
      <button
        disabled={pending}
        onClick={() => startTransition(() => refreshRepos())}
        className="refreshButton
"
      >
        {pending ? "Refreshing…" : "Refresh"}
      </button>
      <ul className="accordion my-2">
        {repos.map((repo) => (
          <Repo repo={repo} key={repo.id} />
        ))}
      </ul>
    </>
  );
};

export default Reposatories;
