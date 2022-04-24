import { combineReducers } from "@reduxjs/toolkit";

import repositoryReducer from "./repository";
import { RootState } from "../../models/Store";

const rootReducer = combineReducers<RootState>({
  repository: repositoryReducer,
});

export default rootReducer;
