import { forEachLayer, getActiveComp } from "./aeft-utils";

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

const getCCValueString = (cameraName: string, value: string) => {
  return `thisComp.layer("${cameraName} Controller").effect("Camera Controller")("${value}")`;
};

export const createCameraController = () => {
  app.beginUndoGroup("Create camera controller");

  const comp = getActiveComp();

  // Get camera count
  let cameraCount = 0;
  forEachLayer(comp, (layer) => {
    if (layer instanceof CameraLayer) {
      cameraCount++;
    }
  });

  const cameraName = "Camera " + "0" + cameraCount.toString().slice(-2);
  const camera = comp.layers.addCamera(cameraName, [
    comp.width / 2,
    comp.height / 2,
  ]);
  camera.autoOrient = AutoOrientType.NO_AUTO_ORIENT;
  camera.position.dimensionsSeparated = true;

  // Position
  camera.transform.xPosition.expression = `${comp.width / 2} - ${getCCValueString(cameraName, "Position X")}`;
  camera.transform.yPosition.expression = `${comp.height / 2} - ${getCCValueString(cameraName, "Position Y")}`;
  camera.transform.zPosition.expression = `${getCCValueString(cameraName, "Link to Zoom")} > 0 ? -thisComp.layer("${cameraName}").cameraOption.zoom.value + ${getCCValueString(cameraName, "Position Z")} : ${getCCValueString(cameraName, "Position Z")}`;

  // Rotation
  camera.transform.xRotation.expression = getCCValueString(
    cameraName,
    "Orbit X"
  );
  camera.transform.yRotation.expression = getCCValueString(
    cameraName,
    "Orbit Y"
  );
  camera.transform.zRotation.expression = getCCValueString(
    cameraName,
    "Orbit Z"
  );

  // Camera Options
  camera.cameraOption.zoom.expression = getCCValueString(cameraName, "Zoom");
  camera.cameraOption.depthOfField.expression = getCCValueString(
    cameraName,
    "Enabled"
  );
  camera.cameraOption.focusDistance.expression = getCCValueString(
    cameraName,
    "Focus Distance"
  );
  camera.cameraOption.zoom.expression = getCCValueString(cameraName, "Zoom");
  camera.cameraOption.aperture.expression = getCCValueString(
    cameraName,
    "Aperture"
  );
  camera.cameraOption.blurLevel.expression = getCCValueString(
    cameraName,
    "Blur"
  );
  camera.cameraOption.irisShape.expression = getCCValueString(
    cameraName,
    "Iris Shape"
  );

  const nullLayer = comp.layers.addNull();
  nullLayer.source.name = camera.name + " Controller";
  nullLayer.threeDLayer = true;

  const cc =
    new File($.fileName).parent.parent.fsName + "/preset/camera_controller.ffx";
  nullLayer.applyPreset(new File(cc));

  app.endUndoGroup();
};
