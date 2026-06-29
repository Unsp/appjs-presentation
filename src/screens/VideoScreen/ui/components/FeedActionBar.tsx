import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

type FeedActionBarProps = {
  commentsLabel: string;
  isLiked: boolean;
  likesLabel: string;
  savesLabel: string;
  sharesLabel: string;
  onToggleLike: () => void;
  onToggleSave: () => void;
};

export function FeedActionBar({
  commentsLabel,
  isLiked,
  likesLabel,
  onToggleLike,
  onToggleSave,
  savesLabel,
  sharesLabel,
}: FeedActionBarProps) {
  return (
    <View style={styles.root}>
      <View style={styles.leftGroup}>
        <ActionItem
          count={likesLabel}
          icon={
            <Ionicons
              color={isLiked ? "#ff3040" : "#f5f5f5"}
              name={isLiked ? "heart" : "heart-outline"}
              size={26}
            />
          }
          onPress={onToggleLike}
        />
        <ActionItem
          count={commentsLabel}
          icon={
            <Ionicons color="#f5f5f5" name="chatbubble-outline" size={24} />
          }
        />
        <ActionItem
          count={sharesLabel}
          icon={<Ionicons color="#f5f5f5" name="paper-plane-outline" size={24} />}
        />
      </View>

      <ActionItem
        count={savesLabel}
        icon={
          <Ionicons color="#f5f5f5" name="bookmark-outline" size={24} />
        }
        onPress={onToggleSave}
      />
    </View>
  );
}

type ActionItemProps = {
  count: string;
  icon: React.ReactNode;
  onPress?: () => void;
};

function ActionItem({ count, icon, onPress }: ActionItemProps) {
  return (
    <Pressable
      accessibilityRole="button"
      hitSlop={8}
      onPress={onPress}
      style={styles.actionItem}
    >
      {icon}
      <Text style={styles.count}>{count}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    paddingTop: 10,
  },
  leftGroup: {
    alignItems: "center",
    flexDirection: "row",
    gap: 18,
  },
  actionItem: {
    alignItems: "center",
    flexDirection: "row",
    gap: 6,
  },
  count: {
    color: "#f5f5f5",
    fontSize: 13,
    fontWeight: "600",
  },
});
