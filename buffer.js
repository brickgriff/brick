const Buffer = (function (/*api*/) { // FIXME: pick a non-keyword
  var api = {};


  api.flush = function (state) {
    controls.zoom=0;
    controls.isResized=false;
    //controls.isResized=false;
    //console.log(state.buffer.isTouched);
  };

  // return the public api
  return api;
}());

const controls = { // TODO: settle on a better name for this
  buttons:[],
  mouse:{
    x_:0,
    y_:0,
    _x:0,
    _y:0,
    dragMin:10,
    dragMax:50,
  },
  isDragged:false,
  isClicked:false,
  isTouched:false,
  isLooked:false,
  isReset:false,
  isResized:false,
  zoom:0,  
  radius:0,
  angle:0,
  length:0,
  width:0,
  height:0,
};


