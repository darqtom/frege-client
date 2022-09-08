export interface CommitResult {
  commit: {
    message: string;
    author: {
      name: string;
    };
  };
  time: number;
  sha: string;
  parents: { sha: string; url: string }[];
  author: { nick: string };
}

export interface CommitPreview extends CommitResult {
  checked: boolean;
}

export interface BranchResult {
  name: string;
  commits: CommitResult[];
}
export interface RepositoryResult {
  branches: BranchResult[];
  repositoryStatistics: any;
  name: string;
  commits: CommitResult[];
}
