import { getActiveComp } from "./aeft-utils";

export const example = () => {};

export const separateDimensions = () => {
  app.beginUndoGroup("Separate dimensions");

  const comp = getActiveComp();
  const layers = comp.selectedLayers;

  for (let layer of layers) {
    const transform = layer.transform;
    if (!transform.position.dimensionsSeparated) {
      transform.position.dimensionsSeparated = true;
    }
  }

  app.endUndoGroup();
};
