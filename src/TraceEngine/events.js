//
// Dependencies:
//     utils.js
//







/**
* Registers a function to be called when
* tbe mouse is pressed down.  
* Provides X and Y coordinates relative to the canvas.
* @param {CanvasRenderingContext2D} ctx The context of the window to register the event on.
* @param {(x:number,y:number)->void} callback The function to call.
*/
const event_mousedown = (ctx, callback)=>{
	ctx.canvas.onmousedown = function mousedown(e) {
		callback( ...TraceUtils.fromHTMLToWinCoords(ctx, e.clientX, e.clientY) );
	};
};



/**
* Registers a function to be called when
* tbe mouse is moved.  
* Provides X and Y coordinates relative to the canvas.
* @param {CanvasRenderingContext2D} ctx The context of the window to register the event on.
* @param {(x:number,y:number)->void} callback The function to call.
*/
const event_mousemove = (ctx, callback)=>{
	ctx.canvas.onmousemove = function mousemove(e) {
		callback( ...TraceUtils.fromHTMLToWinCoords(ctx, e.clientX, e.clientY) );
	};
};



/**
* Registers a function to be called when
* tbe mouse is released.  
* Provides X and Y coordinates relative to the canvas.
* @param {CanvasRenderingContext2D} ctx The context of the window to register the event on.
* @param {(x:number,y:number)->void} callback The function to call.
*/
const event_mouseup = (ctx, callback)=>{
	ctx.canvas.onmouseup = function mouseup(e) {
		callback( ...TraceUtils.fromHTMLToWinCoords(ctx, e.clientX, e.clientY) );
	};
};





/**
* Registers a function to be called when
* a key is pressed down.  
* Provides the key that was pressed.
* @param {CanvasRenderingContext2D} ctx The context of the window to register the event on.
* @param {(key:string)->void} callback The function to call.
*/
const event_keydown = (ctx, callback)=>{
	ctx.canvas.onkeydown = function keydown(e) {
		callback( TraceUtils.lowerizeString(e.key) );
	}
};



/**
* Registers a function to be called when
* a key is released.  
* Provides the key that was pressed.
* @param {CanvasRenderingContext2D} ctx The context of the window to register the event on.
* @param {(key:string)->void} callback The function to call.
*/
const event_keyup = (ctx, callback)=>{
	ctx.canvas.onkeyup = function keyup(e) {
		callback( TraceUtils.lowerizeString(e.key) );
	}
};