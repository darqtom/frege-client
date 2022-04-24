export interface CommitResult {
  message: string;
  time: number;
  sha: string;
  parents: string[];
}
export interface RepositoryResult {
  branchName: string;
  commits: CommitResult[];
}
