const Buffer = (function (/*api*/) { // FIXME: pick a non-keyword
  var api = {};

  api.flush = function (state) {

    state.controls=controls;
    controls.mouse.zoom=0;
  };

  // return the public api
  return api;
}());

const controls = {
  buttons:[],
  mouse:{
    x_:0,
    y_:0,
    _x:0,
    _y:0,
    zoom:0,
    dragMin:10,
    dragMax:50,
  },
  isDragged:false,
  isClicked:false,
  isTouched:false,
  isLooked:false,
  isReset:false,
  isResized:false,

  viewport:{
  },
};


