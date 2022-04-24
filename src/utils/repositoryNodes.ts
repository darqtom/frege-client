import { Node, Edge, MarkerType, Position } from "react-flow-renderer";
import dagre from "dagre";

import { RepositoryResult } from "../models/RepositoryResult";

const defaultPosition = { x: 0, y: 0 };
const defaultStyle = {
  width: "60px",
  height: "36px",
  backgroundColor: "#16A34A",
  color: "#ffffff",
  opacity: 0.8,
};

export function prepareNodes(repositoryResults: RepositoryResult[]): {
  nodes: Node[];
  edges: Edge[];
} {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  repositoryResults.forEach((branch) => {
    branch.commits.forEach((commit) => {
      const node: Node = {
        id: commit.sha,
        data: {
          label: commit.sha.slice(0, 5),
        },
        position: defaultPosition,
        style: defaultStyle,
      };

      if (commit.parents.length === 0) {
        node.type = "output";
      }

      nodes.push(node);

      commit.parents.forEach((parent) => {
        const edge: Edge = {
          id: `e${commit.sha}-${parent}`,
          source: commit.sha,
          target: parent,
          markerEnd: { type: MarkerType.ArrowClosed },
        };

        edges.push(edge);
      });
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
