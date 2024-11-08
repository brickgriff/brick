const Buffer = (function (/*api*/) {
  var api = {};

  api.flush = function (state) {

    state.inputs=controls;
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
    dragMin:10,
    dragMax:50,
  },
  isDragged:false,isClicked:false,
  isTouched:false,
  viewport:{
    isResized:false,
  },
};


