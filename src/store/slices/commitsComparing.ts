import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CommitResult } from "models/RepositoryResult";
import { CommitsComparingState } from "models/Store";

const initialState: CommitsComparingState = {
  selectedCommits: [],
};

const commitsComparingSlice = createSlice({
  name: "commitsComparing",
  initialState,
  reducers: {
    selectCommit(state, action: PayloadAction<CommitResult>) {
      const idx = state.selectedCommits.findIndex(
        (commit) => commit.sha === action.payload.sha
      );

      if (idx === -1) {
        state.selectedCommits.push(action.payload);
      }
    },
    unselectCommit(state, action: PayloadAction<CommitResult>) {
      state.selectedCommits = state.selectedCommits.filter(
        (commit) => commit.sha !== action.payload.sha
      );
    },
    unselectAllCommits(state) {
      state.selectedCommits = [];
    },
  },
});

export const { selectCommit, unselectCommit, unselectAllCommits } =
  commitsComparingSlice.actions;
export default commitsComparingSlice.reducer;
