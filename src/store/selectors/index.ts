import { RootState } from "models/Store";

export const selectRepository = (state: RootState) => state.repository;
export const selectCommitsComparing = (state: RootState) =>
  state.commitsComparing;
