// Define MainScene first
class MainScene extends Phaser.Scene {
  constructor() {
    super('MainScene');
    this.currentRoom = 0;
    this.popupOpen = false;
  }

  preload() {
    // Load your assets (ensure these paths point to your files in the repository)
    this.load.image('character', 'assets/character.png');
    this.load.image('button', 'assets/button.png');
    this.load.image('popup1', 'assets/popup1.png');
    this.load.image('popup2', 'assets/popup2.png');
    this.load.audio('sound1', 'assets/sound1.mp3');
    this.load.audio('sound2', 'assets/sound2.mp3');
  }

  create() {
    // Configuration for each room
    this.roomConfigs = [
      { popupImage: 'popup1', popupSound: 'sound1' },
      { popupImage: 'popup2', popupSound: 'sound2' }
    ];

    // Display room number in the top-left corner
    this.roomText = this.add.text(10, 10, 'Room: ' + (this.currentRoom + 1), { fontSize: '20px', fill: '#ffffff' });

    // Set a background color for the scene
    this.cameras.main.setBackgroundColor('#2d2d2d');

    // Create the character sprite and enable physics
    this.character = this.physics.add.sprite(400, 300, 'character');
    this.character.setCollideWorldBounds(true);

    // Create the interactive button as a static physics sprite.
    this.button = this.physics.add.staticSprite(700, 300, 'button');

    // Create the popup image but keep it invisible until triggered.
    this.popup = this.add.image(400, 300, this.roomConfigs[this.currentRoom].popupImage);
    this.popup.setVisible(false);

    // Prepare the sound for the current room (will be recreated on each popup)
    this.popupSound = this.sound.add(this.roomConfigs[this.currentRoom].popupSound);

    // Setup keyboard input for arrow keys and spacebar.
    this.cursors = this.input.keyboard.createCursorKeys();
    this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  }

  update() {
    if (this.popupOpen) {
      if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
        this.popup.setVisible(false);
        this.popupOpen = false;
      }
      return;
    }

    const speed = 200;
    this.character.setVelocity(0);
    if (this.cursors.left.isDown) {
      this.character.setVelocityX(-speed);
    } else if (this.cursors.right.isDown) {
      this.character.setVelocityX(speed);
    }
    if (this.cursors.up.isDown) {
      this.character.setVelocityY(-speed);
    } else if (this.cursors.down.isDown) {
      this.character.setVelocityY(speed);
    }

    if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
      const distance = Phaser.Math.Distance.Between(this.character.x, this.character.y, this.button.x, this.button.y);
      if (distance < 50) {
        this.openPopup();
      }
    }

    if (this.character.x < 0) {
      this.changeRoom(-1);
      this.character.x = 800 - 10;
    } else if (this.character.x > 800) {
      this.changeRoom(1);
      this.character.x = 10;
    }
  }

  openPopup() {
    this.popup.setTexture(this.roomConfigs[this.currentRoom].popupImage);
    this.popup.setVisible(true);

    if (this.popupSound && this.popupSound.isPlaying) {
      this.popupSound.stop();
    }
    this.popupSound = this.sound.add(this.roomConfigs[this.currentRoom].popupSound);
    this.popupSound.play();

    this.popupOpen = true;
  }

  changeRoom(direction) {
    let newRoom = this.currentRoom + direction;
    if (newRoom < 0 || newRoom >= this.roomConfigs.length) {
      newRoom = (newRoom + this.roomConfigs.length) % this.roomConfigs.length;
    }
    this.currentRoom = newRoom;
    this.roomText.setText('Room: ' + (this.currentRoom + 1));
  }
}

// Now that MainScene is defined, create the game configuration
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: { default: 'arcade', arcade: { debug: false } },
  scene: MainScene
};

const game = new Phaser.Game(config);
