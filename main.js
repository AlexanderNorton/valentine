// For my lovely girlfriend, Belen..
// I spent many hours writing up this code
// Even though you rage quit this game after 15 mins
// I still love you <3
// 14/02/2025

const IntroScene = {
  key: 'IntroScene',

  preload: function () {
    this.load.video('intro', 'assets/videos/intro_2.mp4', 'loadeddata', false, false);
    this.load.video('outro', 'assets/videos/outro_2.mp4', 'loadeddata', false, false);
  },

  create: function () {
    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;

    this.add.text(centerX, centerY, 'Click Here to Start <3', {
      font: '40px Arial',
      fill: '#ffffff'
    }).setOrigin(0.5);

    this.input.once('pointerdown', () => {
      if (this.sound.context.state === 'suspended') {
        this.sound.context.resume();
      }

      introVideo = this.add.video(centerX, centerY, 'intro');

      introVideo.setOrigin(0.5);

      introVideo.play(false);
      introVideo.setPaused(false);
      introVideo.setMute(false);
      introVideo.setVolume(1);
    });

    this.input.keyboard.once('keydown-SPACE', () => {
      if (this.sound.context.state === 'suspended') {
        this.sound.context.resume();
      }

      introVideo.stop();
      this.scene.start('StartScene');
    });
  }
};

const StartScene = {
  key: 'StartScene',

  preload: function () {
  },

  create: function () {
    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;

    this.add.text(centerX, centerY - 400, 'HOW TO PLAY', {
      font: '80px Arial',
      fill: '#ffffff'
    }).setOrigin(0.5);

    this.add.text(centerX, centerY - 200, 'Use ARROWS to move', {
      font: '40px Arial',
      fill: '#ffffff'
    }).setOrigin(0.5);

    this.add.text(centerX, centerY - 100, 'Use SPACE to pick up memories', {
      font: '40px Arial',
      fill: '#ffffff'
    }).setOrigin(0.5);

    this.add.text(centerX, centerY, 'Collect all the memories before time runs out.', {
      font: '40px Arial',
      fill: '#ffffff'
    }).setOrigin(0.5);

    this.add.text(centerX, centerY + 100, 'Save Alex from the Gremlins!', {
      font: '40px Arial',
      fill: '#ffffff'
    }).setOrigin(0.5);

    this.add.text(centerX, centerY + 400, 'Press SPACE to Start', {
      font: '40px Arial',
      fill: '#ffffff'
    }).setOrigin(0.5);

    spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  },

  update: function () {
    if (Phaser.Input.Keyboard.JustDown(spaceKey)) {
      this.scene.start('MainScene');
    }
  }
};

let introVideo;
let currentRoomIndex = 0;
let character;
let interactButton;
let popupShown = false;
let popupElement;
let roomSound;
let bgMusic;
let cursors;
let spaceKey;

// Countdown-related variables
let timerText;
let countdown = (5 * 60);
let shouldCountdown = true;

// Popup text box variables
let popupTextBackground;
let popupText;

// For walking animation/sound
let walkingGif;
let footstepsSound; 

const MainScene = {
  key: 'MainScene',
  preload: preload,
  create: create,
  update: update
};

