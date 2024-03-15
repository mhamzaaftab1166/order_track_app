import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import HomeScreen from "../../screens/HomeScreen";
import ChatScreen from "../../screens/ChatScreen";
import ProfileScreen from "../../screens/ProfileScreen";
import ProfileNavigator from "./ProfileNavigator";

const Tab = createBottomTabNavigator();
const AdminNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        style: {
          bottom: 3,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons
              name="home-alert-outline"
              color={color}
              size={size}
            />
          ),
        }}
        name="home"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons
              name="chat-processing-outline"
              color={color}
              size={size}
            />
          ),
        }}
        name="chat"
        component={ChatScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
        name="profile"
        component={ProfileNavigator}
      />
    </Tab.Navigator>
  );
};
export default AdminNavigator;
