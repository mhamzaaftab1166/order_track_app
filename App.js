import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import SalesmanNavigator from "./navigation/SalesmanNavigator";
import { CartProvider } from "./CartContext";
import DepartmentScreen from "./screens/DepartmentScreen";
import ProfileNavigator from "./navigation/admin/ProfileNavigator";
import SelectCategory from "./screens/SelectCategories";
import Categories from "./screens/Categories";

export default function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        {/* <SalesmanNavigator /> */}
        <ProfileNavigator />
      </NavigationContainer>
    </CartProvider>

    // <LoginScreen />

    // <AddSalesman></AddSalesman>

    // <AddProduct />

    // <DepartmentScreen />

    // <Categories />

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
