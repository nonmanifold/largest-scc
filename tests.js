const scc = require('./scc');
const assert = require('assert');
const addEdge = scc.addEdge;
const Vertex = scc.Vertex;
const reverseEdges = scc.reverseEdges;
const nodesToEdgesArr = scc.nodesToEdgesArr;
const DFS = scc.DFS;
const edges = [
    [1, 4],
    [7, 1],
    [4, 7],

    [9, 7],

    [6, 9],
    [9, 3],
    [3, 6],

    [8, 6],

    [8, 5],
    [5, 2],
    [2, 8]
];
const nodes = {};
edges.map(function (edge) {
    addEdge(nodes, edge[0], edge[1]);
});
assert.deepEqual(new Vertex([7], [4]), nodes[1]);
assert.deepEqual(new Vertex([5], [8]), nodes[2]);
assert.deepEqual(new Vertex([9], [6]), nodes[3]);
assert.deepEqual(new Vertex([1], [7]), nodes[4]);
assert.deepEqual(new Vertex([8], [2]), nodes[5]);
assert.deepEqual(new Vertex([3, 8], [9]), nodes[6]);
assert.deepEqual(new Vertex([4, 9], [1]), nodes[7]);
assert.deepEqual(new Vertex([2], [6, 5]), nodes[8]);
assert.deepEqual(new Vertex([6], [7, 3]), nodes[9]);

// check that if we start at node with label 8, we visit all nodes with DFS:
DFS(nodes, nodes['8']);
const visitFlags = [];
const nodeIds = Object.keys(nodes);
nodeIds.forEach(function (nodeId) {
    visitFlags.push(nodes[nodeId].visited);
});
assert.deepEqual([true, true, true, true, true, true, true, true, true], visitFlags);

const edgesSerializedBack = nodesToEdgesArr(nodes);
assert.deepEqual([1, 4], edgesSerializedBack[0]);
assert.deepEqual([
        [1, 4],
        [2, 8],
        [3, 6],
        [4, 7],
        [5, 2],
        [6, 9],
        [7, 1],
        [8, 6],
        [8, 5],
        [9, 7],
        [9, 3]
    ],
    edgesSerializedBack
);


const nodesToRev = {};
addEdge(nodesToRev, 1, 2);
assert.deepEqual([[2, 1]], nodesToEdgesArr(reverseEdges(nodesToRev)));

console.log('Pass');