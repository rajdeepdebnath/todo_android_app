import { Button, Text, View, StyleSheet } from "react-native";
import TodoList from "../components/TodoList";

const Home = ({ navigation }) => {
  const addNewTodo = () => {
    navigation.navigate("createEditTodo");
  };

  return (
    <View style={styles.container}>
      <TodoList></TodoList>
      <View style={styles.buttonContainer}>
        <Button title="Add new Todo" onPress={addNewTodo}></Button>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "yellow",
  },
  buttonContainer: {
    height: 60,
    justifyContent: "center",
    margin: 10,
  },
});
