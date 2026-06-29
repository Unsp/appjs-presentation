import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

type ReelsSideActionsProps = {
  commentsLabel: string;
  isLiked: boolean;
  likesLabel: string;
  sharesLabel: string;
  onToggleLike: () => void;
};

export function ReelsSideActions({
  commentsLabel,
  isLiked,
  likesLabel,
  onToggleLike,
  sharesLabel,
}: ReelsSideActionsProps) {
  return (
    <View style={styles.root}>
      <SideAction
        count={likesLabel}
        icon={
          <Ionicons
            color={isLiked ? "#ff3040" : "#ffffff"}
            name={isLiked ? "heart" : "heart-outline"}
            size={30}
          />
        }
        onPress={onToggleLike}
      />
      <SideAction
        count={commentsLabel}
        icon={<Ionicons color="#ffffff" name="chatbubble-outline" size={28} />}
      />
      <SideAction
        count={sharesLabel}
        icon={<Ionicons color="#ffffff" name="paper-plane-outline" size={28} />}
      />
      <Pressable accessibilityRole="button" hitSlop={8} style={styles.sideAction}>
        <Ionicons color="#ffffff" name="ellipsis-vertical" size={24} />
      </Pressable>
      <View style={styles.audioDisc}>
        <View style={styles.audioDiscInner} />
      </View>
    </View>
  );
}

type SideActionProps = {
  count: string;
  icon: React.ReactNode;
  onPress?: () => void;
};

function SideAction({ count, icon, onPress }: SideActionProps) {
  return (
    <Pressable
      accessibilityRole="button"
      hitSlop={8}
      onPress={onPress}
      style={styles.sideAction}
    >
      {icon}
      <Text style={styles.count}>{count}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    gap: 22,
  },
  sideAction: {
    alignItems: "center",
    gap: 4,
  },
  count: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "600",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  audioDisc: {
    alignItems: "center",
    backgroundColor: "#262626",
    borderColor: "#ffffff",
    borderRadius: 8,
    borderWidth: 2,
    height: 34,
    justifyContent: "center",
    marginTop: 4,
    width: 34,
  },
  audioDiscInner: {
    backgroundColor: "#0095f6",
    borderRadius: 4,
    height: 18,
    width: 18,
  },
});
