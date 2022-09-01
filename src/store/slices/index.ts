import { combineReducers } from "@reduxjs/toolkit";

import repositoryReducer from "store/slices/repository";
import commitsComparingReducer from "store/slices/commitsComparing";
import { RootState } from "models/Store";

const rootReducer = combineReducers<RootState>({
  repository: repositoryReducer,
  commitsComparing: commitsComparingReducer,
});

export default rootReducer;
