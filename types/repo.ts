export type Repository = {
  id: number | bigint;
  name: string;
  url: string;
  latestCommit: {
    message: string;
    author: string;
    date: string;
  };
};
