import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import colors from "../../config/colors";
import AppText from "../../components/AppText";
import { Fontisto } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { BarChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width * 0.8;

const chartConfig = {
  backgroundGradientFrom: colors.danger,
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: colors.danger,
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(50, 50, 50, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};
const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
    },
  ],
};

const UserHomeScreen = ({ navigation }) => {
  const handleSettingsPress = () => {
    // Handle settings press logic here
    navigation.navigate("profile");
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.settingsButton}
        onPress={handleSettingsPress}
      >
        <MaterialIcons name="settings" size={24} color="black" />
      </TouchableOpacity>
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
          <AppText style={{ fontWeight: "bold" }}>Total Sales(pkr)</AppText>
          <AppText style={{ color: colors.medium }}>20000</AppText>
        </View>
        <Octicons
          name="graph"
          style={{ alignSelf: "flex-end" }}
          size={40}
          color="#A766F9"
        />
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
              Assigned Products
            </AppText>
            <AppText
              style={{ color: colors.black, fontWeight: "bold", fontSize: 24 }}
            >
              6
            </AppText>
          </View>
          <Entypo
            name="arrow-bold-right"
            style={{ alignSelf: "flex-end" }}
            size={40}
            color="black"
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
            <AppText style={{ color: colors.medium }}>
              View Your Past Sale
            </AppText>
          </View>
          <Octicons
            name="history"
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
              Sell Your Products
            </AppText>
          </View>
          <Entypo
            name="arrow-bold-right"
            style={{ alignSelf: "flex-end" }}
            size={40}
            color="black"
          />
        </View>
      </View>
      <BarChart
        // style={graphStyle}
        data={data}
        width={screenWidth}
        height={200}
        yAxisLabel="%"
        chartConfig={chartConfig}
        verticalLabelRotation={30}
      />
    </View>
  );
};

export default UserHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  settingsButton: {
    position: "absolute",
    top: 40,
    right: 20,
    padding: 10,
    zIndex: 1,
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
