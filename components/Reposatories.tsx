"use client";
import { Repository } from "@/types/repo";
import Repo from "./Repo";
import { use } from "react";

type RepositoriesProps = {
  reposPromise: Promise<Repository[]>;
};

const Reposatories = ({ reposPromise }: RepositoriesProps) => {
  const repos = use(reposPromise);
  return (
    <ul className="accordion my-2">
      {repos.map((repo) => (
        <Repo repo={repo} key={repo.id} />
      ))}
    </ul>
  );
};

export default Reposatories;
