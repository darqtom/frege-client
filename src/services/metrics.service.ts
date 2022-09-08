import axios from "axios";

import { RepositoryResult } from "models/RepositoryResult";

export async function fetchRepository(
  name: string,
  softwareHostingName: string
) {
  const { data } = await axios.get<RepositoryResult>(
    `http://localhost:8080/${softwareHostingName}/repository`,
    {
      params: {
        repositoryName: name,
      },
    }
  );
  return data;
}

export async function fetchRepositoryMetrics() {
  console.log("Fetching metrics...");
}
