import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { TodoContext } from "../../TodoContext";

const TodoList = () => {
  const { allTodos } = useContext(TodoContext);
  const navigation = useNavigation();

  const handleTodoItemPress = (id) => {
    navigation.navigate("createEditTodo", {
      id,
    });
  };

  return (
    <View style={styles.container}>
      <Text>Todo list</Text>
      {allTodos.map((t) => {
        return (
          <Pressable key={t.id} onPress={handleTodoItemPress.bind(null, t.id)}>
            <Text>{t.title}</Text>
          </Pressable>
        );
      })}
    </View>
  );
};

export default TodoList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
