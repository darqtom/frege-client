import React, { useState, useCallback, useEffect, useMemo } from "react";
import Dropdown from "./Dropdown";
import Search from "./Search";
import { fetchSearchResults } from "../services/search-repository.service";
import _ from "lodash";
import validator from "validator";
import { SearchRepositoryResult } from "../models/SearchRepositoryResult";
import { fetchRepositoryMetrics } from "../services/metrics.service";

const SOFTWARE_HOSTINGS = ["github", "gitlab", "sourceforge", "bitbucket"];

const SearchRepository = () => {
  const [softwareHosting, setSoftwareHosting] = useState(SOFTWARE_HOSTINGS[0]);
  const [searchResults, setSearchResults] = useState<SearchRepositoryResult[]>(
    []
  );
  const [searchExpression, setSearchExpression] = useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  const search = useCallback(
    async (
      searchExpression: string,
      softwareHosting: string
    ): Promise<void> => {
      if (validator.isURL(searchExpression)) {
        await fetchRepositoryMetrics();
      } else {
        await updateSearchResults(searchExpression, softwareHosting);
      }
    },
    []
  );

  const debounceSearch = useMemo(() => {
    return _.debounce((searchExpression: string, softwareHosting: string) => {
      search(searchExpression, softwareHosting);
    }, 500);
  }, [search]);

  useEffect(() => {
    return () => {
      debounceSearch.cancel();
    };
  });

  useEffect(() => {
    debounceSearch(searchExpression, softwareHosting);
  }, [searchExpression, softwareHosting, debounceSearch]);

  const onSoftwareHostingChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ): Promise<void> => {
    setSoftwareHosting(event.target.value);
  };

  const onSearchExpressionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSearchExpression(event.target.value);
  };

  const onItemClick = async (repoURL: string): Promise<void> => {
    setSearchResults([]);
    setSearchExpression(repoURL);
  };

  const onClear = (): void => {
    setSearchExpression("");
  };

  const updateSearchResults = async (
    searchExpression: string,
    softwareHosting: string
  ): Promise<void> => {
    if (searchExpression.length >= 3) {
      const results = await fetchSearchResults(
        searchExpression,
        softwareHosting
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <Search
      results={searchResults}
      onChange={onSearchExpressionChange}
      onItemClick={onItemClick}
      onClear={onClear}
      placeholder={`Enter a URL to ${softwareHosting} repository, or search by name`}
      ref={inputRef}
      value={searchExpression}
    >
      <Dropdown
        options={SOFTWARE_HOSTINGS}
        name="softwareHostings"
        id="softwareHostings"
        onChange={onSoftwareHostingChange}
      />
    </Search>
  );
};

export default SearchRepository;
