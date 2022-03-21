//
// Dependencies:
//     utils.js
//



const TAU = 2*Math.PI;  // Tau is the full lemgth of a circular arc.
const RAD = TAU/360;    // One radian, a.k.a degree.







/**
* The `Shape` abstract base-class is a class used to represent
* both physical and graphical shapes.
*/
const Shape     = class Shape {
	constructor(x, y, w, h) {
		this.x = x ?? this.x;
		this.y = y ?? this.y;
		this.w = w ?? this.w;
		this.h = h ?? this.h;
	}
	
	
	
	
	
	/**
	* Sets both the `strokeStyle` and `fillStyle` properties.  
	* If no value is provided, it will reset to the default `"black"`.
	* @param {CanvasGradient|CanvasPattern|DOMString|string} style The new style of this shape.
	*/
	setStyle(style="black") {
		this.strokeStyle = style;
		this.fillStyle   = style;
	}
	
	
	
	/**
	* Checks if a specified (x, y) point is within
	* the boundaries (area*) of this shape.  
	* The base-class `Shape` always returns `false`.
	* @param {number} x The X coordinate.
	* @param {number} y The Y coordinate.
	*/
	hasPoint(x, y)          { return false; }
	
	
	
	/**
	* Checks if another shape overlaps this
	* one.  
	* The base-class `Shape` always returns false.
	* @param {Shape} shape The shape to test for overlapping.
	*/
	overlaps(s=null)        { return false; }
	
	
	
	/**
	* Returns the area of the shape.  
	* The base-class `Shape` always returns zero
	* because there is no way to calculate area.
	*/
	area()                  { return 0; }
	
	
	
	
	
	strokeStyle = "black";  // The color outlines are drawn with.
	fillStyle   = "black";  // The color shapes are filled with.
	lineWidth   = 1;        // Width of line segments creating the shape.
	h           = 0;        // Height.
	w           = 0;        // Width.
	x           = 0;        // X coordinate.
	y           = 0;        // Y coordinate.
}





const Rectangle = class Rextangle extends Shape {
	hasPoint(x, y)   {
		return (
			(x >= this.x && x <= this.x+this.w) &&
			(y >= this.y && y <= this.y+this.h)
		);
	}
	
	
	
	overlaps(s=null) {
		return (
			(
				(s.x >= this.x && s.x <= this.x+this.w) ||
				(s.x+s.w >= this.x && s.x+s.w <= this.x+this.w)
			) &&
			(
				(s.y >= this.y && s.y <= this.y+this.h) ||
				(s.y+s.h >= this.y && s.y+s.h <= this.y+this.h)
			)
		);
	}
	
	
	
	/**
	* Returns the area of the rectangle (`w*h`).
	*/
	area()           { return this.w*this.h; }
}



/**
* An image that can be painted onto the canvas.  
* This class is not called `Image` because
* that would conflict with the default `Image` class
* built into JavaScript.
*/
const Poster    = class Poster extends Rectangle {
	constructor(src, x, y, w, h) {
		super(x, y, w, h);
		
		this.image = new Image();
		this.src   = src ?? this.src;
	}
	
	
	
	/**
	* Loads or reloads the image.
	* @param {function} success A callback function to run if the image loads.
	* @param {function} error A callback function to run if the image could not be loaded.
	*/
	load(success=function(){}, error=function(){}) {
		this.image.onload = ()=>{
			this.imgrslt = this.image;
			if(Number.isNaN(this.w)) this.w = this.image.width;  else this.image.width  = this.w;
			if(Number.isNaN(this.h)) this.h = this.image.height; else this.image.height = this.h;
			success();
		}
		this.image.onerror = ()=>{
			this.imgrslt = null;
			this.w       = NaN;
			this.h       = NaN;
			error();
		}
		
		this.image.src    = this.src+'?'+Date.now();
	}
	
	
	
	imgrslt = null;
	image   = null;
	src     = "";
	h       = NaN;
	w       = NaN;
}





