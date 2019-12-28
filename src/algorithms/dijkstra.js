//https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm <<<<< Dijkstra's Algorithm
//this will run Dijkstra's algo, returns all of the nodes in the order that which they were visited. Also will point back to the previous node, allowing us to compute shortest 
//path by backtracking from the ending node

//pass grid, startNode and finishNode into function
export function dijkstra(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  //set start node distance to 0
  startNode.distance = 0;
  const unvisitedNodes = getAllNodes(grid); 
  while(!!unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();
    //if we hit a wall skip it
    if(closestNode.isWall) continue;
    //if the closest node is at a distance of infinity, must be trapped and should stop algorithm
    if(closestNode.distance === Infinity) return visitedNodesInOrder;
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    //final check is met when the closest node is the finish node
    if(closestNode === finishNode) return visitedNodesInOrder;
    updateUnvisitedNeighbors(closestNode, grid);
  }
}

//everytime a hit a new unvisited node sort the array of nodesby their distance 
function sortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

//update surrounding nodes +1
function updateUnvisitedNeighbors(node, grid){
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for(const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
}

function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const {col, row} = node;
  if(row > 0) neighbors.push(grid[row - 1][col]);
  if(row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if(col > 0) neighbors.push(grid[row][col - 1]);
  if(col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter(neighbor => !neighbor.isVisited);
}

function getAllNodes(grid) {
  const nodes = [];
  for(const row of grid){
    for(const node of row){
      nodes.push(node);
    }
  }
  return nodes;
}

//this will backtrack from the finishedNode to calculate the shortest path
//only works when called after the dijkstras method above
export function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while(currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}