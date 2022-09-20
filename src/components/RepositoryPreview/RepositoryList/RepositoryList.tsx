import React from "react";
import { useSelector } from "react-redux";

import { BranchResult, CommitResult } from "models/RepositoryResult";
import { selectCommitsComparing } from "store/selectors";
import RepositoryListItem from "components/RepositoryPreview/RepositoryList/RepositoryListItem";

interface RepositoryListProps {
  branch: BranchResult;
  select: boolean;
}

const RepositoryList = ({
  branch: { commits },
  select,
}: RepositoryListProps) => {
  const { selectedCommits } = useSelector(selectCommitsComparing);

  const isSelected = ({ sha }: CommitResult) => {
    const idx = selectedCommits.findIndex((commit) => commit.sha === sha);
    return idx !== -1;
  };

  return (
    <div className="border rounded-sm divide-y divide-solid my-4">
      {commits.map((commit) => (
        <RepositoryListItem
          commit={commit}
          select={select}
          isSelected={isSelected(commit)}
        />
      ))}
    </div>
  );
};

export default RepositoryList;
