import { Player } from './player';
import { Projectile } from './projectile';
import { Wave } from './wave';

export class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.keys = [];
    this.player = new Player(this);

    this.projectilesPool = [];
    this.numberOfProjectiles = 10;
    this.createProjectiles();

    this.columns = 2;
    this.rows = 2;
    this.enemySize = 60;

    this.waves = [];
    this.waves.push(new Wave(this));
    this.waveCount = 1;

    this.score = 0;
    this.gameOver = false;

    //Event listener
    window.addEventListener('keydown', evt => {
      if (this.keys.indexOf(evt.key) === -1) this.keys.push(evt.key);
      if (evt.key === '1') this.player.shoot();
    });

    window.addEventListener('keyup', evt => {
      const idx = this.keys.indexOf(evt.key);
      if (idx > -1) this.keys.splice(idx, 1);
    });
  }

  render(context) {
    this.drawStatusText(context);
    this.player.draw(context);
    this.player.update();
    this.projectilesPool.forEach(projectile => {
      projectile.update();
      projectile.draw(context);
    });

    this.waves.forEach(wave => {
      wave.render(context);

      if (wave.enemies.length < 1 && !wave.nextWaveTrigger && !this.gameOver) {
        this.newWave();
        this.waveCount++;
        wave.nextWaveTrigger = true;
        this.player.lives++;
      }
    });
  }

  // створення здарядів
  createProjectiles() {
    for (let i = 0; i < this.numberOfProjectiles; i++) {
      this.projectilesPool.push(new Projectile());
    }
  }

  getProjectile() {
    for (let i = 0; i < this.projectilesPool.length; i++) {
      if (this.projectilesPool[i].free) {
        return this.projectilesPool[i];
      }
    }
  }

  // collision detection between 2 rectangles
  checkCollision(a, b) {
    return (
      a.x < b.x + b.width &&
      a.x + a.width > b.x &&
      a.y < b.y + b.height &&
      a.y + a.height > b.y
    );
  }

  drawStatusText(context) {
    context.save();

    // text-shadow
    context.shadowOffsetX = 2;
    context.shadowOffsetY = 2;
    context.shadowColor = 'violet';

    // game-indicators
    context.fillText('Score: ' + this.score, 20, 40);
    context.fillText('Wave: ' + this.waveCount, 20, 80);
    for (let i = 0; i < this.player.lives; i++) {
      context.fillRect(20 + 10 * i, 100, 5, 20);
    }

    if (this.gameOver) {
      context.textAlign = 'center';

      context.font = '100px Impact';
      context.fillText('GAME OVER', this.width * 0.5, this.height * 0.5);

      context.font = '20px Impact';
      context.fillText(
        'Press R to restart!',
        this.width * 0.5,
        this.height * 0.5 + 30
      );
    }

    context.restore();
  }

  newWave() {
    if (
      Math.random() < 0.5 &&
      this.columns * this.enemySize < this.width * 0.8
    ) {
      this.columns++;
    } else if (this.rows * this.enemySize < this.width * 0.6) {
      this.rows++;
    }

    this.waves.push(new Wave(this));
  }
}
