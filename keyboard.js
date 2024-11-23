//keyboard.js
function pushInput(event) {
  const list = controls.buttons;
  
  const input = event.code ? event.code : event.button;
  
  if(input===0) controls.isTouched=true;
  if(input===1) controls.isReset=true;
  if(input===2) controls.isLooked=true;

  if (!list.includes(input)) list.push(input);
}  
function dropInput(event) {
  const list = controls.buttons;
  
  const input = event.code ? event.code : event.button;

  if (input===0) controls.isTouched=false;
  if (input===1) controls.isReset=false;
  if (input===2) controls.isLooked=false;

  if (list.includes(input)) list.splice(list.indexOf(input),1);
}
function findInput(event) {
  const list = controls.buttons;
  const input = event.code ? event.code : event.button;
  return (list.includes(input));
}

window.addEventListener("keydown", pushInput);
window.addEventListener("keyup", dropInput);