function preload() {
  // Background music
  this.load.audio('bgMusic', 'assets/music/the_journey.mp3');

  // Character image
  this.load.image('belen_cat', 'assets/cats/belen_cat_new.png');

  // Wall image
  this.load.image('wall', 'assets/objects/heartwall.png');

  // Enemy sprites
  this.load.image('enemy1', 'assets/characters/gremlin_1.png');
  this.load.image('enemy2', 'assets/characters/gremlin_2.png');

  // Objects
  this.load.image('cap', 'assets/objects/cap.png');
  this.load.image('flight', 'assets/objects/flight.png');
  this.load.image('rose', 'assets/objects/rose.png');
  this.load.image('beach', 'assets/objects/beach.png');
  this.load.image('camera', 'assets/objects/camera.png');
  this.load.image('icecream', 'assets/objects/icecream.png');
  this.load.image('shopping', 'assets/objects/shopping.png');
  this.load.image('valentine', 'assets/objects/valentine.png');
  this.load.image('sunglasses', 'assets/objects/sunglasses.png');
  this.load.image('blackheart', 'assets/objects/blackheart.png');
  this.load.image('balloon', 'assets/objects/balloon.png');
  this.load.image('burger', 'assets/objects/burger.png');
  this.load.image('christmas', 'assets/objects/christmas.png');
  this.load.image('ear', 'assets/objects/ear.png');
  this.load.image('fish', 'assets/objects/fish.png');
  this.load.image('mirror', 'assets/objects/mirror.png');
  this.load.image('segrada', 'assets/objects/segrada.png');
  this.load.image('sun', 'assets/objects/sun.png');
  this.load.image('violin', 'assets/objects/violin.png');
  this.load.image('whiskey', 'assets/objects/whiskey.png');
  this.load.image('i20', 'assets/objects/i20.png');

  // Sounds
  this.load.audio('room1Sound', 'assets/sounds/oeea.mp3');
  this.load.audio('room2Sound', 'assets/sounds/chipi.mp3');
  this.load.audio('room3Sound', 'assets/sounds/drums.mp3');
  this.load.audio('room4Sound', 'assets/sounds/tiktok.mp3');
  this.load.audio('room5Sound', 'assets/sounds/back.mp3');
  this.load.audio('room6Sound', 'assets/sounds/bruh.mp3');
  this.load.audio('room7Sound', 'assets/sounds/cash.mp3');
  this.load.audio('room8Sound', 'assets/sounds/cena.mp3');
  this.load.audio('room9Sound', 'assets/sounds/epic.mp3');
  this.load.audio('room10Sound', 'assets/sounds/fine.mp3');
  this.load.audio('room11Sound', 'assets/sounds/good.mp3');
  this.load.audio('room12Sound', 'assets/sounds/holy.mp3');
  this.load.audio('room13Sound', 'assets/sounds/suspense.mp3');
  this.load.audio('room14Sound', 'assets/sounds/tiktok.mp3');
  this.load.audio('room15Sound', 'assets/sounds/oeea.mp3');
  this.load.audio('room16Sound', 'assets/sounds/chipi.mp3');
  this.load.audio('room17Sound', 'assets/sounds/oeea.mp3');
  this.load.audio('room18Sound', 'assets/sounds/chipi.mp3');
  this.load.audio('room19Sound', 'assets/sounds/holy.mp3');
  this.load.audio('room20Sound', 'assets/sounds/oeea.mp3');
  this.load.audio('room21Sound', 'assets/sounds/kids.mp3');

  // Footsteps Audio
  this.load.audio('footsteps', 'assets/sounds/footsteps.mp3');
}

