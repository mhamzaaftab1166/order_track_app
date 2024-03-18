import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
import React from "react";
import HomeScreen from "../../screens/HomeScreen";
import AddSalesman from "../../screens/AddSalesman";
import ProfileScreen from "../../screens/ProfileScreen";
import AddProduct from "../../screens/AddProduct";
import Addedalesman from "../../screens/Addedalesman";

const ProfileNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="profiles" component={ProfileScreen} />
      <Stack.Screen name="addsaleman" component={AddSalesman} />
      <Stack.Screen name="addproduct" component={AddProduct} />
      <Stack.Screen name="addedsalesman" component={Addedalesman} />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
