const toggleCell = function(x, y, name) {
  let el = document.getElementById(`item_${x}_${y}`);
  if(el) {
    el.classList.toggle(name);
    if(name==css_classes.body) {
      if(el.style['background-image']) {
        el.style['background-image'] = '';
      } else {
        let index = Math.floor(Math.random() * body_images.length);
        el.style['background-image'] = `url(${body_images[index]})`;
      }
    }
  }
}

const toggleArrayCell = function(array, name) {
  for(i = 0; i < array.length; i++) {
    for(j = 0; j < array[0].length; j++){
      if(array[i][j] == 1) {
        toggleCell(i, j, name);
      }
    }
  }
}
