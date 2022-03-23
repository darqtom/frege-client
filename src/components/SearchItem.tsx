import React from "react";

type SearchItemProps = {
  onClick(repoURL: string): Promise<void>;
  name: string;
  description: string;
  url: string;
};

const SearchItem: React.FunctionComponent<SearchItemProps> = ({
  name,
  description,
  url,
  onClick,
}) => {
  return (
    <div
      className="flex flex-col px-4 py-2 hover:bg-violet-50 cursor-pointer"
      onClick={() => onClick(url)}
    >
      <p className="text-md text-gray-800">{name}</p>
      <p className="text-sm text-gray-400">{description || "No description"}</p>
    </div>
  );
};

export default SearchItem;
