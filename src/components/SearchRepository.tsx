import React, { useState, useCallback, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import _ from "lodash";
import validator from "validator";

import Dropdown from "components/Dropdown";
import Search from "components/Search";
import { fetchSearchResults } from "services/search-repository.service";
import { SearchRepositoryResult } from "models/SearchRepositoryResult";
import { fetchRepositoryThunk } from "store/slices/repository";
import { AppDispatch } from "store/store";

const SOFTWARE_HOSTINGS = ["github", "gitlab", "sourceforge", "bitbucket"];

const SearchRepository = () => {
  const [softwareHosting, setSoftwareHosting] = useState(SOFTWARE_HOSTINGS[0]);
  const [searchResults, setSearchResults] = useState<SearchRepositoryResult[]>(
    []
  );
  const [searchExpression, setSearchExpression] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const dispatch: AppDispatch = useDispatch();

  const search = useCallback(
    async (
      searchExpression: string,
      softwareHosting: string
    ): Promise<void> => {
      await updateSearchResults(searchExpression, softwareHosting);
      setLoading(false);
    },
    []
  );

  const debounceSearch = useMemo(() => {
    return _.debounce((searchExpression: string, softwareHosting: string) => {
      setLoading(true);
      search(searchExpression, softwareHosting);
    }, 750);
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
    setSearchResults([]);
    setSoftwareHosting(event.target.value);
  };

  const onSearchExpressionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSearchResults([]);
    setSearchExpression(event.target.value);
  };

  const onItemClick = async (
    name: string,
    softwareHostingName: string
  ): Promise<void> => {
    setSearchResults([]);
    dispatch(fetchRepositoryThunk({ name, softwareHostingName }));
    setSearchExpression(name);
  };

  const onClear = (): void => {
    setSearchResults([]);
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
      loading={loading}
      softwareHostingName={softwareHosting}
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
