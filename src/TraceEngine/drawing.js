//
// Dependencies:
//     shapes.js
//








/**
* Draws this rectangle to the screen.
* @param {CanvasRenderingContext2D} CTX A drawing context to draw on.
* @param {boolean} fill Whether or not to fill the rectangle with color.
*/
Rectangle.prototype.draw = function draw(CTX=null, fill=true) {
	CTX.strokeStyle = this.strokeStyle;
	CTX.fillStyle   = this.fillStyle;
	CTX.lineWidth   = this.lineWidth;
	CTX.beginPath();
	CTX.rect(this.x, this.y, this.w, this.h);
	if(fill) CTX.fill();  else CTX.stroke();
	CTX.closePath();
}
/**
* Draws this poster to the screen.
* @param {CanvasRenderingContext2D} CTX A drawing context to draw on.
* @param {number[]} bounds An optional array with size and cutting information for the poster.
*/
Poster.prototype.draw    = function draw(CTX=null) {
	if(this.imgrslt == null) return;
	
	CTX.strokeStyle = "#00000000";
	CTX.fillStyle   = "#00000000";
	CTX.lineWidth   = 1;
	CTX.drawImage(this.imgrslt, this.x, this.y);
}



/**
* Draws this circle to the screen.
* @param {CanvasRenderingContext2D} CTX A drawing context to draw on.
* @param {boolean} fill Whether or not to fill the circle with color.
* @param {boolean} ccw Whether to go counterclockwise or not. - `false` by default.
*/
Circle.prototype.draw    = function draw(CTX=null, fill=true, ccw=false) {
	CTX.strokeStyle = this.strokeStyle;
	CTX.fillStyle   = this.fillStyle;
	CTX.lineWidth   = this.lineWidth;
	CTX.beginPath();
	CTX.arc(this.x, this.y, this.radius, 0, TAU, ccw);
	if(fill) CTX.fill();  else CTX.stroke();
	CTX.closePath();
}



/**
* Draws this text object to the screen.
* @param {CanvasRenderingContext2D} CTX A drawing context to draw on.
* @param {boolean} fill Whether to fill in the text or not.
*/
CtxText.prototype.draw   = function draw(CTX=null, fill=true) {
	CTX.strokeStyle = this.strokeStyle;
	CTX.fillStyle   = this.fillStyle;
	CTX.font        = this.font;
	
	if(fill) CTX.fillText(
		this.message, this.x, this.y+this.height,
		this.adjust ? this.maxWidth : undefined
	);
	else     CTX.strokeText(
		this.message, this.x, this.y+this.height,
		this.adjust ? this.maxWidth : undefined
	);
}