//f(n)= g(n) + h(n)


var openSet = [], closedSet = [], cameFrom = [];

function printHtml(data) {
    document.getElementById("demo").innerHTML = data;
}

function removeFromArray(arr, element) {
    for (var i = arr.length - 1; i >= 0; i--) {
        if (arr[i] === element) {
            arr.splice(i, 1);
        }
    }
}

class Node {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    g = 0;
    h = 0;
    f = 10;

    neighbor = [];

    addNeighbors = () => {
        var x = this.x;
        var y = this.y;
        if (i < cols - 1) {
            this.neighbors.push(grid[x + 1][y]);//right
        }
        if (i > 0) {
            this.neighbors.push(grid[x - 1][y]);//left
        }
        if (j < rows - 1) {
            this.neighbors.push(grid[x][y + 1]);//bottom
        }
        if (rows > 0) {
            this.neighbors.push(grid[x][y - 1]);//top
        }
    }
}


function A_Star(start, goal, h) {
    openSet = start;
    const node = new Node();

    while (openSet.length > 0) {
        let winner = 0;
        for (let i = 0; i < openSet.length; i++) {
            if (openSet[i] < node.f) {
                winner = openSet[i];
            }
            var current = openSet[winner];
            if (current === goal) {
                console.log("Done, Finding the path!");
                findPath(cameFrom, current);
            }

            removeFromArray(openSet, current);
            let neighbor = node.neighbor;
            for (let i = 0; i < neighbor.length; i++) {
                
            }

        }
    }

}

const node = new Node();

printHtml(node.f);
