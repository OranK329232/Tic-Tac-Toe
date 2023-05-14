
const tiles = document.getElementsByClassName("tile");

for (let playedTile of tiles) {
    playedTile.addEventListener('click',  function () { tileClicked(playedTile, tiles) });
}

function getTileIndex(tile, tiles) {
    let playedTileIndex;
    for (let i = 0; i < tiles.length; i++) {
        if (tiles[i] == tile) {
            playedTileIndex = i;
        }
    }
    return playedTileIndex;
}

function tileOwner(tile) {
    tileClasses = tile.classList
    for (let tileClass of tileClasses) {
        if (tileClass == "o-tile") {
            return "O";
        } else if (tileClass == "x-tile") {
            return "X"
        }
    }
    return null;
} 

function updateIndicator(currentPlayer, playedTile) {
    if (currentPlayer == "X") {
        playedTile.classList.add("x-tile");
        document.getElementById("player-indicator").innerHTML = "O's turn";
    } else {
        playedTile.classList.add("o-tile");
        document.getElementById("player-indicator").innerHTML = "X's turn";
    }
}

function tileClicked(playedTile, tiles) {
    
    let playerIndicator = document.getElementById("player-indicator").innerHTML;
    let currentPlayer = playerIndicator[0];

    if (playerIndicator == "X wins!" || playerIndicator == "O wins!") {
        return;
    }
    if (tileOwner(playedTile) != null) {
        return;
    }

    updateIndicator(currentPlayer, playedTile);
    
    playedTile.classList.remove("playable");
    playedTile.classList.add("played");
    
    playedTileIndex = getTileIndex(playedTile, tiles);

    let tileIndex = {"row" : Math.floor(playedTileIndex/3), "column" : playedTileIndex % 3};
    let isWin = {"row" : true, "column" : true, "diag" : true};
    for (let i = 0; i < 3; i++) {
        let checkTile = tiles[(tileIndex["row"]*3)+i];
        if (tileOwner(checkTile) != currentPlayer || checkTile == null) {
            isWin["row"] = false;
        }
        checkTile = tiles[tileIndex["column"]+(i*3)];
        if (tileOwner(checkTile) != currentPlayer || checkTile == null) {
            isWin["column"] = false;
        }
    }

    playedCorner = playedTileIndex%4;
    let increment;
    if (playedCorner == 0) {
        increment = 4;
    } else if (playedCorner == 2) {
        increment = 2;
    } else {
        increment = null;
    }
    
    do {
        let indexCheck = playedCorner;
        if (increment != null) {
            for (let i = 0; i < 3; i++) {
                checkTile = tiles[indexCheck];
                if (tileOwner(checkTile) != currentPlayer || checkTile == null) {
                    isWin["diag"] = false;
                }
                indexCheck += increment;
            }
        } else {
            isWin["diag"] = false;
        }
        if (increment == 4 && playedTileIndex == 4 && !isWin["diag"]) {
            increment = 2;
            playedCorner = 2;
            isWin["diag"] = true;
        } else {
            increment = 4;
        }
    } while (playedTileIndex == 4 && increment == 2);

    if (isWin["row"] || isWin["column"] || isWin["diag"]) {
        document.getElementById("player-indicator").innerHTML = currentPlayer + " wins!"
        for (let playedTile of tiles) {
            playedTile.classList.add("played");
            playedTile.classList.remove("playable");

        }
    }
}