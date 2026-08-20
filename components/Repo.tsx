import { Repository } from "@/types/repo";

type RepositoryProps = {
  repo: Repository;
};

const Repo = ({ repo }: RepositoryProps) => {
  return <li>{repo.name}</li>;
};

export default Repo;
