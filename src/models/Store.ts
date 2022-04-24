import { RepositoryResult } from "./RepositoryResult";

export interface RootState {
  repository: RepositoryState
}

export interface RepositoryState {
  branches: RepositoryResult[];
  status: "loading" | "idle";
  error: string | null;
}
