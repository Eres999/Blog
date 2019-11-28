// Game Tetris;
const canvas = document.getElementById("tetris");
const ctx = canvas.getContext("2d");

const ground = new Image();
ground.src = "img/12.jpg";

let box = 20;

let speed = 50;

let dir;

let score = 0;

let val_x = 10;
let val_y = 20;

let sp = {
   x: Math.floor(val_x / 2 - 1),
   y: 1,
};

let mob = [];

Object.prototype.deepClone = function() {
    let result = (this instanceof Array) ? [] : {}, i;
    for(i in this) {
        if(this[i] == this.deepClone) { continue; }
        result[i] = (typeof(this[i]) == 'object') ? this[i].deepClone() : this[i];
    }
    return result;
};

let isCol = function() {
	return this.reduce((res, item) => {
    	if (res == true) return true;
    	if (mob[item[1]][item[0]] == true || item[0] < 0 || item[0] > val_x - 1) return true;
	    return false;
    }, false);
}

let fig1 = [[sp.x, sp.y], [sp.x, sp.y - 1], [sp.x + 1, sp.y - 1], [sp.x - 1, sp.y]];  // zu right
fig1.rotation = function() {
	let img = this.slice().deepClone();
	    img.isCol = isCol;
    if (this.pos === 1) {
    	img[2][1] += 2;
    	img[3][0] += 2;
    	if (!img.isCol()) {
    		this[2][1] += 2;
    	    this[3][0] += 2;
    	    this.pos = 2;
    	}
    }
    else if (this.pos === 2) {
       img[1][1] += 2;
       img[2][0] -= 2;
       if (!img.isCol()) {
       this[1][1] += 2;
       this[2][0] -= 2;
       this.pos = 3;
       }
       
    }
    else if (this.pos === 3) {
    	img[3][0] -= 2;
        img[2][1] -= 2;
    	if (!img.isCol()) {
    		this[3][0] -= 2;
            this[2][1] -= 2;
            this.pos = 4;
    	}
    }
    else if (this.pos === 4) {
    	img[1][1] -= 2;
        img[2][0] += 2;
    	if (!img.isCol()) {
    		this[1][1] -= 2;
            this[2][0] += 2;
            this.pos = 1;
    	}
    }

}
let rot2_1 = function() {
	this[0][0] -= 1; 
	this[0][1] += 1;
	this[1][0] -= 2;
	this[1][1] += 2;
    this[3][0] += 1;
    this[3][1] -= 1;

} 

let rot2_2 = function() {
	this[0][0] += 1; 
	this[0][1] -= 1;
	this[1][0] += 2;
	this[1][1] -= 2;
    this[3][0] -= 1;
    this[3][1] += 1;

} 

let fig2 = [[sp.x, sp.y], [sp.x, sp.y - 1], [sp.x, sp.y + 1	], [sp.x, sp.y + 2]];   // line

fig2.rotation = function() {
	let img = this.slice().deepClone();
	    img.isCol = isCol;
	if (this.pos === 1) {
	    img.rot2_1 = rot2_1;
	    img.rot2_1();
        if (!img.isCol()) {
        for (let i = 0; i < this.length; i++) {
            for (let j = 0; j < 2; j++) {
            	this[i][j] = img[i][j];
            }
        }
        	this.pos = 2;
        }
        
	}
   
	else if (this.pos == 2) {
	    img.rot2_2 = rot2_2;
	    img.rot2_2();
        img.map(item => {item[0] -= 1; return item;});
        if (!img.isCol()) {
        	for (let i = 0; i < this.length; i++) {
            for (let j = 0; j < 2; j++) {
            	this[i][j] = img[i][j];
            }
        }
        this.pos = 3;
        }

	}
	else if (this.pos == 3) {	
		img.map(item => {item[0] += 1; return item;});
		img.rot2_1 = rot2_1;
	    img.rot2_1();
	    img.map(item => {item[1] -= 1; return item;});
	    if (!img.isCol()) {
	    	for (let i = 0; i < this.length; i++) {
            for (let j = 0; j < 2; j++) {
            	this[i][j] = img[i][j];
            }
        }
           this.pos = 4; 
	    }
		
	}

	else if (this.pos == 4) {
		img.map(item => {item[1] += 1; return item;});
		img.rot2_2 = rot2_2;
	    img.rot2_2();
	    if (!img.isCol()) {
	    	for (let i = 0; i < this.length; i++) {
            for (let j = 0; j < 2; j++) {
            	this[i][j] = img[i][j];	
            }
        }

           this.pos = 1; 
	    }
	}
    
}

