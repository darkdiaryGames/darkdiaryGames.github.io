var Game = (n=20, m=20, speed=0.1, initial_length=3) => {
  let state = 'game',
      score = 0,
      highscore = 0,
      steps_till_screamer = -1,
      last_frame_time = 0,
      key = '';
      gameover_state = 0;
  const gameover_text = [
    '00000000000000000000',
    '00000001111110000000',
    '00000010001001000000',
    '00000111000011100000',
    '00000100111100100000',
    '00000100000000100000',
    '00000100000000100000',
    '00000100000000100000',
    '00000100000000100000',
    '00000100000000100000',
    '00000100000000100000',
    '00000100000000100000',
    '00000100000000100000',
    '00000100000000100000',
    '01110100000000101110',
    '10001100000000110001',
    '10000100000000100001',
    '10000100000000100001',
    '10000100000000100001',
    '01000000000000000010',
  ];
  const music = {
    game: new Audio('media/super_mario_bros.mp3'),
    pause: new Audio('media/pauseMusic.mp3'),
    gameover: new Audio('media/gameoverSound.mp3'),
    screamer: new Audio('media/screamSound.mp3')
  }

  const createBoard = () => {
    let table =  '';
    for(let i=0; i<n; i++) {
      let row = '';
      for(let j=0; j<m; j++) {
        row += `<td id="item_${i}_${j}"></td>`;
      }
      table += `<tr>${row}</tr>`;
    }
    el = document.createElement(css_classes.table);
    el.innerHTML = table;
    document.getElementById(css_classes.game).appendChild(el);
  }

  const update = () => {
    if(state=='pause') {
      if(control_keys.pause.includes(key)) {
        state = 'game';
        stateMusicChange();
        key = '';
      }
    } else if(state=='game') {
      if(control_keys.pause.includes(key)) {
        state = 'pause';
        stateMusicChange();
        key = '';
        return;
      }
      if(move_keys.includes(key)) {
        if(!(
          (control_keys.up.includes(snake.getDirection()) && control_keys.down.includes(key)) ||
          (control_keys.down.includes(snake.getDirection()) && control_keys.up.includes(key)) ||
          (control_keys.left.includes(snake.getDirection()) && control_keys.right.includes(key)) ||
          (control_keys.right.includes(snake.getDirection()) && control_keys.left.includes(key))
        )) {
          snake.setDirection(key);
          key = '';
        }
      }
      if(snake.move()) {
        state = 'gameover';
        stateMusicChange();
      } else if(snake.checkEatApple(apple.get())) {
        incScore();
        apple.set(snake.getBody());
      }
    } else if(state=='gameover') {
      gameover();
    }
  }

  const keySetter = code => {
    key = code;
  }

  const keyListener = (setter, event) => {
    setter(event.code);
  }

  const loop = () => {
    timestamp = Date.now();
    if(timestamp < last_frame_time + 1000 * speed) {
      requestAnimationFrame(loop);
      return;
    }
    update();
    last_frame_time = timestamp;
    requestAnimationFrame(loop);
  }

  const gameoverEnded = () => {
    if(gameover_state) {
      toggleArrayCell(gameover_text, css_classes.gameover);
    }
    snake.restart();
    apple.set(snake.getBody());
    score = 0;
    state = 'game';
    stateMusicChange();
  }

  const stateMusicChange = () => {
    for(state_music in music) {
      if(state_music==state) {
        music[state_music].play();
      } else {
        music[state_music].pause();
      }
    }
  }

  const incScore = () => {
    score++;
    document.getElementById(css_classes.score).innerHTML=score;
    if(score > highscore) {
      highscore = score;
      document.getElementById(css_classes.highscore).innerHTML=highscore;
      localStorage.setItem('snake_highscore', highscore);
    }
    snake.grow();
  }

  const gameover = () => {
    toggleArrayCell(gameover_text, css_classes.gameover);
    gameover_state = (gameover_state + 1) % 2;
  }

  const init = () => {
    highscore = Number(localStorage.getItem('snake_highscore'));
    document.getElementById(css_classes.highscore).innerHTML=highscore;
    createBoard();
    snake = Snake(initial_length, n, m);
    apple = Apple(n, m);
    apple.set(snake.getBody());
    music.game.play();
    music.game.loop = true;
    music.pause.loop = true;
    document.addEventListener('keydown', (event) => {keyListener(keySetter, event)});
    music.gameover.addEventListener('ended', gameoverEnded);
    loop();
  }

  init();
}
