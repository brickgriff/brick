//touch.js
// FIXME: touch events

const ongoingTouches = [];

function copyTouch({ identifier, pageX, pageY }) {
  return { identifier, pageX, pageY };
}

function ongoingTouchIndexById(idToFind) {
  for (let i = 0; i < ongoingTouches.length; i++) {
    const id = ongoingTouches[i].identifier;

    if (id === idToFind) {
      return i;
    }
  }
  return -1; // not found
}

var handleTouchStart = (e)=>{
  e.preventDefault()
  //console.log(e)
  const touches = e.changedTouches;
  for(let i=0; i<touches.length; i++) {
    ongoingTouches.push(copyTouch(touches[i]));
  }

  if(ongoingTouches.length===1) controls.isTouched=true;
  if(ongoingTouches.length===2) controls.isLooked=true;

};
var handleTouchFinish = (e)=>{
  e.preventDefault()

  const touches = e.changedTouches;
  for(let i=0; i<touches.length; i++) {
    let idx = ongoingTouchIndexById(touches[i].identifier);
    if (idx===-1) continue;
    ongoingTouches.splice(idx, 1); // remove it; we're done

  }
  if(ongoingTouches.length===0) controls.isTouched=false;
  if(ongoingTouches.length===1) controls.isLooked=false;
};

var handleTouchMove = (e)=>{
  e.preventDefault()

  for(let i=0; i<e.changedTouches.length; i++) {
  }
};

window.addEventListener("touchstart",handleTouchStart,{passive:false});
window.addEventListener("touchend",handleTouchFinish);
window.addEventListener("touchcancel",handleTouchFinish);
window.addEventListener("touchmove",handleTouchMove,{passive:false});
