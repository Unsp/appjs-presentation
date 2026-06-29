import { StyleSheet, Text, View } from "react-native";

type FeedAvatarProps = {
  label: string;
  size?: number;
};

export function FeedAvatar({ label, size = 36 }: FeedAvatarProps) {
  return (
    <View
      style={[
        styles.root,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        },
      ]}
    >
      <Text style={[styles.label, { fontSize: size * 0.42 }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    backgroundColor: "#3d5a80",
    borderColor: "#262626",
    borderWidth: 1,
    justifyContent: "center",
  },
  label: {
    color: "#ffffff",
    fontWeight: "700",
  },
});
