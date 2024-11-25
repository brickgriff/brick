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
      isTouching:false,
      reset:0,
      // center position
      cx:0,
      cy:0,
      cw:0,
      ch:0,
      entities:[],
      activeEntities:[],
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
    const fps= state.fps= Math.floor(1/dt);
    //console.log(fps);
    state.frame++;

    //console.log(state.activeEntities);
    const activeEntities=state.activeEntities;//state.entities.filter(entity=>entity.timer>0);
    state.growth=activeEntities.length;//+state.flow;
    client.level=state.growth<1 ? 0 : Math.floor(Math.log10(state.growth));
    const scalingFactor = client.scalingFactor = 1/(client.level+2);
    client.offsetX=client.cx*client.speed*client.cr*2*scalingFactor;
    client.offsetY=client.cy*client.speed*client.cr*2*scalingFactor;

    state.isTouching=false;
    const timerDuration = 1*60;

    //console.log(state.entities[0]);
    state.entities.forEach((entity,idx)=>{
      const unitR = client.cr*client.scalingFactor;
      const entityX=entity.x*unitR+client.offsetX;
      const entityY=entity.y*unitR+client.offsetY;
      const entityR=entity.r*unitR;

      const distance = Math.hypot(entityY,entityX);
      const isTouching = Math.abs(distance)<=unitR+entityR;

      if (entity.timer===undefined) entity.timer=0;
      if (entity.fraction===undefined) entity.fraction=0;
      if (entity.activeIdx===undefined) entity.activeIdx=-1;
      
      if (isTouching) {
        entity.timer=timerDuration;
        entity.fraction=1;
        state.isTouching=true;

        // move it in the list
        if (entity.activeIdx>-1) {
          // remove it from the list
          state.activeEntities.splice(entity.activeIdx,1);
          // decrease the ids for the rest of the list
          state.activeEntities.slice(entity.activeIdx).forEach(iEntity => {
            iEntity.activeIdx=iEntity.activeIdx-1;
          });
        }
        entity.activeIdx = state.activeEntities.length;
        state.activeEntities.push(entity);
      }
    });

    // TODO: make the decay function polynomial to maintain challenge
    //const decay = state.decayRate * (state.growth/50);
    //state.flow+=1;//+state.growthRate - decay;
    
    if (!state.isTouching && activeEntities.length>0) {
      const firstEntity = activeEntities[0];
      const firstTimerMinusOne = firstEntity.timer-1;
      //console.log(firstTimerMinusOne);
      firstEntity.timer=Math.max(0,firstTimerMinusOne);
      firstEntity.fraction=firstTimerMinusOne/timerDuration; // 0-1
      if (firstTimerMinusOne===0) {
        // decrease the ids for the rest of the list
        //const old = activeEntities[1].activeIdx;
        activeEntities.forEach(iEntity => {
          iEntity.activeIdx=iEntity.activeIdx-1;
        });
        // remove it from the list
        activeEntities.splice(0,1);
      }
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
      state.isQuit=true;
    }
    if (list.includes("Backquote")) {
      state.isDebug=(state.isDebug^=true);
    }

    // reset override
    const resetDuration = 60*60;
    state.isOverride=false; 
    if (state.reset===0)state.reset=resetDuration;
    if (list.includes("Backspace")) {
      state.reset-=12;
      state.isOverride=true;
      //state.isQuit=state.quitting===0;
      //console.log(state.quitting,state.isQuit);
    }
    //console.log(state.reset,state.frame,state.reset<=state.frame, state.growth);

    // auto reset
    if (state.growth===0) {
      state.reset-=1;
    } else if (!state.isOverride) {
      state.reset=resetDuration;
    }

    if (state.reset<1) {
      client.cx=0;
      client.cy=0;
      state.reset=resetDuration;
    }

    state.progress=1-state.reset/resetDuration;

    // calculate movement vector
    const length = Math.min(1,Math.hypot(vector.y,vector.x));
    const angle = Math.atan2(vector.y,vector.x);

    client.cx += Math.round(length * Math.cos(angle));
    client.cy += Math.round(length * Math.sin(angle));
  };

  // return the public api
  return api;
}());