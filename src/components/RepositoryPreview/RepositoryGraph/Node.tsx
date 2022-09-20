import React, { memo, useState } from "react";
import { useDispatch } from "react-redux";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Handle, Position, Node } from "react-flow-renderer";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import cx from "utils/cx";

import { AppDispatch } from "store/store";
import { toggleCommitSelection } from "store/slices/commitsComparing";

export default memo(({ data }: Node) => {
  const [openPreview, setOpenPreview] = useState(false);

  const dispatch: AppDispatch = useDispatch();

  const onSelectCommit = () => {
    dispatch(toggleCommitSelection(data.commit));
  };

  // DIALOG
  const onClose = () => {
    setOpenPreview(false);
  };

  const onGetMetrics = () => {
    // todo: fetch metrics
  };

  const { commit, selected } = data;

  return (
    <>
      {/* DIALOG / MODAL */}
      <Dialog scroll="paper" open={openPreview}>
        <div className="whiteBox flex-col p-4">
          {/* HEADER */}
          <DialogTitle id="scroll-dialog-title">Commit Details</DialogTitle>

          {/* SELECTED COMMITS */}
          <DialogContent>
            <div className="flex-col w-full">
              <p className="text-sm font-semibold">{commit.sha}</p>
              <p className="text-sm">Message: {commit.commit.message}</p>
              <div>
                <span className="text-xs mr-1 font-semibold">
                  {commit.commit.author.name}
                </span>
                <span className="text-xs">committed 1 hour ago</span>
              </div>
            </div>
          </DialogContent>

          {/* FOOTER WITH CONTROLS */}
          <DialogActions>
            <Button onClick={onClose}>Close</Button>
            <Button onClick={onGetMetrics}>Get Metrics</Button>
          </DialogActions>
        </div>
      </Dialog>

      <div className="relative">
        <div
          className={cx(
            "absolute",
            "top-0",
            "right-0",
            "flex",
            "justify-center",
            "items-center",
            "z-[100]",
            "border",
            "border-gray-500",
            "h-6",
            "w-6",
            "rounded-full",
            "bg-green-400",
            "hover:bg-green-500",
            "transition"
          )}
          onClick={onSelectCommit}
        >
          <PlusIcon className="h-4 w-4 text-gray-800" />
        </div>

        <div
          className={cx(
            "flex",
            "justify-center",
            "items-center",
            "w-16",
            "h-16",
            "border",
            "border-gray-500",
            {
              "bg-gray-400 hover:bg-gray-500": !selected,
              "bg-violet-300 hover:bg-violet-400": selected,
            },
            "hover:bg-gray-500",
            "transition",
            "rounded-full",
            "z-[1]"
          )}
          onDoubleClick={() => setOpenPreview(true)}
        >
          <Handle type="target" position={Position.Top} />
          <div className="flex-col">
            <span className="text-white text-xs">{data.label}</span>
          </div>
          <Handle type="source" position={Position.Bottom} id="a" />
        </div>
      </div>
    </>
  );
});
