import normalize from "./normalize.js";
import createKey from "./createKey.js";
import createElement from "./createElement.js";


const registry = new Map();
let counter = 0;

function Index(gradientData) {
  const normalized = normalize(gradientData);
  const key = createKey(normalized);

  if (registry.has(key)) {
    return registry.get(key);
  }

  const id = `grad-${++counter}`;
  registry.set(key, id);

  const gradientElement = createElement(id, normalized);
  KIA.kiaCanvas.$id.gradientRegistryDefs.appendChild(gradientElement);

  return id;
}


export default Index;