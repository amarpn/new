const introMusic = new Audio("./music/introSong.mp3");
const shootingSound = new Audio("./music/shoooting.mp3");
const killEnemySound = new Audio("./music/killEnemy.mp3");
const gameOverSound = new Audio("./music/gameOver.mp3");
const spaceSilenceSound = new Audio("./music/spaceSilence.mp3#t=00:00:08")
introMusic.play();



const canvas = document.createElement("canvas");
document.querySelector(".myGame").appendChild(canvas);
canvas.width = innerWidth;    //width of whole screen
canvas.height = innerHeight;   // height of whole screen
const context = canvas.getContext("2d");  

// 
    document.querySelector(".close").addEventListener("click", function () {
        document.querySelector(".container").style.display = "none";
        introMusic.play();
    });

    window.addEventListener("load", function () {
        setTimeout(
            function open(event) {
                document.querySelector(".container").style.display = "block";
            },
            300
        )
        
    }); 


const form = document.querySelector("form");
const scoreBoard = document.querySelector(".scoreBoard");
let playerScore = 0;
// Basic Functions

// Event Listener for Difficulty form
document.querySelector("input").addEventListener("click", (e) => {
    e.preventDefault();

    // Stoping Music
    introMusic.pause();

    // playing space sound
    spaceSilenceSound.play();

    // making form invisble
    form.style.display = "none";
    // making scoreBoard visble
    scoreBoard.style.display = "block";

    //  getting diffculty selected by user
    const userValue = document.getElementById("difficulty").value;

    if (userValue === "Easy") {
        setInterval(spawnEnemy, 2000);
        return (difficulty = 2.5);
    }
    if (userValue === "Medium") {
        setInterval(spawnEnemy, 1400);
        return (difficulty = 7);
    }
    if (userValue === "Hard") {
        setInterval(spawnEnemy, 1000);
        return (difficulty = 10);
    }
    if (userValue === "Insane") {
        setInterval(spawnEnemy, 700);
        return (difficulty = 12);
    }
});


// function to change background color randomly
function spaceImg() {
    var background=new Image();
    background.src='./asset/background.jpg'
    
    
    var className = document.getElementsByClassName("change"); // class name to random color
    var i;
    for (var i = 0; i < className.length; i++) {
        className[i].style.backgroundImage = "url('./assest/background.jpg')";
    }

   
}


/*----------UFO Player---------*/


// player position
playerPosition = {
    x: canvas.width / 2,
    y: canvas.height / 2,
};

// ufo class
var newImage = new Image();
newImage.src = './assest/ufo.png'

class ufo{
    constructor(x,y,newImage)
    {
        this.x = x;
        this.y = y;
        this.newImage=newImage
    }
    draw()
    {
        context.drawImage(this.newImage, this.x - this.newImage.width / 2, this.y - this.newImage.height / 2);
    }
    
}
const craft = new ufo(playerPosition.x, playerPosition.y,newImage);

/*----------UFO Weapon---------*/


var newWeapon = new Image();
newWeapon.src = './assest/bullet.png'
class Weapon {
    constructor(x, y, newWeapon, velocity) {
        this.x = x;
        this.y = y;craft
        this.newWeapon = newWeapon;
        // this.color = color;
        this.velocity = velocity;
    }

    draw() {
        
        context.drawImage(this.newWeapon, this.x - this.newWeapon.width / 2, this.y - this.newWeapon.height / 2);
    }

    update() {
        this.draw();
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }
}

const weapons = [];

// ----------Enemy---------------//
var newEnemy = new Image();
newEnemy.src = './assest/alien2.png'
class Enemy {
    constructor(x, y, newEnemy,velocity) {
        this.x = x;
        this.y = y;
        this.newEnemy = newEnemy
        this.velocity = velocity;
    }
    draw() {
        context.drawImage(this.newEnemy, this.x , this.y);
    }

    update() {
        this.draw();
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }

}
const enemies = [];

// ---------------SPAWN ENEMY--------------------


const spawnEnemy = () => {
    // generating random size for enemy
    const enemySize = Math.random() * (40 - 5) + 5;

    // random is Enemy Spawn position
    let random;

    // Making Enemy Location Random but only from outsize of screen
    if (Math.random() < 0.5) {
        // Making X equal to very left off of screen or very right off of screen and setting Y to any where vertically
        random = {
            x: Math.random() < 0.5 ? canvas.width + enemySize : 0 - enemySize,
            y: Math.random() * canvas.height,
        };
    } else {
        // Making Y equal to very up off of screen or very down off of screen and setting X to any where horizontally
        random = {
            x: Math.random() * canvas.width,
            y: Math.random() < 0.5 ? canvas.height + enemySize : 0 - enemySize,
        };
    }

    // Finding Angle between center (means Player Position) and enemy position
    const myAngle = Math.atan2(
        canvas.height / 2 - random.y,
        canvas.width / 2 - random.x
    );

    // Making velocity or speed of enemy by multipling chosen difficulty to radian
    const velocity = {
        x: Math.cos(myAngle) * difficulty,
        y: Math.sin(myAngle) * difficulty,
    };

    // Adding enemy to enemies array
    enemies.push(new Enemy(random.x, random.y, newEnemy , velocity));
};
// --------------------PARTICLE----------------------


