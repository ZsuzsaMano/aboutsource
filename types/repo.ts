export type Repository = {
  id: number | bigint;
  name: string;
  url: string;
  pushed_at: string | null | undefined;
  latestCommit: CommitDetails;
};

export type CommitDetails = {
  message: string;
  author: string;
  date: string;
  sha: string;
};
