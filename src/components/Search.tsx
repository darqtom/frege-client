import React from "react";
import { SearchIcon, XIcon } from "@heroicons/react/outline";

import { SearchRepositoryResult } from "../models/SearchRepositoryResult";
import SearchItem from "./SearchItem";
import Spinner from "./Spinner";

type SearchProps = {
  onChange(event: React.ChangeEvent<HTMLInputElement>): any;
  onItemClick(repoURL: string): Promise<void>;
  onClear(): void;
  results: SearchRepositoryResult[];
  placeholder: string;
  value: string;
  loading: boolean;
};

const Search = React.forwardRef<
  HTMLInputElement,
  React.PropsWithChildren<SearchProps>
>(
  (
    {
      children,
      onChange,
      onItemClick,
      onClear,
      results,
      placeholder,
      value,
      loading,
    },
    ref
  ) => {
    const childrenElement = children ? (
      <div className="border-l px-4">{children}</div>
    ) : null;

    return (
      <div className="fixed search whiteBox py-3 z-[1100]">
        <div className="flex px-4">
          <SearchIcon
            onClick={() => onItemClick(value)}
            className="w-6 h-6 text-green-600 cursor-pointer"
          />
          <input
            className="flex-1 mx-4 text-sm text-gray-800 outline-none placeholder-gray-800 placeholder-opacity-75 truncate"
            type="text"
            onChange={onChange}
            placeholder={placeholder}
            ref={ref}
            value={value}
          />
          {value && (
            <XIcon
              className="w-6 h-6 text-gray-400 hover:text-gray-500 mr-2 cursor-pointer"
              onClick={onClear}
            />
          )}
          <div className="">{childrenElement}</div>
        </div>
        {loading && <Spinner />}
        {results && results.length > 0 && (
          <div className="mt-4">
            <ul className="max-h-80 overflow-y-scroll">
              {results.map((result) => (
                <SearchItem
                  key={result.httpURL}
                  name={result.name}
                  description={result.description}
                  url={result.httpURL}
                  onClick={onItemClick}
                />
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
);

export default Search;
