const control_keys = {
  up: ['KeyW', 'ArrowUp'],
  down: ['KeyS', 'ArrowDown'],
  left: ['KeyA', 'ArrowLeft'],
  right: ['KeyD', 'ArrowRight'],
  pause: ['Space', 'KeyP'],
 },
 css_classes = {
  head: 'head',
  body: 'body',
  apple: 'apple',
  bush: 'bush',
  block: 'block',
  gameover: 'gameover',
  score: 'score',
  highscore: 'highscore',
  game: 'game',
  table: 'table'
 },
 move_keys = [...control_keys.up, ...control_keys.down, ...control_keys.right, ...control_keys.left];
 body_images = [
   'img/body1.gif',
   'img/body2.jpg',
   'img/body3.jpg',
   'img/body4.jpg',
   'img/body5.jpg',
   'img/body6.gif',
   'img/body7.png',
   'img/body8.jpg',
   'img/body9.jpg',
   'img/body10.jpg',
   'img/body11.jpg',
 ]
window.onload = Game();
