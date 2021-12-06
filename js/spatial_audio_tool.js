
  let actx;
  let pannerNode;
  let listener;

const pannerNodeInfo = {
  position:{
    _x:0,
    _y:0,
    _z:-0},
  forward:{
    _x:0,
    _y:1,
    _z:-0},
};
window.pannerNodeInfo = pannerNodeInfo;

// panner node position
["x","y","z"].forEach(function (axis){
  Object.defineProperty(pannerNodeInfo.position, axis, {
    get: function () {return pannerNodeInfo.position["_"+axis]},
    set: function (value) {
      pannerNodeInfo.position["_"+axis] = value;
      // pannerNode["position"+axis.toUpperCase()] = pannerNodeInfo.position[axis];
      const inputX = document.querySelector(`#panner_position_x`);
      inputX &&( inputX.value = pannerNodeInfo.position["_x"]);
      const inputY = document.querySelector(`#panner_position_y`);
      inputY &&( inputY.value = pannerNodeInfo.position["_y"]);
      const inputZ = document.querySelector(`#panner_position_z`);
      inputZ &&( inputZ.value = pannerNodeInfo.position["_z"]);
      if(pannerNode.positionX){
        pannerNode.positionX.value = pannerNodeInfo.position.x;
        pannerNode.positionY.value = pannerNodeInfo.position.y;
        pannerNode.positionZ.value = pannerNodeInfo.position.z;
      }else{
        pannerNode.setPosition(pannerNodeInfo.position.x, pannerNodeInfo.position.y, pannerNodeInfo.position.z);
      }
    }
  })
});
// panner node forward
["x","y","z"].forEach(function (axis){
  Object.defineProperty(pannerNodeInfo.forward, axis, {
    get: function () {return pannerNodeInfo.forward["_"+axis]},
    set: function (value) { 
      pannerNodeInfo.forward["_"+axis] = value;
      // pannerNode["forward"+axis.toUpperCase()] = pannerNodeInfo.forward[axis];
      const inputX = document.querySelector(`#panner_forward_x`)
      inputX &&( inputX.value = pannerNodeInfo.forward["_x"]);
      const inputY = document.querySelector(`#panner_forward_y`)
      inputY &&( inputY.value = pannerNodeInfo.forward["_y"]);
      const inputZ = document.querySelector(`#panner_forward_z`)
      inputZ &&( inputZ.value = pannerNodeInfo.forward["_z"]);
      if(pannerNode.forwardX){
        pannerNode.forwardX.value = pannerNodeInfo.forward.x;
        pannerNode.forwardY.value = pannerNodeInfo.forward.y;
        pannerNode.forwardZ.value = pannerNodeInfo.forward.z;
      }else{
        pannerNode.setOrientation(pannerNodeInfo.forward.x, pannerNodeInfo.forward.y, pannerNodeInfo.forward.z);
      }
    }
  })
});

const listenerInfo = {
  position:{
    _x:0,_y:0,_z:-0
  },
  forward:{
    _x:0,_y:1,_z:0
  }
};
window.listenerInfo = listenerInfo;
// listener position
["x","y","z"].forEach(function (axis){
  Object.defineProperty(listenerInfo.position, axis, {
    get: function () {return listenerInfo.position["_"+axis]},
    set: function (value) {
      listenerInfo.position["_"+axis] = value;
      // const input = document.querySelector(`#listener_position_${axis}`)
      const inputX = document.querySelector(`#listener_position_x`)
      inputX &&( inputX.value = listenerInfo.position["_x"]);
      const inputY = document.querySelector(`#listener_position_y`)
      inputY &&( inputY.value = listenerInfo.position["_y"]);
      const inputZ = document.querySelector(`#listener_position_z`)
      inputZ &&( inputZ.value = listenerInfo.position["_z"]);
      if(!listener){return;}
      if(listener.positionX){
        listener.positionX.value = listenerInfo.position.x;
        listener.positionY.value = listenerInfo.position.y;
        listener.positionZ.value = listenerInfo.position.z;
      }else{
        listener.setPosition(listenerInfo.position.x, listenerInfo.position.y, listenerInfo.position.z);
      }
    }
  })
});
// listener forward
["x","y","z"].forEach(function (axis){
  Object.defineProperty(listenerInfo.forward, axis, {
    get: function () {return listenerInfo.forward["_"+axis]},
    set: function (value) {
      listenerInfo.forward["_"+axis] = value;
      const inputX = document.querySelector(`#listener_forward_x`)
      inputX && (inputX.value = listenerInfo.forward["_x"]);
      const inputY = document.querySelector(`#listener_forward_y`)
      inputY && (inputY.value = listenerInfo.forward["_y"]);
      const inputZ = document.querySelector(`#listener_forward_z`)
      inputZ && (inputZ.value = listenerInfo.forward["_z"]);
      if(!listener){return;}
      if(listener.forwardX){
        listener.forwardX.value = listenerInfo.forward.x;
        listener.forwardY.value = listenerInfo.forward.y;
        listener.forwardZ.value = listenerInfo.forward.z;
        listener.upX.value = 0;
        listener.upY.value = 0;
        listener.upZ.value = 1;
      }else{
        listener.setOrientation(listenerInfo.forward.x, listenerInfo.forward.y, listenerInfo.forward.z, 0, 0, 1);
      }
    }
  })
});




