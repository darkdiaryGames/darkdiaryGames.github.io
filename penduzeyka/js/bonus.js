const Bonus = () => {
  let x, y, type, life_time;

  const set = (n, m, snake, apple, bonus_type, bonus_list, initial_life_time) => {
    type = bonus_type;
    life_time = initial_life_time;
    let collision;
    let new_x, new_y;
    do {
      collision = false;
      new_x = Math.floor(Math.random() * n);
      new_y = Math.floor(Math.random() * m);
      if((new_x==apple.x) && (new_y==apple.y)) {
        collision = true;
      } else {
        for(let i=0; i<snake.x.length; i++) {
          if((new_x==snake.x[i]) && (new_y==snake.y[i])){
            collision = true;
          }
        }
        for(let i=0; i<bonus_list.length; i++) {
          let b = bonus_list[i].get();
          if((new_x==b.x) && (new_y==b.y)) {
            collision = true;
          }
        }
      }
    }while(collision)
    x = new_x;
    y = new_y;
    toggleCell(x, y, css_classes.bonus);
    toggleCell(x, y, css_classes.bonus_types[type]);

  }

  const kill = () => {
    toggleCell(x, y, css_classes.bonus);
    toggleCell(x, y, bonus_types[type]);
  }

  const get = () => {
    return {
      x, y, type, life_time
    }
  }

  const decreaseLifetime = () => {
    life_time--;
    return life_time;
  }

  return {
    set,
    get,
    kill,
    decreaseLifetime
  }
}
