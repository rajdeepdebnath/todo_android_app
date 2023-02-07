import { TextInput, View, StyleSheet, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState } from "react";

const TodoItem = ({
  index,
  item,
  handleItemText,
  handleItemCompleted,
  handleTodoItemDelete,
}) => {
  const [itemText, setItemText] = useState(item.text);
  const [completed, setCompleted] = useState(item.completed);

  const handleDelete = () => {
    handleTodoItemDelete(item.id);
  };

  const handleTextChange = (text) => {
    setItemText(text);
  };

  const toggleStatus = () => {
    setCompleted(!completed);
  };

  useEffect(() => {
    return () => {
      handleItemText(item.id, itemText);
    };
  }, [item.id, handleItemText, itemText]);

  useEffect(() => {
    return () => {
      handleItemCompleted(item.id, completed);
    };
  }, [item.id, handleItemCompleted, completed]);

  return (
    <View style={styles.container}>
      <Text style={styles.index}>{index + 1}</Text>
      <Ionicons
        name={completed ? "checkbox" : "checkbox-outline"}
        size={32}
        color={completed ? "green" : "grey"}
        onPress={toggleStatus}
        style={styles.icon}
      />
      <TextInput
        onChangeText={handleTextChange}
        value={itemText}
        style={styles.inputText}
      ></TextInput>
      <Ionicons
        name="close-circle-outline"
        size={32}
        color="#9f6f6f"
        onPress={handleDelete}
        style={styles.icon}
      />
    </View>
  );
};

export default TodoItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    margin: 10,
    justifyContent: "center",
  },
  index: {
    fontSize: 20,
    color: "grey",
  },
  inputText: {
    flex: 1,
    height: 40,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
  },
  icon: {
    width: 40,
    marginHorizontal: 5,
  },
});
