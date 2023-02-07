import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/screens/Home";
import TodoContextProvider from "./TodoContext";
import CreateEditTodo from "./src/screens/CreateEditTodo";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <TodoContextProvider>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="home"
            component={Home}
            options={{ title: "Quick Todo" }}
          />
          <Stack.Screen
            name="createEditTodo"
            component={CreateEditTodo}
            options={{ title: "Create Todo" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </TodoContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
