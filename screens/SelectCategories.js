import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import colors from "../config/colors";
import AppText from "../components/AppText";
import SafeScreen from "../components/SafeScreen";
import AppTextInput from "../components/AppTextInput";
import AppButton from "../components/AppButton";

function SelectCategory() {
  return (
    <SafeScreen style={{ paddingTop: 50 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={[styles.innerContainer, { marginVertical: 10 }]}>
          <View style={styles.logoContainer}>
            <AppText style={styles.logo}>Defining Category</AppText>
            <AppText style={styles.subText}>
              All details related to category
            </AppText>
          </View>
          <View style={{ marginVertical: 8 }}>
            <AppText style={{ fontSize: 18 }}>Category No. 1</AppText>
            <AppTextInput placeholder={"Level 1 Category"} />
          </View>
          <View style={{ marginVertical: 8 }}>
            <AppText style={{ fontSize: 18 }}>Category No. 2</AppText>
            <AppTextInput placeholder={"Level 2 Category"} />
          </View>
          <View style={{ marginVertical: 8 }}>
            <AppText style={{ fontSize: 18 }}>Category No. 3</AppText>
            <AppTextInput placeholder={"Level 3 Category"} />
          </View>
        </View>
        <AppButton style={{ width: "80%" }} title={"Done"} />
      </ScrollView>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  cat: {
    backgroundColor: colors.primary,
    width: "100%",
    height: 50,
    padding: 12,
    borderRadius: 12,
    justifyContent: "center",
    marginVertical: 7,
  },
  categoryContainer: {
    backgroundColor: colors.light,
    width: "90%",
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 10,
    padding: 12,
  },
  container: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingBottom: 20,
  },
  category: {
    backgroundColor: colors.primary,
    width: "85%",
    height: 80,
    borderRadius: 10,
    justifyContent: "center",
    padding: 12,
    marginTop: 20,
  },
  categoryText: {
    color: colors.white,
    fontWeight: "bold",
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
});

export default SelectCategory;
