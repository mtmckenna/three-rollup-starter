import '../css/main.css';
import Game from './game.js';

const canvas = document.getElementById('game');
const game = new Game(canvas);

game.configure();
game.start();

function configureLiveReload() {
  if (ENV !== 'production') {
    console.log('Starting LiveReload...');
    document.write(
      '<script src="http://' + (location.host || 'localhost').split(':')[0] +
      ':35729/livereload.js?snipver=1"></' + 'script>'
    );
  }
}

configureLiveReload();
