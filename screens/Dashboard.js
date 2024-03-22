import React from "react";
import { StyleSheet, View } from "react-native";
import colors from "../config/colors";
import AppText from "../components/AppText";
import { Fontisto } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

function Dashboard({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.logoContainer}>
          <AppText style={styles.logo}>Dashboard</AppText>
          <AppText style={styles.subText}>
            Here Is All Data Visualization
          </AppText>
        </View>
      </View>
      <View style={{ flexDirection: "row", marginVertical: 10 }}>
        <View
          style={{
            backgroundColor: colors.white,
            width: "40%",
            height: 155,
            borderRadius: 10,
            alignItems: "center",
            padding: 10,
            justifyContent: "space-between",
            elevation: 6,
          }}
        >
          <View style={{ alignItems: "center" }}>
            <AppText style={{ color: colors.medium }}>Total Orders</AppText>
            <AppText
              style={{ color: colors.black, fontWeight: "bold", fontSize: 24 }}
            >
              10069
            </AppText>
          </View>
          <Fontisto
            style={{ alignSelf: "flex-end" }}
            name="shopping-basket-add"
            size={40}
            color="#F9B466"
          />
        </View>
        <View
          style={{
            backgroundColor: colors.white,
            width: "40%",
            height: 155,
            borderRadius: 10,
            alignItems: "center",
            padding: 10,
            justifyContent: "space-between",
            marginHorizontal: 15,
            elevation: 6,
          }}
        >
          <View style={{ alignItems: "center" }}>
            <AppText
              style={{
                color: colors.medium,
                fontSize: 20,
              }}
            >
              Total Products
            </AppText>
            <AppText
              style={{ color: colors.black, fontWeight: "bold", fontSize: 24 }}
            >
              69
            </AppText>
          </View>
          <FontAwesome6
            style={{ alignSelf: "flex-end" }}
            size={40}
            color="#E9F966"
            name="clock-rotate-left"
          />
        </View>
      </View>
      <View
        style={{ flexDirection: "row", marginVertical: 10, marginBottom: 18 }}
      >
        <View
          style={{
            backgroundColor: colors.white,
            width: "40%",
            height: 155,
            borderRadius: 10,
            alignItems: "center",
            padding: 10,
            justifyContent: "space-between",
            elevation: 6,
          }}
        >
          <View style={{ alignItems: "center" }}>
            <AppText style={{ color: colors.medium }}>Total Salesman</AppText>
            <AppText
              style={{ color: colors.black, fontWeight: "bold", fontSize: 24 }}
            >
              169
            </AppText>
          </View>
          <AntDesign
            name="team"
            style={{ alignSelf: "flex-end" }}
            size={40}
            color="#46EB8E"
          />
        </View>
        <View
          style={{
            backgroundColor: colors.white,
            width: "40%",
            height: 155,
            borderRadius: 10,
            alignItems: "center",
            padding: 10,
            justifyContent: "space-between",
            marginHorizontal: 15,
            elevation: 6,
          }}
        >
          <View style={{ alignItems: "center" }}>
            <AppText
              style={{
                color: colors.medium,
                fontSize: 20,
              }}
            >
              Total Sales
            </AppText>
            <AppText
              style={{ color: colors.black, fontWeight: "bold", fontSize: 24 }}
            >
              69696
            </AppText>
          </View>
          <Octicons
            name="graph"
            style={{ alignSelf: "flex-end" }}
            size={40}
            color="#A766F9"
          />
        </View>
      </View>
      <View
        style={{
          width: "85%",
          backgroundColor: colors.white,
          height: 130,
          borderRadius: 15,
          alignItems: "flex-start",
          padding: 10,
          justifyContent: "space-between",
          elevation: 6,
        }}
      >
        <View>
          <AppText style={{ fontWeight: "bold" }}>
            Trending Product (top sale)
          </AppText>
          <AppText style={{ color: colors.medium }}>My Shirt</AppText>
        </View>
        <MaterialIcons
          name="local-fire-department"
          size={40}
          color="orange"
          style={{ alignSelf: "flex-end" }}
        />
      </View>
      <View
        style={{
          width: "85%",
          backgroundColor: colors.white,
          height: 130,
          borderRadius: 15,
          alignItems: "flex-start",
          padding: 10,
          justifyContent: "space-between",
          elevation: 6,
          marginTop: 15,
        }}
      >
        <View>
          <AppText style={{ fontWeight: "bold" }}>
            Digressive Product (lowest sale)
          </AppText>
          <AppText style={{ color: colors.medium }}>Denim Jeans</AppText>
        </View>
        <MaterialIcons
          name="fmd-bad"
          size={40}
          color={colors.danger}
          style={{ alignSelf: "flex-end" }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    width: "80%",
  },
  logoContainer: {
    marginBottom: 20,
    alignItems: "flex-start",
  },
  logo: {
    color: colors.dark,
    fontSize: 35,
    fontWeight: "bold",
  },
  subText: {
    color: colors.medium,
    fontSize: 16,
    textAlign: "center",
  },
  formContainer: {
    marginTop: 20,
  },
  forgotPasswordText: {
    color: colors.primary,
    textAlign: "center",
    fontSize: 16,
    marginTop: 10,
    textDecorationLine: "underline",
    alignItems: "flex-end",
  },
});

export default Dashboard;
