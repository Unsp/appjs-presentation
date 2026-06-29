import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { FeedAvatar } from "~screens/VideoScreen/ui/components/FeedAvatar";

type TabKey = "home" | "reels" | "create" | "search" | "profile";

type FeedBottomNavProps = {
  activeTab?: TabKey;
};

export function FeedBottomNav({ activeTab = "home" }: FeedBottomNavProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.root, { paddingBottom: Math.max(insets.bottom, 8) }]}>
      <NavItem
        active={activeTab === "home"}
        icon={<Ionicons color="#f5f5f5" name="home" size={26} />}
      />
      <NavItem
        active={activeTab === "reels"}
        icon={<Ionicons color="#f5f5f5" name="film-outline" size={26} />}
      />
      <NavItem
        active={activeTab === "create"}
        icon={<Ionicons color="#f5f5f5" name="add-outline" size={30} />}
      />
      <NavItem
        active={activeTab === "search"}
        icon={<Ionicons color="#f5f5f5" name="search-outline" size={26} />}
      />
      <NavItem
        active={activeTab === "profile"}
        icon={<FeedAvatar label="K" size={28} />}
      />
    </View>
  );
}

type NavItemProps = {
  active: boolean;
  icon: React.ReactNode;
};

function NavItem({ active, icon }: NavItemProps) {
  return (
    <Pressable
      accessibilityRole="button"
      style={[styles.item, active && styles.itemActive]}
    >
      {icon}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    backgroundColor: "#000000",
    borderTopColor: "#262626",
    borderTopWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 10,
  },
  item: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 32,
    minWidth: 32,
    opacity: 0.72,
  },
  itemActive: {
    opacity: 1,
  },
});
