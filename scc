function Vertex(inbound, outbound) {
    this.in = inbound || [];
    this.out = outbound || [];
    this.visited = false;
}

function addEdge(nodes, vertTail, vertHead) {
    if (vertHead == vertTail) {
        return false; // remove self-loop edges
    }
    if (!nodes.hasOwnProperty(vertTail)) {
        nodes[vertTail] = new Vertex(); // create vertex
    }
    nodes[vertTail].out.push(vertHead);//add pointer to another node

    if (!nodes.hasOwnProperty(vertHead)) {
        nodes[vertHead] = new Vertex();//create vertex to point to
    }

    nodes[vertHead].in.push(vertTail);// store a node pointing here
    return true;
}

function nodesToEdgesArr(nodes) {
    const verts = Object.keys(nodes);
    const edges = [];
    for (var i = 0; i < verts.length; i++) {
        var vertLabel = parseInt(verts[i]);
        var outgoing = nodes[vertLabel].out;
        //taking only outgoing:
        for (var j = 0; j < outgoing.length; j++) {
            var outLabel = outgoing[j];
            edges.push([vertLabel, outLabel])
        }
    }
    return edges;
}

function reverseEdges(nodes) {
    const edges = nodesToEdgesArr(nodes);
    const nodesWithReversedEdges = {};
    for (var i = 0; i < edges.length; i++) {
        var edge = edges[i];
        // add edge reversed into new graph
        addEdge(nodesWithReversedEdges, edge[1], edge[0]);
    }
    return nodesWithReversedEdges;
}

function DFS(nodes, vertexLabel, reverseEdges, onNewNodeExplored) {
    const currentVertex = nodes[vertexLabel];
    if (currentVertex.visited) {
        return;
    }
    currentVertex.visited = true;

    const neighbors = reverseEdges ? currentVertex.in : currentVertex.out;
    for (var i = 0; i < neighbors.length; i++) {
        var neighborLabel = neighbors[i];
        var neighbor = nodes[neighborLabel];
        if (neighbor.visited === false) {
            DFS(nodes, neighborLabel, reverseEdges, onNewNodeExplored);
        }
    }
    onNewNodeExplored(vertexLabel);
}
function findFinishingTimes(Graph) {
    console.log('finding finishing times');
    var labels = Object.keys(Graph).map(function (label) {
        return parseInt(label);
    });
    labels.sort(function (a, b) {
        return b - a; // sorting and reversing at the same time
    });
    const finishingTimes = new Array(labels.length);
    var t = 0;
    const onNewNodeExplored = function onNewNodeExplored(vertexLabel) {
        t++;
        finishingTimes[parseInt(vertexLabel) - 1] = t;
    };

    for (var i = 0; i < labels.length; i++) {
        var labelIth = labels[i];
        DFS(Graph, labelIth, true, onNewNodeExplored);
    }
    return finishingTimes;
}

function findLeaders(Graph, finishingTimes) {
    console.log('finding leaders');
    const leaders = {};
    var s = null;
    const onNewNodeExplored = function onNewNodeExplored(vertexLabel) {
        if (!leaders.hasOwnProperty(s)) {
            leaders[s] = [];
        }
        leaders[s].push(vertexLabel);
    };
    // being a little sloppy, we re-set 'visited' flag on the entire graph:
    for (var j = 0; j < finishingTimes.length; j++) {
        s = finishingTimes[j];
        Graph[s].visited = false;
    }

    for (var i = 0; i < finishingTimes.length; i++) {
        s = finishingTimes[i];
        if (Graph[s].visited === false) {
            DFS(Graph, s, false, onNewNodeExplored);
        }
    }
    return leaders;
}

function findSCCs(Graph) {
    //Kosaraju's two pass:
    // 1) run Depth-first search (aka DFS) on the reversed graph, to compute ordering of nodes
    // by finding "finishing time" for nodes
    const finishingTimes = findFinishingTimes(Graph);

    // 2) run DFS on original graph, finding Strongly Connected Components (SCCs)
    const leaders = findLeaders(Graph, finishingTimes);
    // return leaders object, containing information about vertices with the same leaderId
    return leaders;
}

module.exports = {
    Vertex: Vertex,
    findSCCs: findSCCs,
    addEdge: addEdge,
    nodesToEdgesArr: nodesToEdgesArr,
    reverseEdges: reverseEdges,
    findFinishingTimes: findFinishingTimes,
    findLeaders: findLeaders,
    DFS: DFS
};