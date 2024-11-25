//keyboard.js
function pushInput(event) {
  const list = client.buttons;
  
  const input = event.code ? event.code : event.button;
  
  // if(input===0) controls.isTouched=true;
  // if(input===1) controls.isReset=true;
  // if(input===2) controls.isLooked=true;

  //console.log(client.buttons);
  if (!list.includes(input)) list.push(input);
    if (list.includes("Escape")) {
      client.isQuit=true;
    }
    if (list.includes("Backquote")) {
      if (!client.debug) {
        client.isDebug=(client.isDebug^=true);
        client.debug=6;
      }
    }

  //testDraw();
}  
function dropInput(event) {
  const list = client.buttons;
  
  const input = event.code ? event.code : event.button;

  // if (input===0) controls.isTouched=false;
  // if (input===1) controls.isReset=false;
  // if (input===2) controls.isLooked=false;

  if (list.includes(input)) list.splice(list.indexOf(input),1);
}
function findInput(event) {
  const list = client.buttons;
  const input = event.code ? event.code : event.button;
  return (list.includes(input));
}

window.addEventListener("keydown", pushInput);
window.addEventListener("keyup", dropInput);
