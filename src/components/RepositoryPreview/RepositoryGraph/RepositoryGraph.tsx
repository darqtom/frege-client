import React, { useEffect } from "react";
import ReactFlow, {
  addEdge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Node,
} from "react-flow-renderer";
import dagre from "dagre";

import { BranchResult, CommitResult } from "models/RepositoryResult";
import { prepareNodes, placeNodesOnCanvas } from "utils/repositoryNodes";
import { AppDispatch } from "store/store";
import { useDispatch } from "react-redux";
import { toggleCommitSelection } from "store/slices/commitsComparing";

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

interface RepositoryGraphProps {
  branch: BranchResult;
  select: boolean;
  selectedCommits: CommitResult[];
}

const RepositoryGraph = ({
  branch,
  select,
  selectedCommits,
}: RepositoryGraphProps) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const { nodes: preparedNodes, edges: preparedEdges } = prepareNodes(
      branch,
      selectedCommits
    );
    const { nodes: placedNodes, edges: placedEdges } = placeNodesOnCanvas(
      preparedNodes,
      preparedEdges,
      dagreGraph,
      "TB",
      60,
      36
    );
    setNodes(placedNodes);
    setEdges(placedEdges);
  }, [branch, setEdges, setNodes, selectedCommits]);

  const onConnect = (params: any) => setEdges((eds) => addEdge(params, eds));

  const onNodeClick = (event: any, node: Node) => {
    if (select) {
      dispatch(toggleCommitSelection(node.data.commit));
    } else {
      // todo: fetch metrics
    }
  };

  const openCommitDetails = (event: any, node: Node) => {

  };

  const closeCommitDetails = (event: any, node: Node) => {

  };
  
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
        >
          <Controls />
          <Background color="#aaa" gap={16} />
        </ReactFlow>
      )}
    </>
  );
};

export default RepositoryGraph;
