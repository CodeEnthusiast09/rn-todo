import { Link } from "expo-router";
import { Text, View, StyleSheet } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.content}>
        I am editing app/index.tsx to edit this screen. Hmmmm
      </Text>

      <Text>Hi</Text>

      <Link href={"/about"}>Visit about screen</Link>

      <Link href={"/setting"}>Visit settings screen</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F2F1FF",
  },

  content: {
    fontSize: 52,
  },
});