//console.log(fig2.rotation());
let fig3 = [[sp.x , sp.y], [sp.x, sp.y - 1], [sp.x , sp.y + 1], [sp.x + 1, sp.y]];  //  tetramino
fig3.rotation = function() {
	let img = this.slice().deepClone();
	    img.isCol = isCol;
    if (this.pos === 1) {
    	img[1][0] -= 1;
    	img[1][1] += 1;
        if (!img.isCol()) {
        	this[1][0] -= 1;
    	    this[1][1] += 1;
    	    this.pos = 2;
        }
    	
    }
    else if (this.pos === 2) {
    	img[3][0] -= 1;
        img[3][1] -= 1;
    	if (!img.isCol()) {
    		this[3][0] -= 1;
       this[3][1] -= 1;
       this.pos = 3;

    	}
       
    }
    else if (this.pos === 3) {
    	img[2][0] += 1;
        img[2][1] -= 1;
    	if (!img.isCol()) {
    		this[2][0] += 1;
       this[2][1] -= 1;
       this.pos = 4;
    	}
       
    }
    else if (this.pos === 4) {
    	img[1][0] += 1;
       img[1][1] -= 1;
       img[2][0] -= 1;
       img[2][1] += 1;
       img[3][0] += 1;
       img[3][1] += 1;
    	if (!img.isCol()) {
    		this[1][0] += 1;
       this[1][1] -= 1;
       this[2][0] -= 1;
       this[2][1] += 1;
       this[3][0] += 1;
       this[3][1] += 1;
       this.pos = 1;
    	}
       
    }
}

let fig4 = [[sp.x , sp.y], [sp.x  , sp.y - 1], [sp.x + 1, sp.y - 1], [sp.x + 1, sp.y ]];   // square
fig4.rotation = function() {
	return;
}

let fig5 = [[sp.x , sp.y], [sp.x , sp.y - 1], [sp.x - 1, sp.y - 1], [sp.x + 1, sp.y]];   // zu left
fig5.rotation = function() {
	let img = this.slice().deepClone();
	    img.isCol = isCol;
    if (this.pos === 1) {
    	img[1][0] += 1;
    	    img[2][0] += 1;
    	    img[2][1] += 2;
    	if (!img.isCol()) {
    		this[1][0] += 1;
    	    this[2][0] += 1;
    	    this[2][1] += 2;
    	    this.pos = 2;
    	}
    }
    else if (this.pos === 2) {
    	img[3][0] -= 2;
        img[1][1] += 2;
    	if (!img.isCol()) {
    		this[3][0] -= 2;
        this[1][1] += 2
       this.pos = 3;
    	}
       
    }
    else if (this.pos === 3) {
    	img[1][0] -= 1;
    	img[1][1] -= 2;
        img[2][0] -= 1;
    	if (!img.isCol()) {
    		this[1][0] -= 1;
    	   this[1][1] -= 2;
        this[2][0] -= 1;
       this.pos = 4;
    	}
       
    }
    else if (this.pos === 4) {
    	img[2][1] -= 2;
        img[3][0] += 2;
    	if (!img.isCol()) {
    		this[2][1] -= 2;
        this[3][0] += 2;
       this.pos = 1;
    	}
       	
    }

}

let rot6_1 = function() {
   this[1][0] += 1;
   this[1][1] += 1;
   this[2][1] += 2;
   this[3][0] -= 1;
   this[3][1] -= 1;
}
let rot6_2 = function() {
   this[1][0] -= 1;
   this[1][1] -= 1;
   this[2][1] -= 2;
   this[3][0] += 1;
   this[3][1] += 1;
}