function create() {
  // Loop background music
  bgMusic = this.sound.add('bgMusic', { loop: false });
  bgMusic.play();

  // Keyboard input
  cursors = this.input.keyboard.createCursorKeys();
  spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

  character = this.physics.add.sprite(0, 0, 'belen_cat').setScale(0.2);
  character.setCollideWorldBounds(true);
  character.setOrigin(0.5, 0.5);

  // Create the interactable button
  interactButton = this.physics.add.sprite(0, 0, '').setScale(0.1);
  interactButton.setInteractive();

  popupElement = this.add.dom(
    this.game.config.width / 2,
    this.game.config.height / 2,
    'img'
  );
  popupElement.setOrigin(0);
  popupElement.node.style.display = 'none';
  popupElement.node.style.maxWidth = '400px';
  popupElement.node.style.maxHeight = '400px';

  popupTextBackground = this.add.rectangle(
    0,
    0,
    this.game.config.width,
    50,
    0x000000,
    0.7
  );
  popupTextBackground.setOrigin(0, 0);
  popupTextBackground.setDepth(9999);
  popupTextBackground.setVisible(false);

  popupText = this.add.text(10, 10, '', {
    font: '24px Arial',
    fill: '#ffffff'
  });
  popupText.setDepth(10000);
  popupText.setVisible(false);

  this.walls = this.physics.add.staticGroup();

  this.enemies = this.physics.add.group();

  this.physics.add.overlap(character, this.enemies, handleGameOver, null, this);

  this.physics.add.collider(character, this.walls);

  // Go to the initial room
  switchRoom(this, 20);

  timerText = this.add.text(10, 940, formatTime(countdown), {
    font: '52px Arial',
    fill: '#000000',
  });
  timerText.setDepth(10001);

  this.time.addEvent({
    delay: 1000,
    callback: updateCountdown,
    callbackScope: this,
    loop: true
  });

  // CREATE WALKING GIF + FOOTSTEPS
  footstepsSound = this.sound.add('footsteps', { loop: true });

  walkingGif = this.add.dom(character.x, character.y, 'img');
  walkingGif.node.src = 'assets/cats/bouncy.gif';
  walkingGif.setOrigin(-50, -50);
  walkingGif.node.style.display = 'none';
  walkingGif.node.style.width = character.displayWidth + 'px';
  walkingGif.node.style.height = character.displayHeight + 'px';
}

function update() {
  // Player movement
  if (cursors.left.isDown) {
    character.setVelocityX(-350);
  } else if (cursors.right.isDown) {
    character.setVelocityX(350);
  } else {
    character.setVelocityX(0);
  }

  if (cursors.up.isDown) {
    character.setVelocityY(-350);
  } else if (cursors.down.isDown) {
    character.setVelocityY(350);
  } else {
    character.setVelocityY(0);
  }

  const vx = character.body.velocity.x;
  const vy = character.body.velocity.y;
  const isMoving = (vx !== 0 || vy !== 0);

  if (isMoving) {
    character.alpha = 0;
    walkingGif.alpha = 1;
    walkingGif.setPosition(character.x - 35, character.y - 35);

    if (!footstepsSound.isPlaying) {
      footstepsSound.play();
    }
  } else {
    character.alpha = 1;
    walkingGif.alpha = 0;
    if (footstepsSound.isPlaying) {
      footstepsSound.stop();
    }
  }

  // Press SPACE for showing/hiding popup (if close enough to button)
  if (Phaser.Input.Keyboard.JustDown(spaceKey)) {
    if (!popupShown) {
      const distance = Phaser.Math.Distance.Between(
        character.x, character.y,
        interactButton.x, interactButton.y
      );
      if (distance < 100) {
        showPopup(this);
      }
    }
  }

  // Enemies chase the player
  this.enemies.children.iterate((enemy) => {
    if (enemy && enemy.active) {
      this.physics.moveToObject(enemy, character, 80);
    }
  });
}

function switchRoom(scene, index) {
  currentRoomIndex = index;
  const room = rooms[currentRoomIndex];

  scene.cameras.main.setBackgroundColor(room.background);

  // Reposition character
  character.x = room.characterStart.x;
  character.y = room.characterStart.y;

  // Update button texture & position
  interactButton.setTexture(room.buttonImage);
  interactButton.x = room.buttonPosition.x;
  interactButton.y = room.buttonPosition.y;
  interactButton.setScale(room.objectSize);

  // Hide any open popup
  hidePopup(scene);

  // Stop previous room sound
  if (roomSound) {
    roomSound.stop();
  }

  // Clear old walls
  scene.walls.clear(true, true);

  // Create new walls for this room
  if (room.walls && room.walls.length) {
    room.walls.forEach((wallData) => {
      const wallSprite = scene.walls.create(wallData.x, wallData.y, wallData.texture);
      if (wallData.width && wallData.height) {
        wallSprite.setDisplaySize(wallData.width, wallData.height);
        wallSprite.refreshBody();
      }
    });
  }

  // Clear old enemies
  scene.enemies.clear(true, true);

  // Spawn new enemies
  const enemyCount = room.numEnemies || 0;
  for (let i = 0; i < enemyCount; i++) {
    let x, y;
    const edge = Phaser.Math.Between(0, 3);
    switch (edge) {
      case 0:
        x = Phaser.Math.Between(-100, -50);
        y = Phaser.Math.Between(0, 1000);
        break;
      case 1:
        x = Phaser.Math.Between(1050, 1100);
        y = Phaser.Math.Between(0, 1000);
        break;
      case 2:
        x = Phaser.Math.Between(0, 1000);
        y = Phaser.Math.Between(-100, -50);
        break;
      case 3:
        x = Phaser.Math.Between(0, 1000);
        y = Phaser.Math.Between(1050, 1100);
        break;
    }
    const possibleEnemies = ['enemy1', 'enemy2'];
    const randomKey = Phaser.Utils.Array.GetRandom(possibleEnemies);
    const enemy = scene.enemies.create(x, y, randomKey);
    enemy.setScale(0.2);
    enemy.setCollideWorldBounds(true);
  }
}

