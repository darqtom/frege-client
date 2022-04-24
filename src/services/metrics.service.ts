import { RepositoryResult } from "../models/RepositoryResult";

export async function fetchRepository(
  url: string
): Promise<RepositoryResult[]> {
  return new Promise((resolve) => {
    resolve([]);
  });
}

export async function fetchRepositoryMetrics() {
  console.log("Fetching metrics...");
}
