import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AdminNavigator from "./navigation/admin/AdminNavigator";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./screens/LoginScreen";
import AddSalesman from "./screens/AddSalesman";
import AddProduct from "./screens/AddProduct";
import DepartmentScreen from "./screens/DepartmentScreen";

export default function App() {
  return (
    <NavigationContainer>
      <AdminNavigator />
    </NavigationContainer>

    // <LoginScreen />

    // <AddSalesman></AddSalesman>

    // <AddProduct />

    // <DepartmentScreen />
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
