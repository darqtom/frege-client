import React, { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";

import { CommitResult } from "models/RepositoryResult";
import { AppDispatch } from "store/store";
import { selectCommit, unselectCommit } from "store/slices/commitsComparing";

interface RepositoryListItemProps {
  commit: CommitResult;
  isSelected: boolean | undefined;
  select: boolean;
}

const RepositoryListItem = ({
  commit,
  select,
  isSelected,
}: RepositoryListItemProps) => {
  const dispatch: AppDispatch = useDispatch();

  const onCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      dispatch(selectCommit(commit));
    } else {
      dispatch(unselectCommit(commit));
    }
  };

  const copyToClipboard = () => {
    console.log("copy to clipboard");
  };

  const onItemClick = () => {
    if (select) {
      if (isSelected) {
        dispatch(unselectCommit(commit));
      } else {
        dispatch(selectCommit(commit));
      }
    } else {
      // todo: fetch metrics
    }
  };

  const {
    commit: { message, author },
    sha,
  } = commit;

  return (
    <div
      className="flex hover:bg-violet-50 cursor-pointer py-2 px-4"
      onClick={onItemClick}
    >
      <div className="flex w-2/3 items-center">
        {select && (
          <div className="checkbox mr-4">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={onCheckboxChange}
            />
          </div>
        )}

        <div className="flex-col w-full">
          <p className="truncate text-sm">{message}</p>
          <div>
            <span className="text-xs mr-1 font-semibold">{author.name}</span>
            <span className="text-xs">committed 1 hour ago</span>
          </div>
        </div>
      </div>

      <div className="flex w-1/2 justify-end items-center">
        <div>
          <DocumentDuplicateIcon
            onClick={copyToClipboard}
            className="w-6 h-6 text-gray-400 hover:text-gray-500 cursor-pointer"
          />
        </div>
        <p className="px-2 w-16 text-sm">{sha.slice(0, 7)}</p>
      </div>
    </div>
  );
};

export default RepositoryListItem;
