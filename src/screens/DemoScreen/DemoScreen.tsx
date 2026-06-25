import { StyleSheet, View } from "react-native";

import { VideoEffectCanvas } from "~features/typegpu/ui/VideoEffectCanvas";

export function DemoScreen() {
  return (
    <View style={styles.root}>
      <VideoEffectCanvas active />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#0b1020",
  },
});
