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
  if(e.changedTouches.length===1) controls.isTouched=true;
  if(e.changedTouches.length===2) controls.isLooked=true;

  for(let i=0; i<e.changedTouches.length; i++) {
  }
};
var handleTouchFinish = (e)=>{
  e.preventDefault()
  if(e.changedTouches.length===1) controls.isTouched=false;
  if(e.changedTouches.length===2) controls.isLooked=false;
  for(let i=0; i<e.changedTouches.length; i++) {
  }
};
var handleTouchMove = (e)=>{
  e.preventDefault()

  for(let i=0; i<e.changedTouches.length; i++) {
  }
};

window.addEventListener("touchstart",handleTouchStart);
window.addEventListener("touchend",handleTouchFinish);
window.addEventListener("touchcancel",handleTouchFinish);
window.addEventListener("touchmove",handleTouchMove);
