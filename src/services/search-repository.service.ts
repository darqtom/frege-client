import { SearchRepositoryResult } from "../models/SearchRepositoryResult";
import { softwareHostingAPICreator } from "../models/SoftwareHostingAPI";

export async function fetchSearchResults(
  searchExpression: string,
  softwareHostingName: string
): Promise<SearchRepositoryResult[]> {
  const softwareHostingAPI = softwareHostingAPICreator(softwareHostingName);
  if (!softwareHostingAPI) {
    return [];
  }

  return await softwareHostingAPI.get(searchExpression);
}
