//
// NOTE: This file is associaed with `demo_menus.html`, and is ONLY for testing purposes.
//







let canvas = document.getElementById("gwin");  // Get canvas element.
let ctx    = canvas.getContext("2d");          // Get the canvas' associated drawing context.



let mousex = NaN;
let mousey = NaN;


const cursor = new Rectangle(95, 215, 15, 15); // Cursor. - Acts as a player/highlighter.
cursor.setStyle("red");

let cursor_vx = 0;  // Cursor X velocity.
let cursor_vy = 0;  // Cursor Y velocity.


const menu_btn_1 = new Rectangle(75, 75, 40, 25);
menu_btn_1.setStyle("orange");

const menu_btn_2 = new CtxText("Menu Button 2", 15);
menu_btn_2.setStyle("orange");
[menu_btn_2.x, menu_btn_2.y] = [75, 175];

const abt_btn    = new CtxText("About This Demo", 17);
abt_btn.setStyle("orange");
[abt_btn.x, abt_btn.y] = [75, 225];


const visible_objs = [
	menu_btn_1,
	menu_btn_2,
	abt_btn,
	cursor
];                      // The visible objects; anything to be displayed.





event_keydown(ctx, (k)=>{
	switch(k) {
		// Make cursor move in the negative Y direction (up).
		case 'w':
			cursor_vy = -2;
			break;
		
		// Make cursor move in the negative X direction (left).
		case 'a':
			cursor_vx = -2;
			break;
		
		// Make cursor move in the positive Y direction (down).
		case 's':
			cursor_vy = 2;
			break;
		
		// Make cursor move in the positive X direction (right).
		case 'd':
			cursor_vx = 2;
			break;
		
		// Make buttons do things.
		case "enter":
			if(menu_btn_1.overlaps(cursor)) {
				[cursor_vx, cursor_vy] = [0, 0];    // Stop player.
				alert("Rectangle Mode Selected!");  // Alert message.
			}
			if(menu_btn_2.overlaps(cursor)) {
				[cursor_vx, cursor_vy] = [0, 0];    // Ditto.
				alert("Mode 2 Selected!")           // Ditto.
			}
			if(abt_btn.overlaps(cursor)) {
				visible_objs.length = 0;  // Clear the list of visible objects.
				
				const txt = new CtxText(
					"This demo was meant to aide to test my engine, so I could make the game easier to make.\n\r"+
					"Sorry it's so disappointing. D:",
					11
				);
				[txt.x, txt.y] = [5, 75];
				
				const poster = new Poster("../../assets/logo.png", 34, 125);
				poster.load();
				
				visible_objs.push(txt, poster);
			}
			break;
	}
});

event_keyup(ctx, (k)=>{
	switch(k) {
		// Stop the cursor.
		case 'w': case 's':
			cursor_vy = 0;
			break;
		
		// Stop the cursor.
		case 'a': case 'd':
			cursor_vx = 0;
			break;
	}
});

event_mousemove(ctx, (x, y)=>{
	mousex = x;
	mousey = y;
});





game_loop((delta)=>{
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	
	cursor.x += cursor_vx*(delta/25);
	cursor.y += cursor_vy*(delta/25);
	
	// Draw all the visible objects.
	for(const obj of visible_objs) switch(obj) {
		// Handle events with `menu_btn_1`.
		case menu_btn_1:
			if(
				obj.overlaps(cursor) ||
				obj.hasPoint(mousex, mousey)
			) obj.setStyle("yellow");
			else obj.setStyle("orange");
			
			obj.draw(ctx);
			break;
		
		// Handle events with `menu_btn_2`.
		case menu_btn_2:
			if(obj.overlaps(cursor)) obj.setStyle("yellow");
			else obj.setStyle("orange");
			
			obj.draw(ctx, false);
			break;
		
		
		
		default:
			obj.draw(ctx);
			break;
	}
});