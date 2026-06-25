import * as ScreenOrientation from "expo-screen-orientation";
import { useEffect, useState } from "react";
import { Dimensions } from "react-native";

export type VideoTextureRotation = 0 | 90 | 180 | 270;

function mapOrientationToRotation(
  orientation: ScreenOrientation.Orientation,
): VideoTextureRotation {
  switch (orientation) {
    case ScreenOrientation.Orientation.LANDSCAPE_LEFT:
      return 0;
    case ScreenOrientation.Orientation.LANDSCAPE_RIGHT:
      return 180;
    case ScreenOrientation.Orientation.PORTRAIT_UP:
      return 90;
    case ScreenOrientation.Orientation.PORTRAIT_DOWN:
      return 270;
    default:
      return 0;
  }
}

export function useVideoTextureRotation() {
  const [rotation, setRotation] = useState<VideoTextureRotation>(() => {
    const { width, height } = Dimensions.get("window");
    return width > height ? 180 : 90;
  });

  useEffect(() => {
    const sync = (orientation: ScreenOrientation.Orientation) => {
      setRotation(mapOrientationToRotation(orientation));
    };

    const syncFromDevice = () => {
      void ScreenOrientation.getOrientationAsync().then(sync);
    };

    void ScreenOrientation.unlockAsync().then(syncFromDevice);
    syncFromDevice();

    const orientationSub = ScreenOrientation.addOrientationChangeListener(
      (event) => {
        sync(event.orientationInfo.orientation);
      },
    );
    const dimensionSub = Dimensions.addEventListener("change", syncFromDevice);
    const retryId = setTimeout(syncFromDevice, 120);

    return () => {
      clearTimeout(retryId);
      ScreenOrientation.removeOrientationChangeListener(orientationSub);
      dimensionSub.remove();
    };
  }, []);

  return rotation;
}

export function normalizeLandscapeFrameSize(width: number, height: number) {
  return width >= height ? { width, height } : { width: height, height: width };
}
