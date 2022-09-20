import React, { useState } from "react";

import cx from "utils/cx";

import { RepositoryResult } from "models/RepositoryResult";
import Dropdown from "components/Dropdown";
import RepositoryList from "components/RepositoryPreview/RepositoryList/RepositoryList";

interface RepositoryListViewProps {
  status: "idle" | "loading";
  error: string | null;
  branches: RepositoryResult[];
}

const RepositoryListView = ({ branches }: RepositoryListViewProps) => {
  const [branch, setBranch] = useState(branches[0]);
  const [compare, setCompare] = useState(false);

  const options = branches.map((branch) => branch.name);

  const onBranchChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ): Promise<void> => {
    const currentBranch =
      branches.find((branch) => branch.name === event.target.value) ||
      branches[0];

    setBranch(currentBranch);
  };

  const onCompareClick = () => {
    setCompare(!compare);
  };

  return (
    <>
      <div className="whiteBox flex-col flex-1 md:h-full p-4 ">
        <div className="overflow-y-scroll h-full scrollbar-hide">
          <div className="flex space-x-4">
            <div className="border cursor-pointer rounded-md px-2 py-1">
              <Dropdown
                options={options}
                name="branches"
                id="branches"
                onChange={onBranchChange}
              />
            </div>
            <button
              className={cx(
                {
                  "bg-green-600 text-white": compare,
                  "text-gray-800 border": !compare,
                },
                "px-4",
                "py-1",
                "rounded-full",
                "cursor-pointer",
                "text-sm",
                "tracking-wide"
              )}
              onClick={onCompareClick}
            >
              Compare
            </button>
          </div>
          <RepositoryList select={compare} branch={branch} />
        </div>
      </div>
    </>
  );
};

export default RepositoryListView;
