import React, { useState } from "react";
import { StyleSheet, View, ScrollView, Alert } from "react-native";
import colors from "../config/colors";
import AppText from "../components/AppText";
import SafeScreen from "../components/SafeScreen";
import AppTextInput from "../components/AppTextInput";
import AppButton from "../components/AppButton";
import { saveCategory } from "../utilty/catUtility";

function SelectCategory({ navigation, route }) {
  const [level1Category, setLevel1Category] = useState("");
  const [level2Category, setLevel2Category] = useState("");
  const [isEmptyError, setIsEmptyError] = useState(false);

  const { subcategory } = route?.params;
  console.log(subcategory);
  const handleSubmit = async () => {
    if (level1Category && level2Category) {
      const category = {
        mainCategory: level1Category,
        subCategory: level2Category,
      };
      console.log(category);
      try {
        await saveCategory(category);
        // If successful, navigate to another screen or perform other actions
        Alert.alert("Success", "Category saved successfully!");
        navigation.navigate("categories");
      } catch (error) {
        if (error && error.response && error.response.status === 400) {
          // Display the error message from the backend
          Alert.alert("Error", error.response.data);
        } else {
          // Handle other types of errors
          Alert.alert("Error", "Failed to save category. Please try again.");
          console.error("Error saving category:", error);
        }
      }
    } else {
      setIsEmptyError(true);
      Alert.alert("Error", "Please fill in both category fields.");
    }
  };

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
            <AppTextInput
              placeholder={"Level 1 Category"}
              onChangeText={(text) => {
                setLevel1Category(text);
                setIsEmptyError(false);
              }}
            />
          </View>
          <View style={{ marginVertical: 8 }}>
            <AppText style={{ fontSize: 18 }}>Category No. 2</AppText>
            <AppTextInput
              placeholder={"Level 2 Category"}
              onChangeText={(text) => {
                setLevel2Category(text);
                setIsEmptyError(false);
              }}
            />
          </View>
        </View>
        {isEmptyError && (
          <AppText style={styles.errorText}>
            Please fill in both fields.
          </AppText>
        )}
        <AppButton
          style={{ width: "80%" }}
          title={"Done"}
          onPress={handleSubmit}
        />
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
  errorText: {
    color: "red",
    fontSize: 16,
    marginBottom: 10,
  },
});

export default SelectCategory;
