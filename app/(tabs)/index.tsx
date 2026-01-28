import { useTheme } from "@/hooks/useTheme";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

export default function Index() {
  const { toggleDarkMode } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={styles.content}>
        I am editing app/index.tsx to edit this screen.
      </Text>

      <Text>Hi</Text>

      <TouchableOpacity onPress={toggleDarkMode}>
        <Text>Toggle theme mode</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },

  content: {
    fontSize: 22,
  },
});
