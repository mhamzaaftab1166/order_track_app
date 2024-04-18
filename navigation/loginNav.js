import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
import React from "react";
import LoginScreen from "../screens/LoginScreen";
import RoleScreen from "../screens/RoleScreen";
import AdminLoginScreen from "../screens/AdminLoginScreen";

const LoginNav = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="role" component={RoleScreen} />
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name="adminlogin" component={AdminLoginScreen} />
    </Stack.Navigator>
  );
};

export default LoginNav;
