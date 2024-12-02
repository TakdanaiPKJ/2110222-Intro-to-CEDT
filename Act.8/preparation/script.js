const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create
    }
};

let game = new Phaser.Game(config);

function preload() {
    // Loading images and other assets in this function
    this.load.image('sky', '../emoji_like.png');
}

function create() {
    // Setting up the game world in this function
    this.add.image(400, 300, 'sky');
    this.add.text(200, 150, 'Takdanai Promkhajorn', { fontSize: '32px', fill: '#fff' , stroke : '#000' ,strokeThickness : '3'});
}

function update() {
    // Code to run on every frame of the game
    // Nothing to run in this example
}
