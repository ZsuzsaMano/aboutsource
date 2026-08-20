import { Repository } from "@/types/repo";
import Repo from "./Repo";

type RepositoriesProps = {
  repos: Repository[];
};

const Reposatories = ({ repos }: RepositoriesProps) => {
  return (
    <section className="max-w-2xl m-auto">
      <h2> Reposatories </h2>
      <ul className="accordion my-2">
        {repos.map((repo) => (
          <Repo repo={repo} key={repo.id} />
        ))}
      </ul>
    </section>
  );
};

export default Reposatories;
