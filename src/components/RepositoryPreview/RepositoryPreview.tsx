import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  ButtonGroup,
  Chip,
  Fab,
  Select,
  MenuItem,
  SelectChangeEvent,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { QueueListIcon, ShareIcon } from "@heroicons/react/24/outline";
import { PencilIcon, PlayIcon } from "@heroicons/react/24/solid";

import { AppDispatch } from "store/store";
import { selectCommitsComparing, selectRepository } from "store/selectors";

import RepositoryGraph from "components/RepositoryPreview/RepositoryGraph/RepositoryGraph";
import RepositoryList from "components/RepositoryPreview/RepositoryList/RepositoryList";
import Spinner from "components/Spinner";
import { BranchResult } from "models/RepositoryResult";
import {
  selectCommits,
  temporarilySelectCommits,
  temporarilyToggleCommitSelection,
} from "store/slices/commitsComparing";

export type ViewType = "graph" | "list";

const RepositoryPreview = () => {
  const [activeView, setActiveView] = useState<ViewType>("graph");
  const [branch, setBranch] = useState<BranchResult | null>(null);
  const [select, setSelect] = useState(false);
  const [openPreview, setOpenPreview] = useState(false);

  const dispatch: AppDispatch = useDispatch();

  const { branches, status, error } = useSelector(selectRepository);
  const { selectedCommits, tmpSelectedCommits } = useSelector(
    selectCommitsComparing
  );

  // DIALOG
  const onCancel = () => {
    dispatch(temporarilySelectCommits(selectedCommits));
    setOpenPreview(false);
  };

  const onSave = () => {
    dispatch(selectCommits(tmpSelectedCommits));
    setOpenPreview(false);
  };

  const View =
    activeView === "list"
      ? branch && <RepositoryList select={select} branch={branch} />
      : branch && (
          <RepositoryGraph
            select={select}
            selectedCommits={selectedCommits}
            branch={branch}
          />
        );

  useEffect(() => {
    if (branches.length) {
      setBranch(branches[0]);
    }
  }, [branches, setBranch]);

  const onBranchChange = async (event: SelectChangeEvent): Promise<void> => {
    const currentBranch =
      branches.find((branch) => branch.name === event.target.value) ||
      branches[0];

    console.log(event.target.value);

    setBranch(currentBranch);
  };

  const onSelectClick = () => {
    setSelect(!select);
  };

  const onTmpSelectClick = (sha: string) => {
    dispatch(temporarilyToggleCommitSelection(sha));
  };

  const onEditClick = () => {
    dispatch(temporarilySelectCommits(selectedCommits));
    setOpenPreview(true);
  };

  const displayControlsButtons =
    !openPreview && select && selectedCommits.length !== 0;

  return (
    <div className="whiteBox flex flex-1 md:flex-col md:h-full p-4 relative">
      {status === "loading" && <Spinner />}
      {status === "idle" && branches.length > 0 && (
        <>
          {/* CONTROLS TOP */}
          <div className="flex justify-between mb-2">
            <div>
              <div className="flex justify-start items-center space-x-4">
                <FormControl sx={{ minWidth: 120 }} fullWidth size="small">
                  <InputLabel id="branch-label">Branch</InputLabel>
                  <Select
                    labelId="branch-label"
                    id="branch-select"
                    defaultValue={branches[0].name}
                    value={branch?.name}
                    label="Branch"
                    onChange={onBranchChange}
                  >
                    {branches.map((branch) => (
                      <MenuItem value={branch.name}>{branch.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Chip
                  label="Select"
                  color="primary"
                  variant={select ? "filled" : "outlined"}
                  onClick={onSelectClick}
                />
              </div>
            </div>
            <ButtonGroup>
              <Button
                onClick={() => setActiveView("list")}
                variant={activeView === "list" ? "contained" : "outlined"}
                size="small"
              >
                <QueueListIcon />
              </Button>
              <Button
                onClick={() => setActiveView("graph")}
                variant={activeView === "graph" ? "contained" : "outlined"}
                size="small"
              >
                <ShareIcon />
              </Button>
            </ButtonGroup>
          </div>
          <div className="overflow-y-scroll h-full scrollbar-hide">{View}</div>

          {/* DIALOG / MODAL */}
          <Dialog scroll="paper" open={openPreview}>
            <div className="whiteBox flex-col p-4">
              {/* HEADER */}
              <DialogTitle id="scroll-dialog-title">
                You've checked the following commits
              </DialogTitle>

              {/* SELECTED COMMITS */}
              <DialogContent>
                <div className="space-y-2 h-full">
                  {tmpSelectedCommits.map((commit) => (
                    <div
                      className="border p-4 rounded-lg flex items-center hover:bg-violet-50 cursor-pointer"
                      onClick={() => {
                        onTmpSelectClick(commit.sha);
                      }}
                    >
                      <div className="checkbox mr-4">
                        <input
                          type="checkbox"
                          checked={commit.checked}
                          onChange={() => {
                            onTmpSelectClick(commit.sha);
                          }}
                        />
                      </div>
                      <div className="flex-col w-3/4">
                        <p className="text-sm truncate">
                          {commit.commit.message}
                        </p>
                        <span className="text-xs text-gray-600 font-semibold">
                          {commit.author.nick}
                        </span>
                      </div>
                      <div>
                        {/* <XMarkIcon
                      onClick={() => onUnselectClick(commit)}
                      className="w-6 h-6 hover:text-red-500 cursor-pointer"
                    /> */}
                      </div>
                    </div>
                  ))}
                </div>
              </DialogContent>

              {/* FOOTER WITH CONTROLS */}
              <DialogActions>
                <Button onClick={onCancel}>Cancel</Button>
                <Button onClick={onSave}>Save</Button>
              </DialogActions>
            </div>
          </Dialog>

          {/* CONTROLS BOTTOM */}
          {displayControlsButtons && (
            <div className="absolute bottom-4 right-4 space-x-2">
              <Fab
                sx={{
                  zIndex: 1000,
                }}
                color="primary"
                aria-label="edit"
                variant="extended"
                onClick={onEditClick}
              >
                <PencilIcon className="mr-2 h-6 w-6" />
                Edit
              </Fab>
              <Fab
                sx={{
                  zIndex: 1000,
                }}
                color="success"
                aria-label="generate-metrics"
                variant="extended"
                onClick={() => setOpenPreview(true)}
              >
                <PlayIcon className="mr-2 h-6 w-6" />
                Get Metrics
              </Fab>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RepositoryPreview;
