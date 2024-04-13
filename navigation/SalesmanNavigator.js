import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
import React from "react";
import UserHomeScreen from "../screens/salesman/UserHomeScreen";
import HomeScreen from "../screens/HomeScreen";
import ProductsList from "../screens/salesman/ProductsList";
import ProductListDetail from "../screens/salesman/ProductListDetail";
import CartScreen from "../screens/salesman/CartScreen";

const SalesmanNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="userhome" component={UserHomeScreen} />
      <Stack.Screen name="profile" component={HomeScreen} />
      <Stack.Screen name="list" component={ProductsList} />
      <Stack.Screen name="cart" component={CartScreen} />
      <Stack.Screen name="listdetail" component={ProductListDetail} />
    </Stack.Navigator>
  );
};

export default SalesmanNavigator;
