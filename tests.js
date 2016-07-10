const scc = require('./scc');
const assert = require('assert');
const addEdge = scc.addEdge;
const Vertex = scc.Vertex;
const reverseEdges = scc.reverseEdges;
const nodesToEdgesArr = scc.nodesToEdgesArr;
const findFinishingTimes = scc.findFinishingTimes;
const findSCCs = scc.findSCCs;
const DFS = scc.DFS;
function genGraphWithEdges(edges) {
    const nodes = {};
    edges.map(function (edge) {
        addEdge(nodes, edge[0], edge[1]);
    });
    return nodes;
}
function genExampleGraph() {
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
    return genGraphWithEdges(edges);
}


const nodes = genExampleGraph();
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
const exploredNodesLabels = [];
DFS(nodes, 8, false, function (nodeLabel) {
    exploredNodesLabels.push(nodeLabel);
});
const visitFlags = [];
const nodeIds = Object.keys(nodes);
nodeIds.forEach(function (nodeId) {
    visitFlags.push(nodes[nodeId].visited);
});
assert.deepEqual([true, true, true, true, true, true, true, true, true], visitFlags);
assert.deepEqual([4, 1, 7, 3, 9, 6, 2, 5, 8], exploredNodesLabels);

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

assert.deepEqual([
    7,
    3,
    1,
    8,
    2,
    5,
    9,
    4,
    6
], findFinishingTimes(genExampleGraph()));
const anotherGraph = genExampleGraph();
assert.deepEqual({'3': [9, 6, 3], '7': [4, 1, 7], '8': [2, 5, 8]}, findSCCs(anotherGraph));

assert.deepEqual([], findFinishingTimes(genGraphWithEdges([])));
assert.deepEqual({}, findSCCs(genGraphWithEdges([])));

assert.deepEqual([1, 2], findFinishingTimes(genGraphWithEdges([[1, 2]])));

assert.deepEqual([3, 2, 1, 4, 5], findFinishingTimes(genGraphWithEdges([
    [2, 1],
    [1, 3],
    [3, 2],
    [1, 4],
    [4, 5]
])));
assert.deepEqual({1: [1, 2, 3], 4: [4], 5: [5]}, findSCCs(genGraphWithEdges([
    [2, 1],
    [1, 3],
    [3, 2],
    [1, 4],
    [4, 5]
])));
assert.deepEqual({1: [1], 2: [2]}, findSCCs(genGraphWithEdges([[1, 2]])));

assert.deepEqual({'1': [2, 1]}, findSCCs(genGraphWithEdges([[1, 2], [2, 1]])));

console.log('Pass');
