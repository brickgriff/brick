//keyboard.js
function pushInput(event) {
  const list = controls.buttons;
  const input = event.code ? event.code : event.button;
  if(input===0) controls.isTouched=true;

  if (!list.includes(input)) list.push(input);
}  
function dropInput(event) {
  const list = controls.buttons;
  const input = event.code ? event.code : event.button;
  if (input===0) controls.isTouched=false;

  if (list.includes(input)) list.splice(list.indexOf(input),1);
}
function findInput(event) {
  const list = controls.buttons;
  const input = event.code ? event.code : event.button;
  return (list.includes(input));
}

window.addEventListener("keydown", pushInput);
window.addEventListener("keyup", dropInput);
