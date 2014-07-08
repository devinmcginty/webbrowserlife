var toggleOn = false;
var gridRun;
var GRIDBOUND = 40;
var grid = [];
var tempGrid = [];

function generateCheckboxes() {
    var $grid = $("#grid");
    var gridHTML = "";
    for (var i = 0; i < GRIDBOUND; i++) {
        var row = [];
        for (var j = 0; j < GRIDBOUND; j++) {
            row.push(0);
            var checkboxHTML = "<input type=\"checkbox\" id=\"";
            checkboxHTML += i + "_" + j + "\" />";
            gridHTML += checkboxHTML;
        }
        grid.push(row);
        gridHTML += "<br />";
    }
    $grid.html(gridHTML);
    tempGrid = grid.map(function(r) { return r.slice(0); });
}

function neighborhood(row, col) {
    var count = 0;
    count += isNaN(tempGrid[row][col - 1])?0:tempGrid[row][col - 1];
    count += isNaN(tempGrid[row][col + 1])?0:tempGrid[row][col + 1];
    if (row == 0) {
        count += tempGrid[row + 1][col];
        count += isNaN(tempGrid[row + 1][col - 1])?0:tempGrid[row + 1][col - 1];
        count += isNaN(tempGrid[row + 1][col + 1])?0:tempGrid[row + 1][col + 1];
    }
    else if (row == (GRIDBOUND - 1)) {
        count += tempGrid[row - 1][col];
        count += isNaN(tempGrid[row - 1][col - 1])?0:tempGrid[row - 1][col - 1];
        count += isNaN(tempGrid[row - 1][col + 1])?0:tempGrid[row - 1][col + 1];
    }
    else {
        count += tempGrid[row - 1][col];
        count += tempGrid[row + 1][col];
        count += isNaN(tempGrid[row - 1][col - 1])?0:tempGrid[row - 1][col - 1];
        count += isNaN(tempGrid[row - 1][col + 1])?0:tempGrid[row - 1][col + 1];
        count += isNaN(tempGrid[row + 1][col - 1])?0:tempGrid[row + 1][col - 1];
        count += isNaN(tempGrid[row + 1][col + 1])?0:tempGrid[row + 1][col + 1];
    }
    if (tempGrid[row][col] == 0){
        if (count == 3) {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        if (count < 2 || count > 3) {
            return true;
        }
        else {
            return false;
        }
    }
}

function runGeneration() {
    tempGrid = grid.map(function(r) { return r.slice(0); });
    var $cell;
    for (var i = 0; i < GRIDBOUND; i++) {
        for (var j = 0; j < GRIDBOUND; j++) {
            $cell = $("#"+i+"_"+j);
            if (neighborhood(i,j)) {
                $cell.trigger("click");
            }
        }
    }
}

function toggleGrid() {
    if (toggleOn) {
        //  Turn off
        console.log(toggleOn);
        toggleOn = false;
        window.clearInterval(gridRun);
    }
    else {
        //  Turn on
        console.log(toggleOn);
        toggleOn = true;
        gridRun = window.setInterval( function() {
            runGeneration();
        }, 100);
    }
}

function toggleCell(row, col) {
    if (grid[row][col] === 0) {
        grid[row][col] = 1;
    }
    else {
        grid[row][col] = 0;
    }
}

function generateGrid() {
    $(":checkbox").attr("checked", false);
    for (var i = 0; i < GRIDBOUND; i++) {
        for (var j = 0; j < GRIDBOUND; j++) {
            var $cell = $("#"+i+"_"+j);
            grid[i][j] = 0;
            var r = Math.random();
            if (r > 0.7) {
                $cell.trigger("click");
            }
        }
    }
}

$(document).ready( function() {
    generateCheckboxes();
    $("#toggle").click( function() { toggleGrid(); });
    $("#generate").click( function() { generateGrid(); });
    $(":checkbox").change( function() {
        var rc = $(this).attr("id").split("_");
        toggleCell(rc[0], rc[1]);
    });
});