const Circle    = class Circle extends Shape {
	constructor(r, x, y, w, h) {
		super(x, y, w, h);
		this.radius = r ?? this.radius;
	}
	
	
	
	
	
	hasPoint(x, y)    {
		const dx = Math.abs(this.x-x);    // Horizontal distance from the circle's center.
		const dy = Math.abs(this.y-y);    // Vertical distance from the circle's center.
		
		return dx+dy <= this.radius+(TAU/10)+1;  // Distance equation to prove.
	}
	
	
	
	overlaps(s=null) {
		const dxw = Math.abs(this.x-(s.x+s.w)); // The distance from the right and circle's center.
		const dyh = Math.abs(this.y-(s.y+s.h)); // The distance from the bottom and circle's center.
		const dx  = Math.abs(this.x-s.x);   // Horizontal distance from the circle's center.
		const dy  = Math.abs(this.y-s.y);   // Vertical distance from the circle's center.
		
		const d   = dx+dy;
		const t   = this.radius+(TAU/10)+1; // The max distance an overlapping object can have.
		
		return (
			(dx <= t/2 || dxw < t/2) &&
			(dy <= t/2 || dyh < t/2)
		);
	}
	
	
	
	/**
	* Returns the area of the circle (`(2*π)*r ^ 2`).
	*/
	area()           { return TAU*this.radius ** 2; }
	
	
	
	get h()  { return 2*this.radius; }
	set h(v) { this.radius = v/2; }
	get w()  { return 2*this.radius; }
	set w(v) { this.radius = v/2; }
	
	radius = 1;
}





const CtxText   = class CtxText {
	constructor(msg, fontSize) {
		this.fontSize = fontSize ?? this.fontSize;
		this.message  = msg ?? this.message;
	}
	
	
	
	
	
	/**
	* Sets both the `strokeStyle` and `fillStyle` properties.  
	* If no value is provided, it will reset to the default `"black"`.
	* @param {CanvasGradient|CanvasPattern|DOMString|string} style The new style of this shape.
	*/
	setStyle(style="black") {
		this.strokeStyle = style;
		this.fillStyle   = style;
	}
	
	
	
	/**
	* Returns whether or not a point is within the boundaries.  
	* If the font is adjusted to fit its max width, this may not be
	* 100% accurate.
	* @param {number} x The X coordinate.
	* @param {number} y The Y coordinate.
	*/
	hasPoint(x, y) {
		if(this.adjust) return (
			(x >= this.x && x <= this.x+this.maxWidth) &&
			(y >= this.y && y <= this.y+this.fontSize)
		);
		else            {
			TraceUtils.GLOBAL_DUMMY_CTX.font = this.font;
			const msr                        = TraceUtils.GLOBAL_DUMMY_CTX.measureText(this.message);
			
			const h = msr.actualBoundingBoxAscent+msr.actualBoundingBoxDescent;
			const w = msr.width;
			
			return (
				(x >= this.x && x <= this.x+w) &&
				(y >= this.y && y <= this.y+h)
			);
		}
	}
	
	
	
	/**
	* Determines if another shape is on top of this text. (Not 100% accurate.)
	* @param {Shape} s The shape to test.
	*/
	overlaps(s=null) {
		const h = this.height;
		return (
			(
				(s.x >= this.x && s.x <= this.x+this.maxWidth) ||
				(s.x+s.w >= this.x && s.x+s.w <= this.x+this.maxWidth)
			) &&
			(
				(s.y >= this.y && s.y <= this.y+h) ||
				(s.y+s.h >= this.y && s.y+s.h <= this.y+h)
			)
		);
	}
	
	
	
	/**
	* Returns the total area the text will take up (in pixels).  
	*/
	area()     {
		if(this.adjust) this.maxWidth*this.fontSize;
		else          {
			TraceUtils.GLOBAL_DUMMY_CTX.font = this.font;
			const msr                        = TraceUtils.GLOBAL_DUMMY_CTX.measureText(this.message);
			
			return (
				msr.actualBoundingBoxAscent+msr.actualBoundingBoxDescent  // Height of the font.
			)*msr.width*this.message.length;
		}
	}
	
	
	
	    strokeStyle      = "black";
	    fontFamily       = "sans-serif";
	    fillStyle        = "black";
	    fontSize         = 12;
	get maxWidth()       { return this.fontSize*this.message.length; }
	    message          = "";
		/**
		* Tells the graphics interface to shrink to font to fit within
		* its max-width range.
		* (Basically "fast mode".)
		*/
	    adjust           = true;
	/**
	* The computed height of this text.  
	* Since it's computed, use it sparingly, and store a copy of the value if needed.
	*/
	get height()         {
		TraceUtils.GLOBAL_DUMMY_CTX.font = this.font;
		const msr                        = TraceUtils.GLOBAL_DUMMY_CTX.measureText(this.message);
		
		return msr.actualBoundingBoxAscent+msr.actualBoundingBoxDescent;
	}
	get font()           {
		return `${this.fontSize}px ${this.fontFamily}`;
	}
	    x                = 0;
	    y                = 0;
}