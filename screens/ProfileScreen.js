import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import SafeScreen from "../components/SafeScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const ProfileScreen = ({ navigation }) => {
  return (
    <SafeScreen style={styles.background}>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <View style={{ alignItems: "flex-start", marginBottom: 25 }}>
            <Text style={{ fontWeight: "bold", fontSize: 27 }}>
              Admin Panel
            </Text>
            <Text
              style={{ fontWeight: "bold", fontSize: 14, color: "#6e6969" }}
            >
              Select Any Option Below
            </Text>
          </View>
          <View style={styles.row}>
            <View
              style={{
                backgroundColor: "#fc5c65",
                width: 170,
                height: 300,
                borderRadius: 10,
                justifyContent: "space-between",
                padding: 8,
              }}
            >
              <View>
                <Text style={styles.text1}>Total Orders</Text>
                <Text style={styles.text2}>10069</Text>
              </View>
              <View>
                <Text style={styles.text1}>Total Saless</Text>
                <Text style={styles.text2}>10069</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{ color: "white", fontSize: 14, fontWeight: "bold" }}
                >
                  More Details
                </Text>
                <AntDesign name="arrowright" size={20} color="white" />
              </View>
            </View>
            <View style={styles.column}>
              <View style={styles.row}>
                <View
                  style={{
                    backgroundColor: "#FFDB58",
                    height: 145,
                    borderRadius: 10,
                    padding: 8,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    width: 135,
                  }}
                >
                  <Text style={styles.text1}>Manage Products</Text>
                  <AntDesign name="arrowright" size={20} color="white" />
                </View>
              </View>
              <View style={styles.row}>
                <View
                  style={{
                    backgroundColor: "#00BFFF",
                    height: 145,
                    borderRadius: 10,
                    padding: 8,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    width: 135,
                  }}
                >
                  <Text style={styles.text1}>Manage Salesman</Text>
                  <AntDesign name="arrowright" size={20} color="white" />
                </View>
              </View>
            </View>
          </View>
          <Text style={{ color: "#6e6969", fontSize: 18, fontWeight: "bold" }}>
            Frame
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate("addsaleman")}
              style={{
                width: 100,
                height: 90,
                alignItems: "center",
                marginVertical: 10,
                backgroundColor: "#f8f4f4",
                justifyContent: "space-around",
                borderRadius: 10,
                padding: 5,
              }}
            >
              <MaterialIcons name="man" size={30} color="#fc5c65" />
              <Text>Add Salesman</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("addproduct")}
              style={{
                width: 100,
                height: 90,
                alignItems: "center",
                marginVertical: 10,
                backgroundColor: "#f8f4f4",
                justifyContent: "space-around",
                borderRadius: 10,
                padding: 5,
              }}
            >
              <MaterialIcons
                name="production-quantity-limits"
                size={24}
                color="#fc5c65"
              />
              <Text>Add Product</Text>
            </TouchableOpacity>
            <View
              style={{
                width: 100,
                height: 90,
                alignItems: "center",
                marginVertical: 10,
                backgroundColor: "#f8f4f4",
                justifyContent: "space-around",
                borderRadius: 10,
                padding: 5,
              }}
            >
              <MaterialIcons name="category" size={24} color="#fc5c65" />
              <Text>Categories</Text>
            </View>
          </View>
          <Text style={{ color: "black", fontSize: 18, fontWeight: "bold" }}>
            More Options
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View
              style={{
                width: 100,
                height: 90,
                alignItems: "center",
                marginVertical: 10,
                backgroundColor: "#f8f4f4",
                justifyContent: "space-around",
                borderRadius: 10,
                padding: 5,
              }}
            >
              <MaterialIcons name="maps-home-work" size={24} color="black" />
              <Text>Departments</Text>
            </View>
            <View
              style={{
                width: 100,
                height: 90,
                alignItems: "center",
                marginVertical: 10,
                backgroundColor: "#f8f4f4",
                justifyContent: "space-around",
                borderRadius: 10,
                padding: 5,
              }}
            >
              <Ionicons name="filter-outline" size={24} color="black" />
              <Text>Filter Product</Text>
            </View>
            <View
              style={{
                width: 100,
                height: 90,
                alignItems: "center",
                marginVertical: 10,
                backgroundColor: "#f8f4f4",
                justifyContent: "space-around",
                borderRadius: 10,
                padding: 5,
              }}
            >
              <FontAwesome name="search" size={24} color="black" />
              <Text style={{ alignContent: "center", textAlign: "center" }}>
                Search Salesman
              </Text>
            </View>
          </View>
        </View>
      </View>
    </SafeScreen>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#f8f4f4",
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text1: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  text2: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
  },
  innerContainer: {
    width: "90%",
    height: "95%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  column: {
    justifyContent: "space-between",
  },
});

export default ProfileScreen;
