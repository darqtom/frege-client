import React, { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import ReactFlow, {
  addEdge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Node,
} from "react-flow-renderer";
import dagre from "dagre";

import { placeNodesOnCanvas, createNodesAndEdges } from "utils/repositoryNodes";
import { BranchResult, CommitResult } from "models/RepositoryResult";
import { AppDispatch } from "store/store";
import { toggleCommitSelection } from "store/slices/commitsComparing";

import CommitNode from "components/RepositoryPreview/RepositoryGraph/Node";

interface RepositoryGraphProps {
  branch: BranchResult;
  select: boolean;
  selectedCommits: CommitResult[];
}

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeTypes = { commit: CommitNode };

const RepositoryGraph = ({
  branch,
  select,
  selectedCommits,
}: RepositoryGraphProps) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const dispatch: AppDispatch = useDispatch();

  const updateNodes = useCallback(
    (nodes: Node[], selectedCommits: CommitResult[]) => {
      return nodes.map((node) => {
        const isNodeSelected =
          selectedCommits.findIndex(
            (selectedCommit) => selectedCommit.sha === node.id
          ) !== -1;
        node.data = { ...node.data, selected: isNodeSelected };
        return { ...node };
      });
    },
    []
  );

  useEffect(() => {
    const [initNodes, initEdges] = createNodesAndEdges(branch);
    const [placedNodes, placedEdges] = placeNodesOnCanvas(
      initNodes,
      initEdges,
      dagreGraph,
      "TB",
      60,
      36
    );
    setNodes(placedNodes);
    setEdges(placedEdges);
  }, [branch, setEdges, setNodes]);

  useEffect(() => {
    setNodes((prevNodes) => updateNodes(prevNodes, selectedCommits));
  }, [selectedCommits, setNodes, updateNodes]);

  const onConnect = (params: any) => setEdges((eds) => addEdge(params, eds));

  const onNodeClick = (event: any, node: Node) => {
    console.log(node);
    if (select) {
      dispatch(toggleCommitSelection(node.data.commit));
    } else {
      // todo: fetch metrics
    }
  };

  const openCommitDetails = (event: any, node: Node) => {};

  const closeCommitDetails = (event: any, node: Node) => {};

  return (
    <>
      {nodes.length && (
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          attributionPosition="top-right"
          zoomOnScroll={false}
          panOnScroll={true}
          onNodeClick={onNodeClick}
          onNodeMouseEnter={openCommitDetails}
          onNodeMouseLeave={closeCommitDetails}
          defaultPosition={[nodes[0].position.x, nodes[0].position.y]}
          nodeTypes={nodeTypes}
        >
          <Controls />
          <Background color="#aaa" gap={16} />
        </ReactFlow>
      )}
    </>
  );
};

export default RepositoryGraph;
