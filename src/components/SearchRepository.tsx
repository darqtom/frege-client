import React, { useState, useCallback, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import {
  Select,
  MenuItem,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";
import _ from "lodash";

import { fetchSearchResults } from "services/search-repository.service";
import { SearchRepositoryResult } from "models/SearchRepositoryResult";
import { fetchRepositoryThunk } from "store/slices/repository";
import { AppDispatch } from "store/store";

import Search from "components/Search";

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
    event: SelectChangeEvent
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
    if (inputRef.current) {
      inputRef.current.value = name;
    }

    setSearchResults([]);
    dispatch(fetchRepositoryThunk({ name, softwareHostingName }));
  };

  const onClear = (): void => {
    setSearchResults([]);
    setSearchExpression("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
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
      <FormControl sx={{ minWidth: 120 }} fullWidth>
        {/* <InputLabel id="branch-label">Branch</InputLabel> */}
        <Select
          sx={{
            minWidth: 120,
            height: 32,
            fontSize: 16,
            padding: 0,
            letterSpacing: 0.5,
          }}
          id="software-hostings-select"
          defaultValue={SOFTWARE_HOSTINGS[0]}
          onChange={onSoftwareHostingChange}
        >
          {SOFTWARE_HOSTINGS.map((hosting) => (
            <MenuItem value={hosting}>{hosting}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Search>
  );
};

export default SearchRepository;
