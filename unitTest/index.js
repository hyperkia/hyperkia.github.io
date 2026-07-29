import isPageObjectInLayersObjectStore from './isPageObjectInLayersObjectStore.js';
import pageOrderMatchInLayersPanelAndCanvas from './pageOrderMatchInLayersPanelAndCanvas.js';
import checkNodeExistence from './checkNodeExistence.js';

function runWhenIdle(callback) {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(callback);
  } else {
    requestAnimationFrame(callback);
  }
}

function schedule() {
  setTimeout(() => {
    runWhenIdle(() => {
      isPageObjectInLayersObjectStore();
      pageOrderMatchInLayersPanelAndCanvas();
      checkNodeExistence();
      schedule();
    });
  }, 5000);
}

function Index() {
  schedule();
}

export default Index;