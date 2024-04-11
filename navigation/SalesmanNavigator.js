import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
import React from "react";
import UserHomeScreen from "../screens/salesman/UserHomeScreen";
import HomeScreen from "../screens/HomeScreen";

const SalesmanNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="userhome" component={UserHomeScreen} />
      <Stack.Screen name="profile" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default SalesmanNavigator;
