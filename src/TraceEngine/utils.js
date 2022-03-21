const TraceUtils = class TraceUtils {
	/**
	* Convert from HTML client-coordinates to canvas coordinates.
	* @param {CanvasRenderingContext2D} ctx The context of the window to translate to.
	* @param {number} x The X HTML client-coordinate.
	* @param {number} y The Y HTML client coordinate.
	*/
	static fromHTMLToWinCoords(ctx, x, y) {
		const window = ctx.canvas;
		const brect  = window.getBoundingClientRect();
		const [tx, ty] = [
			(x-brect.left)*(window.width/brect.width),
			(y-brect.top)*(window.height/brect.height)
		];
		
		return [tx, ty];
	}
	
	
	
	static lowerizeString(s) {
		return (s ?? "").toLowerCase();
	}
	
	
	
	/**
	* Measures the metric of some text
	*/
	static textMetrics() {
		//
	}
	
	
	
	
	
	static GLOBAL_DUMMY_CTX = (() => {
		const canvas = document.createElement("canvas");
		const ctx    = canvas.getContext("2d");
		
		return ctx;
	})();          // Drawing context to test metrics on.
}