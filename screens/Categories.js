import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import colors from "../config/colors";
import AppText from "../components/AppText";
import SafeScreen from "../components/SafeScreen";
import { AntDesign } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

function Category() {
  return (
    <SafeScreen style={{ paddingTop: 50 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.innerContainer}>
          <View style={styles.logoContainer}>
            <AppText style={styles.logo}>Define Category</AppText>
            <AppText style={styles.subText}>
              Define Categories of products
            </AppText>
          </View>
        </View>
        <View style={styles.category}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ flex: 1 }}>
              <AppText style={styles.categoryText}>
                Define a new Category
              </AppText>
            </View>
            <AntDesign name="arrowright" size={22} color="white" />
          </View>
        </View>

        <View
          style={{
            marginTop: 30,
            alignSelf: "flex-start",
            paddingHorizontal: 20,
          }}
        >
          <AppText style={{ fontSize: 26, fontWeight: "bold" }}>
            Added Categories
          </AppText>
        </View>
        <View style={{ width: "90%" }}>
          <View
            style={[
              styles.cat,
              {
                flexDirection: "row",
                justifyContent: "space-between",
              },
            ]}
          >
            <AppText
              style={{
                fontWeight: "bold",
                color: colors.white,
              }}
            >
              Category 1
            </AppText>
            <View style={{ flexDirection: "row", marginHorizontal: 4 }}>
              <Feather
                name="edit"
                size={24}
                color="black"
                style={{ marginRight: 10 }}
              />
              <Octicons name="download" size={24} color="white" />
            </View>
          </View>
          <View style={[styles.cat, { width: "80%", alignSelf: "flex-end" }]}>
            <AppText style={{ fontWeight: "bold", color: colors.white }}>
              Sub Category
            </AppText>
          </View>
          <View style={[styles.cat, { width: "65%", alignSelf: "flex-end" }]}>
            <AppText style={{ fontWeight: "bold", color: colors.white }}>
              Further Category
            </AppText>
          </View>
        </View>
        <View style={{ marginVertical: 10 }}></View>
        <View style={styles.categoryContainer}>
          <AppText style={{ fontWeight: "bold" }}>Category 2</AppText>
        </View>
        <View style={styles.categoryContainer}>
          <AppText style={{ fontWeight: "bold" }}>Category 3</AppText>
        </View>
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

export default Category;
