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
      flow:0,
      growthRate:0,
      decayRate:0,
      isTouching:-1,
      reset:0,
      // center position
      cx:0,
      cy:0,
      cw:0,
      ch:0,
      entities:[],
      //minDim:0,
      start:0,
    };

    state.entities = [
      {x:1.5,y:0,r:0.1},
      {x:0,y:1.5,r:0.1},
      {x:-1.05,y:-1.05,r:0.1},
    ];

    for (let i=0; i<1000; i++) {

      const distance = Math.random()*100;
      const angle = Math.random()*Math.PI*2;
      const x =distance*Math.cos(angle);
      const y =distance*Math.sin(angle);
      const r = 0.5;

      state.entities.push({
        x:x,y:y,r:r
      });
    }

    return state;
  };

  // update the state
  api.update = function (state, dt) {
    //console.log(`update(frame=${state.frame}, dt=${dt}, fps=${Math.floor(1/dt)})`);
    //console.log(`update(frame=${state.frame})`);
    //console.log("state:",state);
    state.frame++;

    const level=client.level=state.growth<1 ? 0 : Math.floor(Math.log10(state.growth));
    const scalingFactor = client.scalingFactor = 1/(level+2);
    client.offsetX=client.cx*client.speed*client.cr*2*scalingFactor;
    client.offsetY=client.cy*client.speed*client.cr*2*scalingFactor;

    state.entities.forEach((entity,idx)=>{
      const unitR = client.cr*client.scalingFactor;
      const entityX=entity.x*unitR+client.offsetX;
      const entityY=entity.y*unitR+client.offsetY;
      const entityR=entity.r*unitR;

      const distance = Math.hypot(entityY,entityX);
      const isTouching=Math.abs(distance)<=unitR+entityR;
      //if (idx===2) console.log(isTouching,entity.timer);

      if (entity.timer===undefined) entity.timer=0;
      
      if (isTouching) {
        entity.timer=100;
        state.isTouching=idx;
      } else if (idx===state.isTouching) {
        state.isTouching=-1;
      } else if (state.isTouching!==-1) {
        // pause
      } else {
        entity.timer=Math.max(0,entity.timer-1);
      }
      entity.isActive=entity.timer>0;

    });

    // TODO: make the decay function polynomial to maintain challenge
    //const decay = state.decayRate * (state.growth/50);
    //state.flow+=1;//+state.growthRate - decay;
    state.growth=state.entities.filter(entity=>entity.isActive).length+state.flow;

    //console.log(state.reset,state.frame,state.reset<=state.frame, state.growth);
    if (state.growth!==0) {
      state.reset=state.frame+60*Math.floor(1/dt); // +(5s*fps)
    } 

    if (state.reset<=state.frame ||  state.isQuit) {
      client.cx=0;
      client.cy=0;
    }

    //console.log(state.buffer.isResized);
    //state.zoom=Math.min(5,Math.max(0.5,state.zoom+client.zoom));

    // if (client.isResized) {
    //   state.canvas.width=client.width;
    //   state.canvas.height=client.height;
    // }

    //state.minDim=Math.min(state.canvas.width,state.canvas.height);

    const list = client.buttons;
    const vector = {x:0,y:0};

    if (list.includes("KeyE")||list.includes("KeyI")||list.includes("ArrowUp")) {
      vector.y+=1;
    }
    if (list.includes("KeyD")||list.includes("KeyK")||list.includes("ArrowDown")) {
      vector.y-=1;
    }
    if (list.includes("KeyS")||list.includes("KeyJ")||list.includes("ArrowLeft")) {
      vector.x+=1;
    }
    if (list.includes("KeyF")||list.includes("KeyL")||list.includes("ArrowRight")) {
      vector.x-=1;
    }
    if (list.includes("Escape")) {
      state.quitting=state.quitting===-1?state.quitting=5*Math.floor(1/dt):state.quitting-1;
      state.isQuit=state.quitting===0;
      //console.log(state.quitting,state.isQuit);
    } else {
      state.quitting=-1;
    }

    // calculate movement vector
    const length = Math.min(1,Math.hypot(vector.y,vector.x));
    const angle = Math.atan2(vector.y,vector.x);

    client.cx += Math.round(length * Math.cos(angle));
    client.cy += Math.round(length * Math.sin(angle));
  };

  // return the public api
  return api;
}());