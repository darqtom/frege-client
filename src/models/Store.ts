import { CommitResult, RepositoryResult } from "models/RepositoryResult";

export interface RootState {
  repository: RepositoryState;
  commitsComparing: CommitsComparingState;
}

export interface RepositoryState {
  branches: RepositoryResult[];
  status: "loading" | "idle";
  error: string | null;
}

export interface CommitsComparingState {
  selectedCommits: CommitResult[];
}