const createAndMountBtn = function (value, parent, clickHandler){
  console.log(`create and mount btn: ${value}`);
  const btn = document.createElement('input');
  btn.type="button";
  btn.value = value;
  btn.style.cssText="background-color:#ff0;padding: 5px;"
  btn.onclick = clickHandler;
  parent.appendChild(btn);
  return btn;
}

const createInputArea = function (value, parent, handler){
  console.log(`create and mount input area: ${value}`);
  const input = document.createElement('input');
  const tag = document.createElement('label');
  input.type="number";
  input.step=100;
  tag.innerText = value;
  input.style.cssText="background-color:#ff0;padding: 5px;height: 2em";
  input.onchange = (...args)=>handler(input,...args);
  input.id=value.split(' ').join('_');
  const [k1,k2, k3] = value.split(" ");

  if(k1==="listener"){
    // listenerInfo[k2][k3] = input.value;
    input.value = listenerInfo[k2][k3];
  }
  if(k1==="panner"){
    // pannerNodeInfo[k2][k3] = input.value;
    input.value = pannerNodeInfo[k2][k3];
  }


  parent.appendChild(tag);
  parent.appendChild(input);
  return input;
}

const createBanner = function (value, parent) {
  const banner = document.createElement('div');
  banner.innerText = value;
  banner.style.cssText = 'padding: 5px;font-weight: 700;';
  parent.appendChild(banner);
  return banner;
}


const afterInit = function(board){
  const moveSpatialListener = function(axis, event, input){
    // axis: x,y,z
    listenerInfo.position[axis] = event.target.valueAsNumber;
    input.value = event.target.valueAsNumber;
  }
  const rotateSpatialListener = function(axis, event, input){
    // axis: x,y,z
    listenerInfo.forward[axis] = event.target.valueAsNumber;
    input.value = event.target.valueAsNumber;
  }
  const movePanner = function(axis, event, input){
    // axis: x,y,z
    pannerNodeInfo.position[axis] = event.target.valueAsNumber;
    input.value = event.target.valueAsNumber;
  }
  const rotatePanner = function(axis, event, input){
    // axis: x,y,z
    pannerNodeInfo.forward[axis] = event.target.valueAsNumber;
    input.value = event.target.valueAsNumber;
  }

  // Add a banner

  createBanner("move Spatial Listener", board);
  createInputArea("listener position x", board, (input,v)=>moveSpatialListener("x",v, input))
  createInputArea("listener position y", board, (input,v)=>moveSpatialListener("y",v, input))
  createInputArea("listener position z", board, (input,v)=>moveSpatialListener("z",v, input))

  // Add a banner

  createBanner("rotate Spatial Listener", board);
  createInputArea("listener forward x", board, (input,v)=>rotateSpatialListener("x",v, input))
  createInputArea("listener forward y", board, (input,v)=>rotateSpatialListener("y",v, input))
  createInputArea("listener forward z", board, (input,v)=>rotateSpatialListener("z",v, input))

  // Add a banner

  createBanner("move PannerNode", board);
  createInputArea("panner position x", board, (input,v)=>movePanner("x",v, input))
  createInputArea("panner position y", board, (input,v)=>movePanner("y",v, input))
  createInputArea("panner position z", board, (input,v)=>movePanner("z",v, input))

  // Add a banner

  createBanner("rotate PannerNode", board);
  createInputArea("panner forward x", board, (input,v)=>rotatePanner("x",v, input))
  createInputArea("panner forward y", board, (input,v)=>rotatePanner("y",v, input))
  createInputArea("panner forward z", board, (input,v)=>rotatePanner("z",v, input))
};
let hasRun = false;
window.$$ = function (){
  if(hasRun) {return;}
  hasRun = true;
  // 在界面上插入一个区域div名字叫board
  const board = document.createElement('div');
  board.id = 'spatial-audio-tool-board';
  board.style.cssText = 'width: 200px; background-color: #ccc;'+
  'position:absolute;top:10px;left:10px;'+
  'display:flex;flex-direction:column;padding:10px;z-index:1000';
  document.body.appendChild(board);

  const createPannerNode = function (s){

    const audioTag = document.createElement('audio');
    audioTag.srcObject = s;
    audioTag.crossOrigin = 'anonymous';
    document.body.appendChild(audioTag);

    // s is the stream;
    actx = window.AudioContext ? new AudioContext(): new webkitAudioContext();
    pannerNode = new PannerNode(actx, {
      panningModel: "HRTF",
      distanceModel: "linear",
      refDistance: 1,
      maxDistance: 1000,
      rolloffFactor: 1,
      coneOuterGain: 0.4,
      positionX: 0,
      positionY: 0,
      positionZ: -0,
    });
    const source = actx.createMediaStreamSource(s);
    source.connect(pannerNode);
    pannerNode.connect(actx.destination);
    "suspended" === actx.state && actx.resume();
    listener = actx.listener;

    document.body.removeChild(audioTag);

  }
  // Add a banner;
  createBanner("create Panner Node and Init", board);
  // Add a button to create a Panner Node;
  createAndMountBtn('Init', board, function(){
    if(!window.stream){
      alert("There is not a stream available");
      return;
    }
    createPannerNode(window.stream);
    afterInit(board);
  });

}

// window.addEventListener("load", window.$$);
