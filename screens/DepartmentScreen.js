import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import * as Yup from "yup";
import AppFormField from "../components/forms/AppFormField";
import SubmitButton from "../components/forms/SubmitButton";
import AppForm from "../components/forms/AppForm";
import AppErrorMessage from "../components/forms/AppErrorMessage";
import colors from "../config/colors";
import AppText from "../components/AppText";
import SafeScreen from "../components/SafeScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const validationSchema = Yup.object().shape({
  department: Yup.string().required().label("Department"),
});

function DepartmentScreen({ navigation }) {
  const [error, setError] = useState();
  const [errorVisible, setErrorVisible] = useState(false);
  const [departments, setDepartments] = useState([
    "Department 1",
    "Department 2",
    "Department 3",
  ]); // Dummy data

  const handleSubmit = async (values) => {
    if (!validationSchema.isValidSync(values)) {
      setError("Invalid department name");
      setErrorVisible(true);
      return;
    }
    setDepartments((prevDepartments) => [
      ...prevDepartments,
      values.department,
    ]);
    console.log(values);
  };

  return (
    <SafeScreen style={{ paddingTop: 50 }}>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <View style={styles.logoContainer}>
            <AppText style={styles.logo}>Departments</AppText>
            <AppText style={styles.subText}>
              All details related to departments
            </AppText>
          </View>
          <View style={styles.formContainer}>
            <AppForm
              initialValues={{ department: "" }}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              <AppErrorMessage error={error} visible={errorVisible} />
              <AppFormField
                name={"department"}
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Select Department"
              />
              <SubmitButton title={"Submit"} />
            </AppForm>
          </View>
          <View style={{ marginTop: 60 }}>
            <AppText style={{ fontSize: 26, fontWeight: "bold" }}>
              Add Departments
            </AppText>
          </View>
          <View style={{ marginVertical: 20 }}>
            {departments.map((department, index) => (
              <View key={index} style={styles.departmentContainer}>
                <AppText style={styles.departmentText}>{department}</AppText>
                <MaterialCommunityIcons
                  name="comment-edit"
                  size={24}
                  color={colors.primary}
                />
                <MaterialCommunityIcons
                  name="delete"
                  size={24}
                  color={colors.primary}
                  style={styles.icon}
                />
              </View>
            ))}
          </View>
        </View>
      </View>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
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
  departmentContainer: {
    backgroundColor: colors.light,
    width: "100%",
    height: 70,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 10,
  },
  departmentText: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 10,
    flex: 1,
  },
  icon: {
    marginHorizontal: 10,
  },
});

export default DepartmentScreen;
