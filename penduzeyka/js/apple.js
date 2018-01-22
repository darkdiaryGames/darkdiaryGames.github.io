const Apple = (n, m) => {
  let x = -1,
      y = -1;

  const get = () => {
    return { x, y }
  }

  const set = (snake, bonus_list) => {
    toggleCell(x, y, css_classes.apple);
    let new_x, new_y;
    let collision;
    do {
      collision = false;
      new_x = Math.floor(Math.random() * n);
      new_y = Math.floor(Math.random() * m);
      for(let i=0; i<snake.x.length; i++){
        if((snake.x[i]==new_x) && (snake.y[i]==new_y)){
          collision = true;
        }
      }
      for(let i=0; i<bonus_list.length; i++) {
        let bonus = bonus_list[i].get();
          if((new_x==bonus.x) && (new_y==bonus.y)) {
            collision = true;
          }
      }
    } while(collision)
    x = new_x;
    y = new_y;
    toggleCell(x, y, css_classes.apple);
  }

  return {
    set,
    get
  }
}
