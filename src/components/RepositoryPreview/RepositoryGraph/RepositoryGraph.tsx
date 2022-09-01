import React, { useEffect } from "react";
import ReactFlow, {
  addEdge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from "react-flow-renderer";
import dagre from "dagre";

import { RepositoryResult } from "models/RepositoryResult";
import { prepareNodes, placeNodesOnCanvas } from "utils/repositoryNodes";
import Spinner from "components/Spinner";

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

type RepositoryGraphProps = {
  status: "idle" | "loading";
  error: string | null;
  branches: RepositoryResult[];
};

const RepositoryGraph = ({ branches, status, error }: RepositoryGraphProps) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    const { nodes: preparedNodes, edges: preparedEdges } =
      prepareNodes(branches);
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
  }, [branches, setEdges, setNodes]);

  const onConnect = (params: any) => setEdges((eds) => addEdge(params, eds));

  return (
    <div className="whiteBox flex flex-1 md:flex-col md:h-full p-10">
      {status === "loading" && <Spinner />}
      {status === "idle" && branches.length > 0 && (
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          attributionPosition="top-right"
          zoomOnScroll={false}
          panOnScroll={true}
        >
          <Controls />
          <Background color="#aaa" gap={16} />
        </ReactFlow>
      )}
    </div>
  );
};

export default RepositoryGraph;
