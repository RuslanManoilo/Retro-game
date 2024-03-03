class t{draw(t){t.fillRect(this.x,this.y,this.width,this.height)}update(){this.game.keys.indexOf("ArrowLeft")>-1&&(this.x-=this.speed),this.game.keys.indexOf("ArrowRight")>-1&&(this.x+=this.speed),this.x<.5*-this.width?this.x=.5*-this.width:this.x>this.game.width-.5*this.width&&(this.x=this.game.width-.5*this.width)}shoot(){const t=this.game.getProjectile();t&&t.start(this.x+.5*this.width,this.y)}restart(){this.x=.5*this.game.width-.5*this.width,this.y=this.game.height-this.height,this.lives=3}constructor(t){this.game=t,this.width=100,this.height=100,this.x=.5*this.game.width-.5*this.width,this.y=this.game.height-this.height,this.speed=5,this.lives=3}}class e{draw(t){this.free||t.fillRect(this.x,this.y,this.width,this.height)}update(){this.free||(this.y-=this.speed),this.y<-this.height&&this.reset()}start(t,e){this.x=t-.5*this.width,this.y=e,this.free=!1}reset(){this.free=!0}constructor(){this.width=30,this.height=20,this.x=0,this.y=0,this.speed=20,this.free=!0}}class i extends class{draw(t){t.drawImage(this.image,this.frameX*this.width,this.frameY*this.height,this.width,this.height,this.x,this.y,this.width,this.height)}update(t,e){this.x=t+this.positionX,this.y=e+this.positionY,this.game.projectilesPool.forEach((t=>{!t.free&&this.game.checkCollision(this,t)&&(this.hit(1),t.reset())})),this.lives<1&&(this.frameX++,this.frameX>this.maxFrame&&(this.markedForDeletion=!0,this.game.gameOver||(this.game.score+=this.maxLives))),this.game.checkCollision(this,this.game.player)&&(this.markedForDeletion=!0,!this.game.gameOver&&this.game.score>0&&this.game.score--,this.game.player.lives--,this.game.player.lives<1&&(this.game.gameOver=!0)),this.y+this.height>this.game.height&&(this.game.gameOver=!0,this.markedForDeletion=!0)}hit(t){this.lives-=t}constructor(t,e,i){this.game=t,this.width=this.game.enemySize,this.height=this.game.enemySize,this.x=0,this.y=0,this.positionX=e,this.positionY=i,this.markedForDeletion=!1}}{constructor(t,e,i){super(t,e,i),this.image=document.getElementById("beetlemorph"),this.frameX=0,this.maxFrame=2,this.frameY=Math.floor(4*Math.random()),this.lives=1,this.maxLives=this.lives}}class s{render(t){this.y<0&&(this.y+=5),this.speedY=0,(this.x<0||this.x>this.game.width-this.width)&&(this.speedX*=-1,this.speedY=this.game.enemySize),this.x+=this.speedX,this.y+=this.speedY,this.enemies.forEach((e=>{e.update(this.x,this.y),e.draw(t)})),this.enemies=this.enemies.filter((t=>!t.markedForDeletion))}create(){for(let t=0;t<this.game.rows;t++)for(let e=0;e<this.game.columns;e++){let s=e*this.game.enemySize,h=t*this.game.enemySize;this.enemies.push(new i(this.game,s,h))}}constructor(t){this.game=t,this.width=this.game.columns*this.game.enemySize,this.height=this.game.rows*this.game.enemySize,this.x=.5*this.game.width-.5*this.width,this.y=-this.height,this.speedX=Math.random()<.5?-3:3,this.speedY=0,this.enemies=[],this.nextWaveTrigger=!1,this.create()}}class h{render(t){this.drawStatusText(t),this.player.draw(t),this.player.update(),this.projectilesPool.forEach((e=>{e.update(),e.draw(t)})),this.waves.forEach((e=>{e.render(t),e.enemies.length<1&&!e.nextWaveTrigger&&!this.gameOver&&(this.newWave(),this.waveCount++,e.nextWaveTrigger=!0,this.player.lives++)}))}createProjectiles(){for(let t=0;t<this.numberOfProjectiles;t++)this.projectilesPool.push(new e)}getProjectile(){for(let t=0;t<this.projectilesPool.length;t++)if(this.projectilesPool[t].free)return this.projectilesPool[t]}checkCollision(t,e){return t.x<e.x+e.width&&t.x+t.width>e.x&&t.y<e.y+e.height&&t.y+t.height>e.y}drawStatusText(t){t.save(),t.shadowOffsetX=2,t.shadowOffsetY=2,t.shadowColor="violet",t.fillText("Score: "+this.score,20,40),t.fillText("Wave: "+this.waveCount,20,80);for(let e=0;e<this.player.lives;e++)t.fillRect(20+10*e,100,5,20);this.gameOver&&(t.textAlign="center",t.font="100px Impact",t.fillText("GAME OVER",.5*this.width,.5*this.height),t.font="20px Impact",t.fillText("Press R to restart!",.5*this.width,.5*this.height+30)),t.restore()}newWave(){Math.random()<.5&&this.columns*this.enemySize<.8*this.width?this.columns++:this.rows*this.enemySize<.6*this.width&&this.rows++,this.waves.push(new s(this))}restart(){this.player.restart(),this.columns=2,this.rows=2,this.waves=[],this.waves.push(new s(this)),this.waveCount=1,this.score=0,this.gameOver=!1}constructor(e){this.canvas=e,this.width=this.canvas.width,this.height=this.canvas.height,this.keys=[],this.player=new t(this),this.projectilesPool=[],this.numberOfProjectiles=10,this.createProjectiles(),this.fired=!1,this.columns=2,this.rows=2,this.enemySize=80,this.waves=[],this.waves.push(new s(this)),this.waveCount=1,this.score=0,this.gameOver=!1,window.addEventListener("keydown",(t=>{"1"!==t.key||this.fired||this.player.shoot(),this.fired=!0,-1===this.keys.indexOf(t.key)&&this.keys.push(t.key),"r"===t.key&&this.gameOver&&this.restart()})),window.addEventListener("keyup",(t=>{this.fired=!1;const e=this.keys.indexOf(t.key);e>-1&&this.keys.splice(e,1)}))}}window.addEventListener("load",(function(){const t=document.getElementById("canvas1"),e=t.getContext("2d");t.width=600,t.height=800,e.fillStyle="white",e.strokeStyle="white",e.lineWidth=5,e.font="30px impact";const i=new h(t);!function s(){e.clearRect(0,0,t.width,t.height),i.render(e),requestAnimationFrame(s)}()}));
//# sourceMappingURL=index.720c393e.js.map