function showPopup(scene) {
  popupShown = true;
  const room = rooms[currentRoomIndex];

  shouldCountdown = true;

  scene.physics.world.pause();

  popupElement.setPosition(scene.game.config.width / 2, scene.game.config.height / 2);
  popupElement.node.style.display = 'block';
  popupElement.node.src = room.popupImage + '?t=' + Date.now();

  popupText.setText(room.popupText || '');
  popupText.setVisible(true);
  popupTextBackground.setVisible(true);

  // Play the room's sound
  roomSound = scene.sound.add(room.sound, { volume: 0.8 });
  roomSound.play();

  // Auto-advance after 5s
  setTimeout(() => {
    goToNextRoom(scene);
  }, 5000);
}

function hidePopup(scene) {
  popupShown = false;
  shouldCountdown = true;

  popupElement.node.style.display = 'none';
  popupElement.node.src = '';

  popupText.setVisible(false);
  popupTextBackground.setVisible(false);

  scene.physics.world.resume();

  bgMusic.resume();
}

function goToNextRoom(scene) {
  if (currentRoomIndex === rooms.length - 1) {
    playOutro(scene);
    return;
  }

  const nextIndex = (currentRoomIndex + 1) % rooms.length;
  switchRoom(scene, nextIndex);
}

function handleGameOver(player, enemy) {
  switchRoom(this, currentRoomIndex);
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  let partInSeconds = seconds % 60;
  partInSeconds = partInSeconds.toString().padStart(2, '0');
  return `${minutes}:${partInSeconds}`;
}

function updateCountdown() {
  if (shouldCountdown) {
    countdown--;
  }
  timerText.setText(formatTime(countdown));

  // Turn red at halfway point
  if (countdown === Math.floor(((4 * 60) + 8) / 2)) {
    timerText.setStyle({ fill: '#ff0000' });
  }

  if (countdown <= 0) {
    countdown = 0;
    handleTimeUp.call(this);
  }
}

function playOutro(scene) {
  bgMusic.stop();

  popupShown = false;
  shouldCountdown = false;

  popupElement.node.style.display = 'none';
  popupElement.node.src = '';

  popupText.setVisible(false);
  popupTextBackground.setVisible(false);

  if (roomSound) {
    roomSound.stop();
  }

  popupTextBackground.setVisible(false);

  const centerX = scene.cameras.main.width / 2;
  const centerY = scene.cameras.main.height / 2;

  const outroVideo = scene.add.video(centerX, centerY, 'outro');
  outroVideo.setOrigin(0.5);

  outroVideo.play(false);
  outroVideo.setPaused(false);
  outroVideo.setMute(false);
  outroVideo.setVolume(1);
}

function handleTimeUp() {
  this.scene.restart();
}

const config = {
  type: Phaser.AUTO,
  width: 1000,
  height: 1000,
  parent: 'game-container',
  backgroundColor: '#fc60b9',
  dom: {
    createContainer: true
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  },
  scene: [IntroScene, StartScene, MainScene]
};

const game = new Phaser.Game(config);
