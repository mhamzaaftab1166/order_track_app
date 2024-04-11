import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AdminNavigator from "./navigation/admin/AdminNavigator";
import { NavigationContainer } from "@react-navigation/native";
import SalesmanNavigator from "./navigation/SalesmanNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <SalesmanNavigator />
    </NavigationContainer>

    // <LoginScreen />

    // <AddSalesman></AddSalesman>

    // <AddProduct />

    // <DepartmentScreen />

    // <Category />

    // <SelectCategory />

    // <ProductList />
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
