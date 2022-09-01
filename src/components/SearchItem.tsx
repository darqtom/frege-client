import React from "react";

type SearchItemProps = {
  onClick(name: string, softwareHostingName: string): Promise<void>;
  name: string;
  description: string;
  softwareHostingName: string;
};

const SearchItem: React.FunctionComponent<SearchItemProps> = ({
  name,
  description,
  onClick,
  softwareHostingName,
}) => {
  return (
    <div
      className="flex flex-col px-4 py-2 hover:bg-violet-50 cursor-pointer"
      onClick={() => onClick(name, softwareHostingName)}
    >
      <p className="text-sm text-gray-800">{name}</p>
      <p className="text-xs text-gray-400">{description || "No description"}</p>
    </div>
  );
};

export default SearchItem;
