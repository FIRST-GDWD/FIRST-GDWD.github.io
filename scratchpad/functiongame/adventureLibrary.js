function isPlayerAttacking() {
  return player.classList.contains('attackLeft')
    || player.classList.contains('attackRight')
    || player.classList.contains('attackUp')
    || player.classList.contains('attackDown');
}

function logPlayerPosition() {
  console.log('player (x='+playerX+' y='+playerY+')');
}

function getBlock(targetX, targetY) {
  if (targetX < grid.length && targetY < grid[targetX].length) {
    return grid[targetX][targetY];
  } else {
    return null;
  }
}

function isBlockCrossable(targetX, targetY) {
  let block = getBlock(targetX, targetY);
  if (block == null) {
    return false;
  }
  return !block.classList.contains('rock')
    && !block.classList.contains('hole');
}

function getCrossablePathEnd(axis, startingIndex, targetIndex) {
  let pathEndIndex = startingIndex;
  if (startingIndex < targetIndex) {
    for (let i = startingIndex + 1; i <= targetIndex; i++) {
      if (
        axis == X && isBlockCrossable(i, playerY) ||
        axis == Y && isBlockCrossable(playerX, i)
      ) {
        pathEndIndex = i;
      } else {
        break;
      }
    }
  } else {
    for (let i = startingIndex - 1; i >= targetIndex; i--) {
      if (
        axis == X && isBlockCrossable(i, playerY) ||
        axis == Y && isBlockCrossable(playerX, i)
      ) {
        pathEndIndex = i;
      } else {
        break;
      }
    }
  }
  return pathEndIndex;
}

function getJumpablePathEnd(axis, startingIndex, targetIndex) {
  if (startingIndex < targetIndex) {
    for (let i = targetIndex; i > startingIndex; i--) {
      if (
        axis == X && isBlockCrossable(i, playerY) ||
        axis == Y && isBlockCrossable(playerX, i)
      ) {
        return i;
      }
    }
  } else {
    for (let i = targetIndex; i < startingIndex; i++) {
      if (
        axis == X && isBlockCrossable(i, playerY) ||
        axis == Y && isBlockCrossable(playerX, i)
      ) {
        return i;
      }
    }
  }
  return startingIndex;
}

function isBlockAttackable(targetX, targetY) {
  let block = getBlock(targetX, targetY);
  if (block == null) {
    return false;
  }
  return block.classList.contains('rock');
}

function attackBlock(targetX, targetY) {
  if (isBlockAttackable(targetX, targetY)) {
    let block = getBlock(targetX, targetY);
    block.classList.remove('rock');
    block.classList.add('gravel');
  }
}

function moveLeft(distance = 1) {
  let initX = playerX;
  let targetX = playerX;
  if (playerX - distance >= 0) {
    targetX -= distance;
  } else {
    targetX = 0;
  }
  playerX = getCrossablePathEnd(X, playerX, targetX);
  playerDirection = LEFT;
  if (playerX == initX) {
    nudge();
  }
}
function moveRight(distance = 1) {
  let initX = playerX;
  let targetX = playerX;
  if (playerX + distance < GRID_WIDTH) {
    targetX += distance;
  } else {
    targetX = GRID_WIDTH - 1;
  }
  playerX = getCrossablePathEnd(X, playerX, targetX);
  playerDirection = RIGHT;
  if (playerX == initX) {
    nudge();
  }
}
function moveDown(distance = 1) {
  let initY = playerY;
  let targetY = playerY;
  if (targetY + distance < grid[0].length) {
    targetY += distance;
  } else {
    targetY = grid[0].length - 1;
  }
  playerY = getCrossablePathEnd(Y, playerY, targetY);
  playerDirection = DOWN;
  if (playerY == initY) {
    nudge();
  }
}
function moveUp(distance = 1) {
  let initY = playerY;
  let targetY = playerY;
  if (targetY - distance >= 0) {
    targetY -= distance;
  } else {
    targetY = 0;
  }
  playerY = getCrossablePathEnd(Y, playerY, targetY);
  playerDirection = UP;
  if (playerY == initY) {
    nudge();
  }
}

function jumpLeft(distance = 1) {
  let targetX = playerX;
  if (playerX - distance >= 0) {
    targetX -= distance;
  } else {
    targetX = 0;
  }
  playerX = getJumpablePathEnd(X, playerX, targetX);
  playerDirection = LEFT;
  jump();
}
function jumpRight(distance = 1) {
  let targetX = playerX;
  if (playerX + distance < GRID_WIDTH) {
    targetX += distance;
  } else {
    targetX = GRID_WIDTH - 1;
  }
  playerX = getJumpablePathEnd(X, playerX, targetX);
  playerDirection = RIGHT;
  jump();
}
function jumpDown(distance = 1) {
  let targetY = playerY;
  if (targetY + distance < grid[0].length) {
    targetY += distance;
  } else {
    targetY = grid[0].length - 1;
  }
  playerY = getJumpablePathEnd(Y, playerY, targetY);
  playerDirection = DOWN;
  jump();
}
function jumpUp(distance = 1) {
  let targetY = playerY;
  if (targetY - distance >= 0) {
    targetY -= distance;
  } else {
    targetY = 0;
  }
  playerY = getJumpablePathEnd(Y, playerY, targetY);
  playerDirection = UP;
  jump();
}

function attack() {
  switch(playerDirection) {
    case DOWN:
      player.classList.add('attackDown');
      attackBlock(playerX, playerY+1);
      break;
    case UP:
      player.classList.add('attackUp');
      attackBlock(playerX, playerY-1);
      break;
    case LEFT:
      player.classList.add('attackLeft');
      attackBlock(playerX-1, playerY);
      break;
    case RIGHT:
      player.classList.add('attackRight');
      attackBlock(playerX+1, playerY);
      break;
  }
}
function nudge() {
  switch(playerDirection) {
    case DOWN:
      player.classList.add('nudgeDown');
      break;
    case UP:
      player.classList.add('nudgeUp');
      break;
    case LEFT:
      player.classList.add('nudgeLeft');
      break;
    case RIGHT:
      player.classList.add('nudgeRight');
      break;
  }
}
function jump() {
  player.classList.add('jump');
}
