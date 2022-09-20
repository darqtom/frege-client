import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CommitPreview, CommitResult } from "models/RepositoryResult";
import { CommitsComparingState } from "models/Store";

const initialState: CommitsComparingState = {
  selectedCommits: [],
  tmpSelectedCommits: [],
};

const commitsComparingSlice = createSlice({
  name: "commitsComparing",
  initialState,
  reducers: {
    selectCommits(state, action: PayloadAction<CommitPreview[]>) {
      state.selectedCommits = action.payload
        .filter((commit) => commit.checked)
        .map(({ checked, ...commitResult }) => commitResult);
    },
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
    toggleCommitSelection(state, action: PayloadAction<CommitResult>) {
      const idx = state.selectedCommits.findIndex(
        (commit) => commit.sha === action.payload.sha
      );

      if (idx === -1) {
        state.selectedCommits.push(action.payload);
      } else {
        state.selectedCommits = state.selectedCommits.filter(
          (commit) => commit.sha !== action.payload.sha
        );
      }
    },
    unselectAllCommits(state) {
      state.selectedCommits = [];
    },
    temporarilySelectCommits(state, action: PayloadAction<CommitResult[]>) {
      state.tmpSelectedCommits = action.payload.map((commit) => ({
        ...commit,
        checked: true,
      }));
    },
    temporarilyToggleCommitSelection(state, action: PayloadAction<string>) {
      const idx = state.tmpSelectedCommits.findIndex(
        (commit) => commit.sha === action.payload
      );

      const oldCommit = state.tmpSelectedCommits[idx];
      const updatedCommit = { ...oldCommit, checked: !oldCommit.checked };

      state.tmpSelectedCommits[idx] = updatedCommit;
    },
  },
});

export const {
  selectCommits,
  selectCommit,
  unselectCommit,
  unselectAllCommits,
  temporarilyToggleCommitSelection,
  temporarilySelectCommits,
  toggleCommitSelection,
} = commitsComparingSlice.actions;
export default commitsComparingSlice.reducer;
