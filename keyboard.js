//keyboard.js
function pushInput(event) {
  const list = game.buttons;
  
  const input = event.code ? event.code : event.button;
  
  // if(input===0) controls.isTouched=true;
  // if(input===1) controls.isReset=true;
  // if(input===2) controls.isLooked=true;

  if (!list.includes(input)) list.push(input);

  if (list.includes("KeyE")||list.includes("KeyI")) {
    game.cy+=1;
  }
  if (list.includes("KeyD")||list.includes("KeyK")) {
    game.cy-=1;
  }
  if (list.includes("KeyS")||list.includes("KeyJ")) {
    game.cx+=1;
  }
  if (list.includes("KeyF")||list.includes("KeyL")) {
    game.cx-=1;
  }

  //console.log(game.buttons);

  draw();
}  
function dropInput(event) {
  const list = game.buttons;
  
  const input = event.code ? event.code : event.button;

  // if (input===0) controls.isTouched=false;
  // if (input===1) controls.isReset=false;
  // if (input===2) controls.isLooked=false;

  if (list.includes(input)) list.splice(list.indexOf(input),1);
}
function findInput(event) {
  const list = game.buttons;
  const input = event.code ? event.code : event.button;
  return (list.includes(input));
}

window.addEventListener("keydown", pushInput);
window.addEventListener("keyup", dropInput);
