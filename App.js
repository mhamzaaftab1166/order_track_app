import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import SalesmanNavigator from "./navigation/SalesmanNavigator";
import { CartProvider } from "./CartContext";
import DepartmentScreen from "./screens/DepartmentScreen";
import ProfileNavigator from "./navigation/admin/ProfileNavigator";
import SelectCategory from "./screens/SelectCategories";
import Categories from "./screens/Categories";
import RoleScreen from "./screens/RoleScreen";
import LoginNav from "./navigation/loginNav";

export default function App() {
  return (
    // <NavigationContainer>
    //   <LoginNav></LoginNav>
    // </NavigationContainer>

    // for admin
    <NavigationContainer>
      <ProfileNavigator />
    </NavigationContainer>

    //for salesman
    // <CartProvider>
    //   <NavigationContainer>
    //     <SalesmanNavigator />
    //   </NavigationContainer>
    // </CartProvider>
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