// Creating Particle Class
const friction = 0.98;
class Particle {
    constructor(x, y, radius, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
        this.aplha = 1;
    }

    draw() {
        context.save();
        context.globalAlpha = this.aplha;
        context.beginPath();
        context.arc(
            this.x,
            this.y,
            this.radius,
            (Math.PI / 180) * 0,
            (Math.PI / 180) * 360,
            false
        );
        context.fillStyle = this.color;
        context.fill();
        context.restore();
    }

    update() {
        this.draw();
        this.velocity.x *= friction;
        this.velocity.y *= friction;

        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.aplha -= 0.01;
    }
}
const particles=[];


// ----------------------ENDSCREEN---------------
const gameoverLoader = () => {
    // Creating endscreen div and play again button and high score element
    const gameOverBanner = document.createElement("div");
    const gameOverBtn = document.createElement("button");
    const highScore = document.createElement("div");

    highScore.innerHTML = `High Score : ${localStorage.getItem("highScore")
            ? localStorage.getItem("highScore")
            : playerScore
        }`;

    const oldHighScore =
        localStorage.getItem("highScore") && localStorage.getItem("highScore");

    if (oldHighScore < playerScore) {
        localStorage.setItem("highScore", playerScore);

        // updating high score html
        highScore.innerHTML = `High Score: ${playerScore}`;
    }

    // adding text to playagain button
    gameOverBtn.innerText = "Play Again";

    gameOverBanner.appendChild(highScore);

    gameOverBanner.appendChild(gameOverBtn);

    // Making reload on clicking playAgain button
    gameOverBtn.onclick = () => {
        window.location.reload();
    };

    gameOverBanner.classList.add("gameover");

    document.querySelector("body").appendChild(gameOverBanner);
};
// --------------------------EVENTLISTENER------------------




// event Listener for  Weapon aka left click
canvas.addEventListener("click", (e) => {
    shootingSound.play();
    
    
    // finding angle between player position(center) and click co-ordinates

    const myAngle = Math.atan2(
        e.clientY - canvas.height / 2,
        e.clientX - canvas.width / 2
    );

    // Making const speed for light weapon
    const velocity = {
        x: Math.cos(myAngle) * 5,
        y: Math.sin(myAngle) * 5,
    };

    // Adding  weapon in weapons array
    weapons.push(
        new Weapon(
            canvas.width / 2 ,
            canvas.height / 2 ,
            newWeapon,
            velocity
        )
    );
});

let animationId;
function animation() {
    // Making Recursion
    animationId = requestAnimationFrame(animation);
    
    context.clearRect(0, 0, canvas.width, canvas.height);
    craft.draw();
    // generating particles

    particles.forEach((particle, particleIndex) => {
        if (particle.aplha <= 0) {
            particles.splice(particleIndex, 1);
        } else {
            particle.update();
        }
    });


//   Generating Bullets
weapons.forEach((weapon, weaponIndex) => {
    weapon.update();

    // Removing Weapons if they are off screen
    if (
        weapon.x + (weapon.newWeapon.width)/2 < 1 ||
        weapon.y + (weapon.newWeapon.width)/2 < 1 ||
        weapon.x - (weapon.newWeapon.width)/2 > canvas.width ||
        weapon.y - (weapon.newWeapon.width)/2 > canvas.height
    ) {
        weapons.splice(weaponIndex, 1);
    }
});

    enemies.forEach((enemy,enemyIndex) => {
        enemy.update();

        const distanceBetweenPlayerAndEnemy = Math.hypot(
            craft.x - enemy.x,
            craft.y - enemy.y
        );

    // Stoping Game if enemy hit player
        if (distanceBetweenPlayerAndEnemy - (craft.newImage.width)/3 - (enemy.newEnemy.width)/3  < 1) {
        cancelAnimationFrame(animationId);
        gameOverSound.play();
        shootingSound.pause();
        killEnemySound.pause();
        introMusic.pause();
        return gameoverLoader();
    }

        weapons.forEach((weapon, weaponIndex) => {
            // Finding Distance between weapon and enemy
            const distanceBetweenWeaponAndEnemy = Math.hypot(
                weapon.x - enemy.x,
                weapon.y - enemy.y
            );

            if (distanceBetweenWeaponAndEnemy - (weapon.newWeapon.width) / 2 -(enemy.newEnemy.width)/2  < 1) {
                console.log("finish")
                killEnemySound.play();

                    for (let i = 0; i < 300 ; i++) {
                        particles.push(
                            new Particle(weapon.x, weapon.y, Math.random() * 2, " #e25822", {
                                x: (Math.random() - 0.5) * (Math.random() * 7),
                                y: (Math.random() - 0.5) * (Math.random() * 7),
                            })
                        );
                    }
                    // increasing player Score when killing one enemy
                    playerScore += 10;

                    // Rendering player Score in scoreboard html element
                    scoreBoard.innerHTML = `Score : ${playerScore}`;
                    setTimeout(() => {
                        enemies.splice(enemyIndex, 1);
                        weapons.splice(weaponIndex, 1);
                    }, 0);
                
            }
        });
    });       
}
addEventListener("contextmenu", (e) => {
    e.preventDefault();
});

addEventListener("resize", () => {
    window.location.reload();
});
animation()