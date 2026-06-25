import { StyleSheet, Text, View } from "react-native";

type VideoEffectFallbackProps = {
  message: string;
  tone?: "loading" | "error";
};

export function VideoEffectFallback({
  message,
  tone = "error",
}: VideoEffectFallbackProps) {
  return (
    <View style={styles.root}>
      <View style={styles.panel}>
        <Text style={tone === "loading" ? styles.loadingText : styles.errorText}>
          {message}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: "100%",
    backgroundColor: "#0b1020",
  },
  panel: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "#0b1020",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  loadingText: {
    color: "#8a9bb8",
    textAlign: "center",
  },
  errorText: {
    color: "#c97a7a",
    textAlign: "center",
    lineHeight: 20,
  },
});
