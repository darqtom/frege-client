import axios from "axios";

import { RepositoryResult } from "../models/RepositoryResult";

export async function fetchRepository(url: string) {
  const { data } = await axios.get<RepositoryResult[]>(
    "http://localhost:8080/repositories",
    {
      data: {
        url: url,
      },
    }
  );
  return data;
}

export async function fetchRepositoryMetrics() {
  console.log("Fetching metrics...");
}
