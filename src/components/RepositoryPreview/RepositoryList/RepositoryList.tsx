import React from "react";
import { useSelector } from "react-redux";

import { CommitResult, RepositoryResult } from "models/RepositoryResult";
import { selectCommitsComparing } from "store/selectors";
import RepositoryListItem from "components/RepositoryPreview/RepositoryList/RepositoryListItem";

interface RepositoryListProps {
  branch: RepositoryResult;
  compare: boolean;
}

const RepositoryList = ({
  branch: { commits },
  compare,
}: RepositoryListProps) => {
  const { selectedCommits } = useSelector(selectCommitsComparing);

  const isSelected = ({ sha }: CommitResult) => {
    const idx = selectedCommits.findIndex((commit) => commit.sha === sha);
    console.log("is selected", sha, idx);
    return idx !== -1;
  };

  return (
    <div className="border rounded-sm divide-y divide-solid my-4">
      {commits.map((commit) => (
        <RepositoryListItem
          commit={commit}
          compare={compare}
          isSelected={isSelected(commit)}
        />
      ))}
    </div>
  );
};

export default RepositoryList;
