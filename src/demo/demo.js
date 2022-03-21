//
// NOTE: This file is associated with `demo.html`, and is ONLY for testing purposes.
//







let canvas = document.getElementById("gwin");
let ctx    = canvas.getContext("2d");



const txt = new CtxText("TEST!");
txt.x = 20;
txt.y = 100;

const c = new Circle(10, 200, 200, 30, 30);
c.setStyle("lightgray");

const player     = new Rectangle(10, 10, 10, 10);
let   velocX     = 0;
let   velocY     = 0;

canvas.onkeydown = function keydown(e) {
	const k = (e?.key ?? "").toLowerCase();
	switch(k) {
		case 'w':
			velocY = -2;
			break;
		case 's':
			velocY = 2;
			break;
		case 'a':
			velocX = -2;
			break;
		case 'd':
			velocX = 2;
			break;
	}
}
canvas.onkeyup   = function keyup(e) {
	const k = (e?.key ?? "").toLowerCase();
	switch(k) {
		case 'w': case 's':
			velocY = 0;
			break;
		case 'a': case 'd':
			velocX = 0;
			break;
	}
}



try {
	
	game_loop((delta) => {
		const scalar = delta/100;  // Divide the time in milliseconds to get time in seconds.
		player.x += velocX*scalar;
		player.y += velocY*scalar;
		txt.message = `Player coords: ${player.x}, ${player.y}`;
		
		if(c.overlaps(player)) player.setStyle("lime");
		else                   player.setStyle();
		
		ctx.fillStyle = "white";
		ctx.fillRect(0, 0, 600, 400);
		c.draw(ctx);
		txt.draw(ctx);
		player.draw(ctx);
	});
	
} catch(e) {
	alert(`Error (${e.name}): ${e.message}.`);
}