let fig6 = [[sp.x , sp.y], [sp.x , sp.y - 1], [sp.x + 1, sp.y - 1], [sp.x , sp.y + 1]]; //Г
fig6.rotation = function() {
	let img = this.slice().deepClone();
	    img.isCol = isCol;
	 if (this.pos === 1) {
        img.rot6_1 = rot6_1;
        img.rot6_1();
        if (!img.isCol()) {
           this.rot6_1 = rot6_1;
           this.rot6_1(); 
           this.pos = 2;
        }
 
	 }
	 else if (this.pos === 2) {
	 	img.rot6_2 = rot6_2;
        img.rot6_2();
        img[2][0] -= 2;
        img[2][1] += 2;
	 	if (!img.isCol()) {
	 	this.rot6_2 = rot6_2;
        this.rot6_2();
        this[2][0] -= 2;
        this[2][1] += 2;
        this.pos = 3;
	 	}

	 }
     else if (this.pos === 3) {
     	img[2][0] += 2;
        img[2][1] -= 2;
     	img.rot6_1 = rot6_1;
        img.rot6_1();
        img[2][0] -= 2;
        img[2][1] -= 2;
     	if (!img.isCol()) {
     	this[2][0] += 2;
        this[2][1] -= 2;
     	this.rot6_1 = rot6_1;
        this.rot6_1();
        this[2][0] -= 2;
        this[2][1] -= 2;
        this.pos = 4;
     	}
	 	
	 }
	 else if (this.pos === 4) {
	 	img[2][0] += 2;
        img[2][1] += 2;
        img.rot6_2 = rot6_2;
        img.rot6_2();
	 	if (!img.isCol()) {
	 		this[2][0] += 2;
        this[2][1] += 2;
        this.rot6_2 = rot6_2;
        this.rot6_2();
        this.pos = 1;
	 	}
	 	
	 }

}

let rot7_1 = function() {
   this[1][0] -= 1;
   this[1][1] -= 1;
   this[2][0] -= 2;
   this[3][0] += 1;
   this[3][1] += 1;
}
let rot7_2 = function() {
   this[1][0] += 1;
   this[1][1] += 1;
   this[2][0] += 2;
   this[3][0] -= 1;
   this[3][1] -= 1;
}

let fig7 = [[sp.x , sp.y], [sp.x , sp.y + 1], [sp.x + 1, sp.y + 1], [sp.x , sp.y - 1]]; //L
fig7.rotation = function() {
	let img = this.slice().deepClone();
	    img.isCol = isCol;
	 if (this.pos === 1) {
        img.rot7_1 = rot7_1;
        img.rot7_1();
        if (!img.isCol()) {
           this.rot7_1 = rot7_1;
           this.rot7_1(); 
           this.pos = 2;
        }
 
	 }
	 else if (this.pos === 2) {
	 	img.rot7_2 = rot7_2;
        img.rot7_2();
        img[2][0] -= 2;
        img[2][1] -= 2;
	 	if (!img.isCol()) {
	 	this.rot7_2 = rot7_2;
        this.rot7_2();
        this[2][0] -= 2;
        this[2][1] -= 2;
        this.pos = 3;
	 	}

	 }
     else if (this.pos === 3) {
     	img[2][0] += 2;
        img[2][1] += 2;
     	img.rot7_1 = rot7_1;
        img.rot7_1();
        img[2][0] += 2;
        img[2][1] -= 2;
     	if (!img.isCol()) {
     	this[2][0] += 2;
        this[2][1] += 2;
     	this.rot7_1 = rot7_1;
        this.rot7_1();
        this[2][0] += 2;
        this[2][1] -= 2;
        this.pos = 4;
     	}
	 	
	 }
	 else if (this.pos === 4) {
	 	img[2][0] -= 2;
        img[2][1] += 2;
        img.rot7_2 = rot7_2;
        img.rot7_2();
	 	if (!img.isCol()) {
	 		this[2][0] -= 2;
        this[2][1] += 2;
        this.rot7_2 = rot7_2;
        this.rot7_2();
        this.pos = 1;
	 	}
	 	
	 }

}

let fig_type;

let collection = [fig1, fig2, fig3, fig4, fig5, fig6, fig7];

document.addEventListener("keydown", direction);

for (let y = 0; y < val_y; y++) {
	mob[y] = [];
	for (let x = 0; x < val_x; x++) {
       mob[y][x] = false;
	}
}

function direction(event) {
	if(event.keyCode == 83)
		dir = "down";
	if(event.keyCode == 87)
		dir = "up";
	if(event.keyCode == 65)
		dir = "left";
	if(event.keyCode == 68)
		dir = "right";
	if(event.keyCode == 13)
		dir = "enter";
}

