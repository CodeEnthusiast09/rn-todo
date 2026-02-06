import { createHomeStyles } from "@/assets/styles/home.styles";
import { api } from "@/convex/_generated/api";
import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useMutation } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const MAX_TODO_LENGTH = 500;

const TodoInput = () => {
  const { colors } = useTheme();
  const homeStyles = createHomeStyles(colors);

  const [newTodo, setNewTodo] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const addTodo = useMutation(api.todos.addTodo);

  const handleAddTodo = async () => {
    const trimmedTodo = newTodo.trim();

    if (!trimmedTodo) {
      return;
    }

    setIsAdding(true);

    try {
      await addTodo({ text: trimmedTodo });
      setNewTodo("");
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to add todo. Please try again.";

      console.error("Error adding todo:", error);

      Alert.alert("Error", errorMessage, [{ text: "OK" }]);
    } finally {
      setIsAdding(false);
    }
  };

  const isDisabled = !newTodo.trim() || isAdding;

  return (
    <View style={homeStyles.inputSection}>
      <View style={homeStyles.inputWrapper}>
        <TextInput
          style={homeStyles.input}
          placeholder="What needs to be done?"
          value={newTodo}
          onChangeText={setNewTodo}
          onSubmitEditing={handleAddTodo}
          placeholderTextColor={colors.textMuted}
          maxLength={MAX_TODO_LENGTH}
          editable={!isAdding}
          accessibilityLabel="Todo input"
          accessibilityHint="Enter a new todo item"
        />

        <TouchableOpacity
          onPress={handleAddTodo}
          activeOpacity={0.8}
          disabled={isDisabled}
          accessibilityLabel="Add todo"
          accessibilityRole="button"
          accessibilityState={{ disabled: isDisabled }}
          accessibilityHint="Tap to add the todo to your list"
        >
          <LinearGradient
            colors={
              !isDisabled ? colors.gradients.primary : colors.gradients.muted
            }
            style={[
              homeStyles.addButton,
              isDisabled && homeStyles.addButtonDisabled,
            ]}
          >
            {isAdding ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <Ionicons name="add" size={24} color="#ffffff" />
            )}
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TodoInput;
