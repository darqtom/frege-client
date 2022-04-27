import axios from "axios";

export async function fetchRepository(url: string) {
  return await axios({
    method: "get",
    url: "http://localhost:8080/repositories",
    data: {
      url: url,
    },
  });
}

export async function fetchRepositoryMetrics() {
  console.log("Fetching metrics...");
}
