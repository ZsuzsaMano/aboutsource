import { Repository } from "@/types/repo";
import { useState } from "react";

type RepositoryProps = {
  repo: Repository;
};

const Repo = ({ repo }: RepositoryProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li className="card">
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
        <div className="accordion-content">Your content here</div>
      </div>
    </li>
  );
};

export default Repo;
