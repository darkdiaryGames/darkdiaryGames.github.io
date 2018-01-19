let Snake = function(initial_length, n, m) {
  let x, y, direction;

  const restart = () => {
    toggleCell(x[0], y[0], css_classes.head);
    for(i=1; i < x.length; i++) {
      toggleCell(x[i], y[i], css_classes.body);
    }
    init();
  }

  const checkCollision = () => {
    let collision = false;
    for(let i=1; i < x.length; i++) {
      if((x[0]==x[i]) && (y[0]==y[i])) {
        collision = true;
      }
    }
    return collision;
  }

  const checkEatApple = apple => {
    var eat = false;
    if((apple.x==x[0]) && (apple.y==y[0])) {
      eat = true;
    }
    return eat;
  }

  const getDirection = () => {
    return direction;
  }

  const setDirection = (dir) => {
    direction = dir;
  }

  const getBody = () => {
    return { x, y }
  }

  const move = () => {
    if(!move_keys.includes(direction)) return; 
    toggleCell(x[0], y[0], css_classes.head);
    toggleCell(x[0], y[0], css_classes.body);
    toggleCell(x[x.length - 1], y[y.length - 1], css_classes.body);
    for(let i=x.length - 1; i > 0; i--) {
      x[i] = x[i-1];
      y[i] = y[i-1];
    }
    if(control_keys.up.includes(direction)) {
      x[0] > 0 ? x[0]-- : x[0] = n - 1;
    }
    if(control_keys.left.includes(direction)) {
      y[0] > 0 ? y[0]-- : y[0] = m - 1;
    }
    if(control_keys.down.includes(direction)) {
      x[0] = (x[0] + 1) % n;
    }
    if(control_keys.right.includes(direction)) {
      y[0] = (y[0] + 1) % m;
    }

    toggleCell(x[0], y[0], css_classes.head);
    return checkCollision();
  }

  const grow = () => {
    x.push(-1);
    y.push(-1);
  }

  const init = () => {
    direction = '';
    x = [4, ];
    y = [4, ];
    toggleCell(x[0], y[0], css_classes.head);
    for(let i=1; i<initial_length; i++) {
      x.push(-1);
      y.push(-1);
    }
  }

  init();
  return {
    restart,
    move,
    checkCollision,
    checkEatApple,
    getDirection,
    setDirection,
    getBody,
    grow
  }
}
