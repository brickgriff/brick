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
    controls.isTouched=true;

  for(let i=0; i<e.changedTouches.length; i++) {
  }
};
var handleTouchFinish = (e)=>{
  e.preventDefault()
    controls.isTouched=false;
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
