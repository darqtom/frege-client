export interface CommitResult {
  message: string;
  time: number;
  sha: string;
  parents: string[];
  author: { nick: string };
}
export interface RepositoryResult {
  branchName: string;
  commits: CommitResult[];
}
