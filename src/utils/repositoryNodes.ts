import { Node, Edge, MarkerType, Position } from "react-flow-renderer";
import dagre from "dagre";

import { BranchResult, CommitResult } from "../models/RepositoryResult";

const defaultPosition = { x: 0, y: 0 };
const defaultStyle = {
  width: "60px",
  height: "36px",
  color: "#222",
  opacity: 0.8,
};

export function prepareNodes(
  branch: BranchResult,
  selectedCommits: CommitResult[]
): {
  nodes: Node[];
  edges: Edge[];
} {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  branch.commits.forEach((commit) => {
    console.log("prepare nodes");
    const isNodeSelected =
      selectedCommits.findIndex(
        (selectedCommit) => selectedCommit.sha === commit.sha
      ) !== -1;

    const backgroundColor = isNodeSelected ? "#1abc9c" : "#bdc3c7";

    const node: Node = {
      id: commit.sha,
      data: {
        commit: commit,
        label: commit.sha.slice(0, 5),
        selected: isNodeSelected
      },
      position: defaultPosition,
      style: { ...defaultStyle, backgroundColor },
    };

    if (commit.parents.length === 0) {
      node.type = "output";
    }

    nodes.push(node);

    commit.parents.forEach((parent) => {
      const edge: Edge = {
        id: `e${commit.sha}-${parent.sha}`,
        source: commit.sha,
        target: parent.sha,
        markerEnd: { type: MarkerType.ArrowClosed },
      };

      edges.push(edge);
    });
  });

  return { nodes, edges };
}

export function placeNodesOnCanvas(
  nodes: Node[],
  edges: Edge[],
  graph: dagre.graphlib.Graph<{}>,
  direction = "TB",
  nodeWidth: 60,
  nodeHeight: 36
) {
  const isHorizontal = direction === "LR";
  graph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    graph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    graph.setEdge(edge.source, edge.target);
  });

  dagre.layout(graph);

  nodes.forEach((node) => {
    const nodeWithPosition = graph.node(node.id);
    node.targetPosition = isHorizontal ? Position.Left : Position.Top;
    node.sourcePosition = isHorizontal ? Position.Right : Position.Bottom;

    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };

    return node;
  });

  return { nodes, edges };
}
