import axios from "axios";
import {
  SearchGitHubRepositoryResult,
  SearchGitLabRepositoryResult,
  SearchRepositoryResult,
} from "./SearchRepositoryResult";

export abstract class SoftwareHostingAPI {
  protected constructor(readonly baseURL: string) {}
  abstract get(params: any): Promise<SearchRepositoryResult[]>;
}

export class GitHubAPI extends SoftwareHostingAPI {
  constructor() {
    super(`https://api.github.com/search/repositories`);
  }

  async get(params: any) {
    try {
      const result = await axios.get<SearchGitHubRepositoryResult>(
        this.baseURL + "?q=" + params
      );
      const resultData = result.data;

      const repos: SearchRepositoryResult[] = resultData.items.map((repo) => ({
        description: repo.description,
        name: repo.full_name,
        httpURL: repo.url,
        sshURL: repo.ssh_url,
      }));
      return repos;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}

export class GitLabAPI extends SoftwareHostingAPI {
  constructor() {
    super(`https://gitlab.com/api/v4/projects`);
  }

  async get(params: any) {
    try {
      const result = await axios.get<SearchGitLabRepositoryResult[]>(
        this.baseURL
      );
      const resultData = result.data;

      const repos: SearchRepositoryResult[] = resultData.map((repo) => ({
        description: repo.description,
        name: repo.path_with_namespace,
        httpURL: repo.http_url_to_repo,
        sshURL: repo.ssh_url_to_repo,
      }));
      return repos;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}

export class BitBucketAPI extends SoftwareHostingAPI {
  constructor() {
    super(``);
  }

  get(params: any): Promise<SearchRepositoryResult[]> {
    // todo
    return new Promise(() => {});
  }
}

export class SourceforgeAPI extends SoftwareHostingAPI {
  constructor() {
    super(``);
  }

  get(params: any): Promise<SearchRepositoryResult[]> {
    // todo
    return new Promise(() => {});
  }
}

export function softwareHostingAPICreator(
  type: string
): SoftwareHostingAPI | undefined {
  switch (type) {
    case "github":
      return new GitHubAPI();
    case "gitlab":
      return new GitLabAPI();
    case "bitbucket":
      return new BitBucketAPI();
    case "sourceforge":
      return new SourceforgeAPI();
  }
}
