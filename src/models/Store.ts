import { BranchResult, CommitPreview, CommitResult } from "models/RepositoryResult";

export interface RootState {
  repository: RepositoryState;
  commitsComparing: CommitsComparingState;
}

export interface RepositoryState {
  branches: BranchResult[];
  status: "loading" | "idle";
  error: string | null;
}

export interface CommitsComparingState {
  selectedCommits: CommitResult[];
  tmpSelectedCommits: CommitPreview[];
}
