const readline = require('readline');
const fs = require('fs');
const path = require('path');
const fileName = '_410e934e6553ac56409b2cb7096a44aa_SCC.txt';
const pathName = path.join('./', fileName);
const scc = require('./scc');
const findSCCs = scc.findSCCs;
const addEdge = scc.addEdge;
const nodes = {};

const counter = function (nodes) {
    const leaders = findSCCs(nodes);
    const sccSizes = [];
    const leaderIds = Object.keys(leaders);
    for (var i = 0; i < leaderIds.length; i++) {
        sccSizes.push(leaders[i].length);
    }
    const sortedSccSizes = sccSizes.sort().reverse();
    console.dir(sortedSccSizes);
    const largestSCCsizes = sortedSccSizes.slice(0, 5);
    console.log('maximum SCCs sizes:' + largestSCCsizes);
};

const rl = readline.createInterface({
    input: fs.createReadStream(pathName)
});

rl.on('line', function (line) {
    const row = line.split(" ");
    const vertTail = row[0];
    const vertHead = row[1];
    addEdge(nodes, vertTail, vertHead);
});
rl.on('close', function () {
    counter(nodes);
});