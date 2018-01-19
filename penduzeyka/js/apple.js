const Apple = (n, m) => {
  let x = -1,
      y = -1;

  const get = () => {
    return { x, y }
  }

  const set = snake => {
    toggleCell(x, y, css_classes.apple);
    while(true) {
      new_x = Math.floor(Math.random() * n);
      new_y = Math.floor(Math.random() * m);
      let in_snake = false;
      for(let i=0; i<snake.x.length; i++){
        if((snake.x[i]==new_x) && (snake.y[i]==new_y)){
          in_snake = true;
        }
      }
      if(!in_snake) {
        x = new_x;
        y = new_y;
        break;
      }
    }
    toggleCell(x, y, css_classes.apple);
  }

  return {
    set,
    get
  }
}
