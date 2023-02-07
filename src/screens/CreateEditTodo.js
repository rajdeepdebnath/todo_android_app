import {
  useState,
  useContext,
  useLayoutEffect,
  useCallback,
  useEffect,
} from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Button,
  TextInput,
  Alert,
} from "react-native";
import TodoItem from "../components/TodoItem";
import uuid from "react-native-uuid";
import { TodoContext } from "../../TodoContext";

const CreateEditTodo = ({ navigation, route }) => {
  const { allTodos, saveTodo } = useContext(TodoContext);
  const [todoTitle, setTodoTitle] = useState("");
  const [todoItems, setTodoItems] = useState([]);

  useLayoutEffect(() => {
    if (route.params?.id) {
      const todo = allTodos.find((t) => t.id === route.params.id);
      setTodoTitle(todo.title);
      setTodoItems(todo.todoItems);
    }
  }, [route.params?.id]);

  const addNewTodoItem = () => {
    const anyEmptyTodos = todoItems.find((t) => !t.text);
    if (!anyEmptyTodos) {
      setTodoItems((p) => [
        ...p,
        { id: uuid.v4(), text: null, completed: false },
      ]);
    } else {
      Alert.alert("Empty todo items", "Please fill in the Empty todo text.");
    }
  };

  const handleTodoItemDelete = (id) => {
    setTodoItems((p) => [...p.filter((todoItem) => todoItem.id !== id)]);
  };

  const handleItemText = useCallback(
    (id, text) => {
      if (id) {
        const item = todoItems.find((t) => t.id === id);
        item.text = text;
      }
    },
    [todoItems]
  );

  const handleItemCompleted = useCallback(
    (id, completed) => {
      if (id) {
        const item = todoItems.find((t) => t.id === id);
        item.completed = completed;
      }
    },
    [todoItems]
  );

  const handleSaveTodo = () => {
    if (todoTitle.trim().length === 0) {
      Alert.alert("Title missing", "Please enter Title for your todo");
      return;
    }

    // if (todoItems.find((t) => !t.text)) {
    //   Alert.alert("Item text missing", "Please enter text for your todo item");
    //   return;
    // }
    saveTodo(route.params?.id, todoTitle, todoItems);
    Alert.alert(
      "Success",
      `Todo ${todoTitle} is ${
        route.params?.id ? "saved" : "created"
      } successfully!`,
      [{ text: "OK", onPress: () => navigation.navigate("home") }]
    );
  };

  const handleCancel = () => {
    navigation.navigate("home");
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${route.params?.id ? "Edit" : "Create"} ${todoTitle}`,
    });
  }, [todoTitle]);

  return (
    <View style={styles.container}>
      <View style={styles.todoContainer}>
        <View style={styles.todoTitle}>
          <TextInput
            placeholder="Todo title"
            style={styles.textInputTodoTitle}
            onChangeText={setTodoTitle}
            value={todoTitle}
          ></TextInput>
        </View>
        <View style={styles.todoItem}>
          <View style={styles.todoItemScroll}>
            <ScrollView>
              {todoItems.map((t, idx) => (
                <TodoItem
                  key={t.id}
                  index={idx}
                  item={t}
                  handleItemCompleted={handleItemCompleted}
                  handleItemText={handleItemText}
                  handleTodoItemDelete={handleTodoItemDelete}
                ></TodoItem>
              ))}
            </ScrollView>
          </View>
          <View style={styles.addNewButton}>
            <Button title="Add new Todo item" onPress={addNewTodoItem}></Button>
          </View>
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <View>
          <Button title="Save" onPress={handleSaveTodo}></Button>
        </View>
        <View style={styles.buttonCancel}>
          <Button title="Cancel" onPress={handleCancel}></Button>
        </View>
      </View>
    </View>
  );
};

export default CreateEditTodo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#78d178",
  },
  todoContainer: {
    flex: 1,
  },
  todoTitle: {
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  todoItem: {
    flex: 1,
    padding: 10,
  },
  todoItemScroll: {
    flex: 1,
    borderBottomColor: "green",
    borderBottomWidth: 1,
  },
  addNewButton: {
    height: 60,
    marginTop: 20,
    alignItems: "center",
  },
  textInputTodoTitle: {
    height: 60,
    width: "90%",
    borderColor: "#fff",
    borderWidth: 1,
    fontSize: 18,
    padding: 5,
  },
  buttonsContainer: {
    height: 60,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderTopColor: "#bfc1bf",
    borderTopWidth: 1,
  },
  buttonCancel: {
    marginLeft: 10,
  },
});
