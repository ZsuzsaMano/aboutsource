import { Repository } from "@/types/repo";
import { useState } from "react";
import Details from "./Details";

type RepositoryProps = {
  repo: Repository;
};

const Repo = ({ repo }: RepositoryProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li className="card my-2">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        id={`accordion-header-${repo.id}`}
        aria-expanded={isOpen}
        aria-controls={`accordion-panel-${repo.id}`}
      >
        <h3>{repo.name}</h3>
        <p className="mt-0.5 truncate text-sm text-slate-600 max-w-lg">
          {repo.latestCommit.message}
        </p>
      </button>
      <div
        id={`accordion-panel-${repo.id}`}
        role="region"
        aria-labelledby={`accordion-header-${repo.id}`}
        className={!isOpen ? "hidden" : "content"}
      >
        <Details commitDetails={repo.latestCommit} />
      </div>
    </li>
  );
};

export default Repo;
