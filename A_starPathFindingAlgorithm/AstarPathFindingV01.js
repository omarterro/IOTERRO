function removeFromArray(arr, element) {
  for (var i = arr.length - 1; i >= 0; i--) {
    if (arr[i] === element) {
      arr.splice(i, 1);
    }
  }
}

function heuristic(a, b) {
  // var d = dist(a.i, a.j, b.i, b.j);//euclidien distance

  var d = abs(a.i - b.i) + abs(a.j - b.j);
  return d;
}


var cols = 5;
var rows = 5;
// var grid = new Array(cols);
var grid = [];

var openSet = [];//store the nodes that have to be evaluated
var closeSet = [];//store the nodes that has already evaluated
var start, end;
var w, h;
var path = [];


function Spot(i, j) {

  this.i = i;
  this.j = j;

  //every object have a f value, g value and h value (we need to know for each cell(spot) in the grid what are those values (f,g,h) )
  this.f = 0;
  this.g = 0;
  this.h = 0;

  this.neighbors = [];

  this.previous = undefined;

  this.show = function (color) {
    fill(color);
    stroke(160, 230, 32);
    // noStroke();
    rect(this.i * w, this.j * h, w, h);
  }

  this.addNeighbors = function (grid) {
    var i = this.i;
    var j = this.j;
    if (i < cols - 1) {
      this.neighbors.push(grid[i + 1][j]);//right
    }
    if (i > 0) {
      this.neighbors.push(grid[i - 1][j]);//left
    }
    if (j < rows - 1) {
      this.neighbors.push(grid[i][j + 1]);//bottom
    }
    if (rows > 0) {
      this.neighbors.push(grid[i][j - 1]);//top
    }
  }
}

function setup() {
  createCanvas(200, 200);
  w = width / cols;
  // console.log("width: " + w)
  h = height / rows;
  // console.log("height: " + h)
  //Making a 2D array
  for (var i = 0; i < cols; i++) {
    // grid[i] = new Array(rows);
    grid[i] =[];
  }

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j] = new Spot(i, j);
    }
  }

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].addNeighbors(grid);
    }
  }

  start = grid[0][0];
  // end = grid[cols - 1][rows - 1];
  end = grid[cols - 1][rows - 1];

  openSet.push(start);
}

function draw() {
  //as long as there are spots to be evaluated, let me start evaluating those spots
  if (openSet.length > 0) {
    //we can keep going
    var winner = 0;//the lowest index
    console.log(winner);
    for (var i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[winner].f) {
        winner = i;
      }
    }
    var current = openSet[winner];
    if (current === end) {
      noLoop();
      console.log("DONE!");
    }

    removeFromArray(openSet, current);
    closeSet.push(current);

    var neighbors = current.neighbors;
    for (var i = 0; i < neighbors.length - 1; i++) {
      var neighbor = neighbors[i];
      if (!closeSet.includes(neighbor)) {
        var tempG = current.g + 1;
        if (openSet.includes(neighbor)) {
          if (tempG < neighbor.g) {
            neighbor.g = tempG;//know neigbor can be the new g that's lower than the old g 
          }
        }
        else {
          //if it's not in the openSet, so added to it.
          neighbor.g = tempG;
          openSet.push(neighbor);
        }
        neighbor.h = heuristic(neighbor, end);
        neighbor.f = neighbor.g + neighbor.h;
        neighbor.previous = current;//where the neighbor came from
      }
    }
  } else {
    //no solution
  }

  background(0);

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].show(color(0));
    }
  }

  for (var i = 0; i < closeSet.length; i++) {
    closeSet[i].show(color(255, 0, 0));//red
  }


  for (var i = 0; i < openSet.length; i++) {
    openSet[i].show(color(0, 255, 0));//green
  }

  //Find the path
  path = [];
  var temp = current;
  while (temp.previous) {
    path.push(temp.previous);
    temp = temp.previous;
  }
  //draw the path
  for (var i = 0; i < path.length; i++) {
    path[i].show(color(0, 0, 255));
  }

}
