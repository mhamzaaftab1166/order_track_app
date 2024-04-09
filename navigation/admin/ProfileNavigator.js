import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
import React from "react";
import HomeScreen from "../../screens/HomeScreen";
import AddSalesman from "../../screens/AddSalesman";
import ProfileScreen from "../../screens/ProfileScreen";
import AddProduct from "../../screens/AddProduct";
import Addedalesman from "../../screens/Addedalesman";
import AddedProducts from "../../screens/AddedProducts";
import Dashboard from "../../screens/Dashboard";
import Allocation from "../../screens/Allocation";
import AllocateForm from "../../screens/AllocateForm";

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
      <Stack.Screen name="addedproducts" component={AddedProducts} />
      <Stack.Screen name="dashboard" component={Dashboard} />
      <Stack.Screen name="allocation" component={Allocation} />
      <Stack.Screen name="allocationfrom" component={AllocateForm} />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
