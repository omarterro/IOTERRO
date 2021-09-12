// A* is an informed search algorithm, or a best-first search, meaning that it is formulated in terms of weighted graphs: starting from a specific starting node of a graph, it aims to find a path to the given goal node having the smallest cost (least distance travelled, shortest time, etc.). It does this by maintaining a tree of paths originating at the start node and extending those paths one edge at a time until its termination criterion is satisfied.

// At each iteration of its main loop, A* needs to determine which of its paths to extend. It does so based on the cost of the path and an estimate of the cost required to extend the path all the way to the goal. Specifically, A* selects the path that minimizes

//f(n)=g(n)+h(n)

const startEndPoints = document.querySelectorAll('[data-max]');
const visualizeBtn = document.querySelector("#visualize");
const addWallsBtn = document.querySelector("#add-wall-btn");
const clearBoardBtn = document.querySelector("#clear-board");

var cols = 25, rows = 25;
var grid = [];
var start, end;
var nodeW, nodeH;//node width and node height
var openSet = [], closedSet = [];
var path = [], pathState = false;
var noSolution = false, Done = false;
var wallsPerc = 0.1;//10 % 
var startX = 0, startY = 0, endX = cols - 1, endY = rows - 1;

function Node(x, y) {
    this.x = x;
    this.y = y;

    this.f = 0;
    this.g = 0;
    this.h = 0;

    this.neighbors = [];

    this.cameFrom = undefined;
    this.wall = false;

    if (random(1) < wallsPerc) {
        this.wall = true;
    }

    this.addNeighbors = function () {
        let x = this.x;
        let y = this.y;

        if (x < cols - 1) {
            this.neighbors.push(grid[x + 1][y]);//right neighbor
        }
        if (x > 0) {
            this.neighbors.push(grid[x - 1][y]);//left neighbor
        }
        if (y < rows - 1) {
            this.neighbors.push(grid[x][y + 1]);//bottom neighbor
        }
        if (y < 0) {
            this.neighbors.push(grid[x][y - 1])//top neighbor
        }
    }

    this.show = function (color) {
        fill(color);
        if (this.wall) {
            fill(0);
        }
        // noStroke();
        stroke(20, 200, 120);
        rect(this.x * nodeW, this.y * nodeH, nodeW, nodeH);
    }
}

function setup() {
    createCanvas(400, 400);
    nodeW = width / cols;
    nodeH = height / rows;
    for (var i = 0; i < cols; i++) {
        grid[i] = [];
    }

    for (var x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
            grid[x][y] = new Node(x, y);
        }
    }

    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j].addNeighbors();
        }
    }

    fromTo(startX, startY, endX, endY);//(start point : col, row) (End point: col, row)
    openSet.push(start);
}

function draw() {
    if (openSet.length > 0) {
        var winner = 0;
        for (let i = 0; i < openSet.length; i++) {
            if (openSet[i].f < openSet[winner].f) {
                winner = i;
            }
        }
        var current = openSet[winner];
        if (current === end) {
            pathState = true;
            noLoop();
        }
        removeFromArray(openSet, current);
        closedSet.push(current);

        var neighbors = current.neighbors;
        for (let i = 0; i < neighbors.length; i++) {
            let neighbor = neighbors[i];
            if (!closedSet.includes(neighbor) && !neighbor.wall) {
                let tempG = current.g + 1;
                if (openSet.includes(neighbor)) {
                    if (tempG < neighbor.g) {
                        neighbor.g = tempG;
                    }
                }
                else {
                    neighbor.g = tempG;
                    openSet.push(neighbor);
                }
                neighbor.h = heuristic(neighbor, end);
                neighbor.f = neighbor.g + neighbor.h;
                neighbor.cameFrom = current;
            }
        }
        noSolution = false;
    } else if (noSolution === false) {
        noSolution = true;
        console.log("no solution");
        alert("There's no solution");
    }
    background(255, 0, 0);

    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j].show(color(255));
        }
    }

    for (var i = 0; i < closedSet.length; i++) {
        closedSet[i].show(color(247, 30, 120));
    }

    for (var i = 0; i < openSet.length; i++) {
        openSet[i].show(color(0, 255, 0));
    }

    if (pathState === true) {
        pathState = false;
        Done = true;
        console.log("DONE!");
    }


    if (!noSolution) {
        findThePath(current);
    }

    if (Done === true) {
        Done = false;
        addWallsDisabled();
    }
    else {
        addWallsBtn.disabled = false;
        addWallsBtn.style.backgroundColor = "#3CC6AB";
    }
}

fromTo = (colS = 0, rowS = 0, colE = cols - 1, rowE = rows - 1) => {
    start = grid[colS][rowS];
    end = grid[colE][rowE];
    start.wall = false;
    end.wall = false;
}


removeFromArray = (arr, elt) => {
    for (let i = arr.length - 1; i >= 0; i--) {
        if (arr[i] === elt) {
            arr.splice(i, 1);
        }
    }
}

heuristic = (a, b) => {
    let euclidien = dist(a.i, a.j, b.i, b.j);
    // let ManhatenDist = abs(a.i - b.i) + abs(a.j - b.j);
    return euclidien;
}

findThePath = (current) => {
    path = [];
    var temp = current;
    while (temp.cameFrom) {
        path.push(temp.cameFrom);
        temp = temp.cameFrom;
    }

    //draw the path
    for (var i = 0; i < path.length; i++) {
        path[i].show(color(140, 44, 230));
    }
    path.push(start);
    path.push(end);
    path[path.length - 2].show(color(112, 185, 94));
    path[path.length - 1].show(color(112, 185, 94));
}

clearBoard = () => {
    closedSet = [];
    openSet = [];
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j].show(color(255));
        }
    }
}

addWallsDisabled = () => {
    addWallsBtn.style.backgroundColor = "red";
    addWallsBtn.disabled = true;
}

startEndPoints[0].addEventListener("click", () => {
    startX = startEndPoints[0].value;
    startX = parseInt(startX);
})


startEndPoints[1].addEventListener("click", () => {
    startY = startEndPoints[1].value;
    startY = parseInt(startY);
})

startEndPoints[2].addEventListener("click", () => {
    endX = startEndPoints[2].value;
    endX = parseInt(endX);
})

startEndPoints[3].addEventListener("click", () => {
    endY = startEndPoints[3].value;
    endY = parseInt(endY);
})


visualizeBtn.addEventListener("click", () => {
    openSet = [];
    closedSet = [];
    setup();
    loop();
})

addWallsBtn.addEventListener("click", () => {
    wallsPerc += .05;
    clearBoard();
    setup();
})

clearBoardBtn.addEventListener("click", () => {
    clearBoard();
    wallsPerc = 0.1;
})