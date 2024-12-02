class RoomUtil {
  static baseURL = "x";
  static roomApiURL = `${RoomUtil.baseURL}roomapi/`;
  static ROOMSIZE = { w: 800, h: 600 };
  static isReady = false;

  // It might be useful for the "players" object to be used for storing all the players in the room. The key could be the player's number and the value could be the Player object.
  static players = {};

  static getSecret() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("secret") || null;
  }
  static getPlayerNumber() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("player") || null;
  }

  static getInitAndStartGames(scene, myPlayer) {
    // Fetch the initial player look data from the server
    fetch(`${RoomUtil.roomApiURL}getplayerlook.php`, {
      method: "GET",
      headers: {
        "X-Secret": RoomUtil.getSecret(),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Let RoomUtil.initAllPlayers() handle the initialization of the players based on data.
        RoomUtil.initAllPlayers(scene, data, myPlayer);
        RoomUtil.isReady = true;
        // For Part 3:
        RoomUtil.fetchAllPlayersXY(scene, true);
        // Once we have the Player objects, we can start fetching the player position data from the server
        // RoomUtil.fetchAllPlayersXY(scene,true);
      })
      .catch((error) =>
        console.error("Error fetching player look data:", error)
      );
  }

  static initAllPlayers(scene, data, myPlayer) {
    // - iterate through the data,
    // - instantiate the Player objects,
    // - and keep the references to all of the Playes objects in RoomUtil.players
    Object.keys(data).forEach((key) => {
      const playerData = data[key];
      let player = RoomUtil.players[key];
      if (!player) {
        if (key === myPlayer.playerNumber) {
          player = myPlayer;
        } else {
          player = new Player(key);
        }

        player.initLookAndVisual(scene, playerData);
        player.setPosition(player.posX, player.posY);
        // **

        RoomUtil.players[key] = player;

        // If player doesn't exist, **create a new Player object**
        // Also, for each Player object, you should **create the Phaser graphics object, add it to the scene, and keep the reference to the graphics object in the "visual" attribute of the object**.
        // The method initLookAndVisual() that has been partially created in the Player class should be useful.
        // Finally, **add the player to the RoomUtil.players**.
        // E.g.: RoomUtil.players[key] = player;
      }
    });
  }

  static fetchAllPlayersXY(scene, init = false) {
    // You do not have to complete this method until Part 3.
    // Learn from the fetch statement in getInitAndStartGames()
    // and implement a similar fetch statement to fetch the player position/target data from the server.
    // E.g.: fetch(`${RoomUtil.roomApiURL}getplayerxy.php`, ...
    // Once the position/target data is fetched, you can simply update the position/target data in each Player objects.
    fetch(`${RoomUtil.roomApiURL}getplayerxy.php`, {
      method: "GET",
      headers: {
        "X-Secret": RoomUtil.getSecret(),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        Object.keys(data).forEach((key) => {
          const playerData = data[key];
          let player = RoomUtil.players[key];

          if (player) {
            player.setPosition(playerData.pos_x, playerData.pos_y);
            player.setTarget(playerData.target_x, playerData.target_y);
          }
        });

        if (init) {
          Object.values(RoomUtil.players).forEach((player) => {
            player.updatePlayerInRoom();
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching player XY data:", error);
      });
  }
}

class Player {
  // Represents a player in the game
  constructor(playerNumber) {
    this.playerNumber = playerNumber;
    this.look = null; // The look of the player. This is an object with shape and color properties
    this.visual = null; // The Phaser visual representation (graphics object) of the player
    this.posX = Math.random()*800+1;
    this.posY = Math.random()*800+1;
    this.targetX = this.posX;
    this.targetY = this.posY;
    this.speed = 40;
  }

  // Convert color names to hex codes
  getHexFromColorName(colorName) {
    const colorMap = {
      purple: "0x800080",
      blue: "0x0000ff",
      red: "0xff0000",
      orange: "0xffa500",
      yellow: "0xffff00",
      green: "0x008000",
    };

    return colorMap[colorName.toLowerCase()] || 0x000000; // Default to black if color not found
  }

  initLookAndVisual(scene, look) {
    this.look = look;
    if ( this.look && (this.look.shape === "circle" || this.look.shape === "square")) {
      //console.log("a");
      // Create the visual representation based on the look
      if (this.look.shape === "circle") {
        this.visual = scene.add.circle(this.posX, this.posY, 10, this.getHexFromColorName(this.look.color))
        //console.log("A"); 
      } else if (this.look.shape === "square") {
        this.visual = scene.add.rectangle(this.posX, this.posY, 20,20, this.getHexFromColorName(this.look.color));
        //console.log("A");
      }

    } else {
      // The default look is a black circle.
      this.visual = scene.add.circle(this.posX, this.posY, 20, 0xff0000);
    }
  }

  setPosition(x, y) {
    this.posX = x;
    this.posY = y;
    // Might be a good idea to update the visual representation's position if it exists
    if (this.visual) {
      // this.visual.setPosition( ...
    }
  }

  setTarget(x, y) {
    this.targetX = x;
    this.targetY = y;
  }

  // Call this method every frame to smoothly update the player's position
  updatePlayerInRoom() {
    // Do something with the player's position
    // Update the visual representation's position if it exists
    if (this.visual) {
      const dx = this.targetX - this.posX;
      const dy = this.targetY - this.posY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > this.speed) {
        this.posX += (dx / distance) * this.speed;
        this.posY += (dy / distance) * this.speed;
      } else {
        this.posX = this.targetX;
        this.posY = this.targetY;
      }

      this.visual.setPosition(this.posX, this.posY);
    }
  }
}

class MyPlayer extends Player {
  // Represents the player controlled by the current user
  constructor(secret, playerNumber) {
    super(playerNumber);
    this.secret = secret;
  }
  setTarget(x, y) {
    super.setTarget(x, y);
    this.updateMyselfToServer();
  }
  updateMyselfToServer() {
    // Send the new position to the server
    const data = new URLSearchParams();
    data.append("pos_x", this.posX);
    data.append("pos_y", this.posY);
    data.append("target_x", this.targetX);
    data.append("target_y", this.targetY);
    fetch(`${RoomUtil.roomApiURL}update.php`, {
      method: "POST",
      headers: {
       "X-Secret": RoomUtil.getSecret(),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: data.toString(),
    }).then((res) => res.json)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err.json());
      });
  }
  
  initLookAndVisual(scene, look) {
    //console.log("A");
    this.visual = scene.add.circle(this.posX,this.posY,  10, 0xff0000, 1).setStrokeStyle(2, 0x000, 1);
    //this.visual = this.circle.setStrokeStyle(2, 0xff0000, 1);
    // Override the parent method so that your player has a thick black border.
  }
}

// Start the app logic
let game, myPlayer, lastFetchTime, fetchInterval;
let secret = RoomUtil.getSecret();
// 25119491;
let playerNumber = RoomUtil.getPlayerNumber();
//42;

if (!secret) {
  alert("No secret provided.");
} else if (!playerNumber) {
  alert("No player number provided.");
} else {
  let config = {
    type: Phaser.AUTO,
    width: RoomUtil.ROOMSIZE.w,
    height: RoomUtil.ROOMSIZE.h,
    parent: "gameContainer",
    scene: {
      preload: preload,
      create: create,
      update: update,
    },
  };
  game = new Phaser.Game(config);
  myPlayer = new MyPlayer(RoomUtil.getSecret(), RoomUtil.getPlayerNumber());
  lastFetchTime = 0;
  fetchInterval = 5000; // Fetch data every 5 seconds
}

function preload() {
  this.load.image("background", "assets/gridbg.png");
}

function create() {
  // Adding the background image
  this.add.image(
    RoomUtil.ROOMSIZE.w / 2,
    RoomUtil.ROOMSIZE.h / 2,
    "background"
  );

  this.lastFetchTime = 0; // Reset timer on scene creation

  this.input.on(
    "pointerdown",
    function (pointer) {
      // Set the target for the player to move to
      myPlayer.setTarget(pointer.x,pointer.y);
    },
    this
  );

  RoomUtil.getInitAndStartGames(this, myPlayer);
}

function update(time, delta) {
  if (RoomUtil.isReady) {
    Object.values(RoomUtil.players).forEach((player) => {
      //console.log(player);
      // Update each player for smooth movement
      player.updatePlayerInRoom();
    });

    // Check if it's time to fetch new data
    this.lastFetchTime += delta;
    if (this.lastFetchTime >= fetchInterval) {
      this.lastFetchTime = 0;
      // Fetch the current player data from the server
      RoomUtil.fetchAllPlayersXY(this);
    }
  }
}
