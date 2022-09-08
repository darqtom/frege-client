import React from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";

import cx from "utils/cx";

import { SearchRepositoryResult } from "models/SearchRepositoryResult";
import SearchItem from "components/SearchItem";
import Spinner from "components/Spinner";

type SearchProps = {
  onChange(event: React.ChangeEvent<HTMLInputElement>): any;
  onItemClick(name: string, softwareHostingName: string): Promise<void>;
  onClear(): void;
  results: SearchRepositoryResult[];
  placeholder: string;
  value: string;
  loading: boolean;
  softwareHostingName: string;
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
      softwareHostingName,
    },
    ref
  ) => {
    const childrenElement = children ? (
      <div className="border-l px-4">{children}</div>
    ) : null;

    return (
      <div
        className={cx("fixed", "search", "whiteBox", "py-2", "z-[1100]", {
          "shadow-2xl": results.length > 0,
        })}
      >
        <div className="flex items-center px-4">
          <MagnifyingGlassIcon
            onClick={() => onItemClick(value, softwareHostingName)}
            className="w-6 h-6 text-green-600 cursor-pointer"
          />
          <input
            className="flex-1 mx-4 text-sm text-gray-800 outline-none placeholder-gray-800 placeholder-opacity-75 truncate"
            type="text"
            onChange={onChange}
            placeholder={placeholder}
            ref={ref}
          />
          {value && (
            <XMarkIcon
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
                  key={result.cloneURL}
                  name={result.name}
                  description={result.description}
                  onClick={onItemClick}
                  softwareHostingName={softwareHostingName}
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
