const World = (function (/*api*/) {
  var api = {};

  api.create = function (canvas) {
    var state = {
      canvas:canvas, // for resizing... anything else?
      //buffer:{}, // use the global game object?
      frame:0, // frame count
      zoom:5, // zoom factor (bigger is zoomed-in)
      pitch:1, // percent angle b/w 90deg and 0deg
      // player position
      //px:0,
      //py:0,
      speed:0.1,
      radius:5,
      length:0,
      angle:0,
      growth:0,
      growthRate:0,
      decayRate:1,
      // center position
      cx:0,
      cy:0,
      cw:0,
      ch:0,
      entities:[]
      //minDim:0,
    };

    state.entities = [
      {x:1.5,y:0,r:0.1,isActive:true},
      {x:0,y:1.5,r:0.1},
      {x:-1.05,y:-1.05,r:0.1},
    ];

    return state;
  };

  // update the state
  api.update = function (state, dt) {
    //console.log(`update(frame=${state.frame}, dt=${dt}, fps=${Math.floor(1/dt)})`);
    //console.log(`update(frame=${state.frame})`);
    //console.log("state:",state);
    state.frame++;

    const level=game.level=state.growth<1 ? 0 :Math.floor(Math.log10(state.growth));
    const scalingFactor = game.scalingFactor = 1/(level+2);
    game.offsetX=game.cx*game.speed*game.cr*2*scalingFactor;
    game.offsetY=game.cy*game.speed*game.cr*2*scalingFactor;

    // TODO: make the decay function polynomial to maintain challenge
    const decay = state.decayRate * (state.growth/50);
    state.growth+=Math.max(0,state.growthRate - decay);

    state.entities.forEach(entity=>{

    });    

    //console.log(state.buffer.isResized);
     state.zoom=Math.min(5,Math.max(0.5,state.zoom+game.zoom));

    // if (game.isResized) {
    //   state.canvas.width=game.width;
    //   state.canvas.height=game.height;
    // }

    //state.minDim=Math.min(state.canvas.width,state.canvas.height);

    const list = game.buttons;
    const vector = {x:0,y:0};

    if (list.includes("KeyE")||list.includes("KeyI")) {
      vector.y+=1;
    }
    if (list.includes("KeyD")||list.includes("KeyK")) {
      vector.y-=1;
    }
    if (list.includes("KeyS")||list.includes("KeyJ")) {
      vector.x+=1;
    }
    if (list.includes("KeyF")||list.includes("KeyL")) {
      vector.x-=1;
    }

    // calculate movement vector
    const length = Math.min(1,Math.hypot(vector.y,vector.x));
    const angle = Math.atan2(vector.y,vector.x);

    game.cx += Math.round(length * Math.cos(angle));
    game.cy += Math.round(length * Math.sin(angle));
  };

  // return the public api
  return api;
}());