function drawBoard() {
	ctx.drawImage(ground, 0, 0);
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, val_x * box, val_y * box);
	ctx.fillStyle = "yellow";
	ctx.font = "50px Georgia";
    ctx.fillText("Счет: " + score, 370, 70);
    ctx.font = "40px Georgia";
    ctx.fillText("Уровень: " + (5 - speed_freq), 370, 120);
    ctx.font = "30px Georgia";
    ctx.fillText("Управление A, W, D, Enter" , 300, 200);
	ctx.fillStyle = "yellow";
	for (let y = 0; y < mob.length; y++) {
	for (let x = 0; x < mob[y].length; x++) {
		if (mob[y][x] === true) 
       ctx.fillRect(x * box, y * box, box, box);
	}
}
}

function fall(val) {
	for (let obj of fig_type) {
		obj[1] += 1;
	}
}

function drawFig() {
	ctx.fillStyle = "yellow";
	for (let obj of fig_type) {
        ctx.fillRect(obj[0] * box, obj[1] * box, box, box);
	}
}

function check_collision(x, y) {
	if (mob[y][x] == true) return true;
	return false;
}

function reach_surf() {
	for (let obj of fig_type) {
		if (obj[1] == val_y - 1 ) {
            add_to_mob();
            generate_random_fig();
            return true;      
	}
	
}
return false;	
}

function reach_mob() {
	for (let obj of fig_type) {
		if(check_collision(obj[0], obj[1] + 1)) {
			add_to_mob();
			generate_random_fig();
			return true;
		}
	}
	return false;
}

function add_to_mob() {
	for (let obj of fig_type) mob[obj[1]][obj[0]] = true;
}

function destroy_line() {
	nl: for (let l = 0; l < mob.length; l++) {
	for (let x = 0; x < mob[l].length; x++) {
		if (mob[l][x] == false) continue nl;
	}
	score += 1;
	mob.splice(l, 1);
	let narr = new Array(val_x);
	for (let i = 0; i < val_x; i++) narr[i] = false;
	mob.splice(0, 0, narr);

}

}

function end_game() {
	for (let obj of fig_type) 
		if(check_collision(obj[0], obj[1])) {
			ctx.fillStyle = "red";
			ctx.font = "50px Georgia";
            ctx.fillText("Game Over!", 300, 300);
			clearInterval(game);
			console.log("Game Over!");
			return true;
		}
	return false;
}

function rotat() {
  
}

function generate_random_fig() {
	let rn = Math.floor(Math.random() * collection.length );
	fig_type = collection[rn].slice().deepClone();
	fig_type.pos = 1;
	fig_type.rotation = collection[rn].rotation;


}

generate_random_fig();

function start_game() {
   	game = setInterval(drawGame, speed);
}

let timer = 1;
let speed_freq = 4;
let tmp = speed_freq;

function drawGame() {
	drawBoard();	
	drawFig();
	if (end_game()) return;
	//console.log("score = ", score);
		let l_c = fig_type.reduce((res, item) => Math.min(item[0], res), Infinity);
		let r_c = fig_type.reduce((res, item) => Math.max(item[0], res), -1);
		if (dir === "left" &&  l_c > 0) if (fig_type.reduce((res, item) => {
			if (res === false) return false;
			if (check_collision(item[0] - 1, item[1])) return false;
			return true;
		}, true))
	fig_type.map(item => {
		item[0] -= 1;
		return item;
	});
	if (dir === "right" && r_c < val_x - 1 ) if (fig_type.reduce((res, item) => {
		    if (res === false) return false;
			if (check_collision(item[0] + 1, item[1])) return false;
			return true;
		}, true))
	fig_type.map(item => {
		item[0] += 1;
		return item;
	});

	if (dir === "enter") fig_type.rotation();
	if (dir === "down") {
		tmp = speed_freq;
		speed_freq = -1;
	}
	
	if (!reach_surf()) if (!reach_mob()) if (timer > speed_freq) {
		fall();
		timer = 1;
	}	
	destroy_line();
	speed_freq = tmp;
	dir = "none";
	timer += 1;
	if (score >= 20 && score < 40) speed_freq = 3;
	else if (score >= 40 && score < 60) speed_freq = 2;
	else if (score >= 60) speed_freq = 1;
}  
   let game;
   if (confirm("Начать игру?")) start_game();
   	