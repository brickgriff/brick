/*
  @Author: BrickGriff@GitHub.com
*/

// RUN GAME LOOP //
function loop(now,state,ctx) {
  const elapsed = (now - state.start) / 1000; // deltaTime in seconds
  const dt = elapsed > 1 ? 1 : elapsed; // cap deltaTime @ 1s
  
  //console.log(`gameLoop(frame=${state.frame}, dt=${dt}, fps=${Math.floor(1/dt)})`);

  World.update(state, dt); // update entities
  Display.draw(state, ctx); // draw entities
  Buffer.flush(state); // read inputs

  // FIXME: the above may be unnecessary since state.ctx is inside state...
  // maybe Display is allowed to use other canvas contexts to draw
  // ... like maybe an offscreen canvas context

  if (state.isQuit) return console.log("quit");

  requestAnimationFrame(now=>loop(now,state,ctx)); // keep state private
}

// MAIN FUNCTION //
function main() {  
  // TODO: display factory/service to allow different output modes
  // 2D? 3D? 4D? 1D? ASCII? Voxel? 8-bit? 16-bit? 32-bit? 1-bit?
  const canvas = document.createElement("canvas"); // default canvas
  canvas.style="border:1px solid #000000; image-rendering: pixelated; image-rendering: crisp-edges;";
  const ctx = canvas.getContext("2d", { willReadFrequently: true }); // now we can draw
  const state = World.create(canvas); // initialize!

  document.body.appendChild(canvas); // add it to body

  requestAnimationFrame(now=>loop(now,state,ctx)); // keep state private
}