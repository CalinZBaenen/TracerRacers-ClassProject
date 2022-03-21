/**
* The game loop function calls a provided
* callback function every frame.  
* It also passes in the amount of time since
* the last frame.
* @param {(tdelta:number)=>void} callback The function to call each frame.
*/
let game_loop = (callback)=>{
	let running      = true;
	let tSPvFm = Date.now();                // Time since previous frame.
	let stop         = ()=>{ running = false; }  // Function to stop the loop.
	Object.defineProperty(callback, "stop_gameloop", { value: stop });  // Add a stop function to the callback.
	requestAnimationFrame(function loop() {
		let now   = Date.now();
		let delta = tSPvFm-now;
		tSPvFm    = now;
		
		callback( Math.abs(delta) );
		
		requestAnimationFrame(loop);
	});
}