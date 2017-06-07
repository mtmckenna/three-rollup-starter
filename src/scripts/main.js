import '../styles/main.css';

draw();
configureLiveReload();

function draw() {
  let canvas = document.getElementById('game');
  if (!canvas.getContext) { return; }

  let ctx = canvas.getContext('2d');

  ctx.fillStyle = 'rgb(200, 0, 0)';
  ctx.fillRect(10, 10, 50, 50);

  ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
  ctx.fillRect(30, 30, 50, 50);
}

function configureLiveReload() {
  if (ENV !== 'production') {
    console.log('Starting LiveReload...');
    document.write(
      '<script src="http://' + (location.host || 'localhost').split(':')[0] +
      ':35729/livereload.js?snipver=1"></' + 'script>'
    );
  }
}
