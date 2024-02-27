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

    this.columns = 5;
    this.rows = 3;
    this.enemySize = 60;

    this.waves = [];
    this.waves.push(new Wave(this));

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
    this.player.draw(context);
    this.player.update();
    this.projectilesPool.forEach(projectile => {
      projectile.update();
      projectile.draw(context);
    });

    this.waves.forEach(wave => {
      wave.render(context);
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
}
