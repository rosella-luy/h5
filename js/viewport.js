var meta = document.querySelector("meta[name=viewport]");
var html = document.getElementsByTagName('html')[0];
var phoneName = navigator.userAgent;
if(window.devicePixelRatio && devicePixelRatio>=2 && phoneName.indexOf('m')==-1){
  if(devicePixelRatio>=3){
    meta.content = 'initial-scale=0.3333333333333333, maximum-scale=0.3333333333333333, minimum-scale=0.3333333333333333, user-scalable=no';
    // html.style.fontSize = "300px";
  }else{
    meta.content = 'initial-scale=0.5, maximum-scale=0.5, minimum-scale=0.5, user-scalable=no';
    // html.style.fontSize = "180px";
  }
}