import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RepositoryResult } from "../../models/RepositoryResult";

import { RepositoryState } from "../../models/Store";
import { fetchRepository } from "../../services/metrics.service";

const initialState: RepositoryState = {
  branches: [],
  status: "idle",
  error: null,
};

export const fetchRepositoryThunk = createAsyncThunk<
  RepositoryResult[],
  { name: string; softwareHostingName: string },
  { rejectValue: { message: string } }
>("repository/tree", async ({ name, softwareHostingName }, thunkApi) => {
  try {
    return await fetchRepository(name, softwareHostingName);
  } catch (error) {
    return thunkApi.rejectWithValue({
      message: "Failed to fetch repository",
    });
  }
});

const repositorySlice = createSlice({
  name: "repository",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRepositoryThunk.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(fetchRepositoryThunk.fulfilled, (state, { payload }) => {
      state.branches.push(...payload);
      state.status = "idle";
    });
    builder.addCase(fetchRepositoryThunk.rejected, (state, { payload }) => {
      state.status = "idle";
      if (payload) {
        state.error = payload.message;
      }
    });
  },
});

export default repositorySlice.reducer;
