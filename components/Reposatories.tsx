import { Repository } from "@/types/repo";
import Repo from "./Repo";

type RepositoriesProps = {
  repos: Repository[];
};

const Reposatories = ({ repos }: RepositoriesProps) => {
  return (
    <section>
      {" "}
      <h2> Reposatories </h2>
      <ul className="accordion">
        {repos.map((repo) => (
          <Repo repo={repo} key={repo.id} />
        ))}
      </ul>
    </section>
  );
};

export default Reposatories;
