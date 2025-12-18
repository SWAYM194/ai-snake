function findPath(snake, food) {
  const dirs = [
    {x:1,y:0},{x:-1,y:0},{x:0,y:1},{x:0,y:-1}
  ];

  let queue = [];
  let visited = new Set();
  let start = snake[0];

  queue.push({pos:start, path:[]});
  visited.add(start.x + "," + start.y);

  while(queue.length){
    let current = queue.shift();

    if(current.pos.x === food.x && current.pos.y === food.y){
      return current.path;
    }

    for(let d of dirs){
      let nx = current.pos.x + d.x;
      let ny = current.pos.y + d.y;
      let key = nx + "," + ny;

      if(nx < 0 || ny < 0 || nx >= 20 || ny >= 20) continue;
      if(snake.some(s => s.x===nx && s.y===ny)) continue;
      if(visited.has(key)) continue;

      visited.add(key);
      queue.push({
        pos:{x:nx,y:ny},
        path:[...current.path,{x:nx,y:ny}]
      });
    }
  }
  return null;
}
