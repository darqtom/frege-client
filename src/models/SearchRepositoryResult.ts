export interface SearchRepositoryResult {
  description: string;
  name: string;
  cloneURL: string;
  sshURL: string;
}

export interface SearchGitHubRepositoryResult {
  total_count: number;
  incomplete_results: boolean;
  items: {
    id: number;
    name: string;
    full_name: string;
    description: string;
    forks_count: number;
    score: number;
    stargazers_count: number;
    url: string;
    ssh_url: string;
    created_at: string;
    updated_at: string;
    clone_url: string;
  }[];
}

export interface SearchGitLabRepositoryResult {
  id: number;
  description: string;
  name: string;
  name_with_namespace: string;
  path: string;
  path_with_namespace: string;
  created_at: string;
  default_branch: string;
  topics: string[];
  ssh_url_to_repo: string;
  http_url_to_repo: string;
  web_url: string;
  avatar_url: string;
  star_count: number;
  forks_count: number;
  last_activity_at: string;
}

export interface SearchBitBucketRepositoryResult {
  // todo
}

export interface SearchSourceforgeRepositoryResult {
  // todo
}
