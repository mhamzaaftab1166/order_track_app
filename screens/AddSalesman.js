import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import * as Yup from "yup";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppFormField from "../components/forms/AppFormField";
import SubmitButton from "../components/forms/SubmitButton";
import AppForm from "../components/forms/AppForm";
import AppErrorMessage from "../components/forms/AppErrorMessage";
import colors from "../config/colors";
import AppText from "../components/AppText";

const validationSchema = Yup.object().shape({
  Name: Yup.string().required().label("Name"),
  Cnic: Yup.string().required().label("CNIC"),
  Phone: Yup.string().required().label("Phone"),
  Address: Yup.string().required().label("Address"),
  password: Yup.string().required().min(4).label("Password"),
});

function AddSalesman({ navigation }) {
  const [error, setError] = useState();
  const [errorVisible, setErrorVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (info) => {
    console.log(info);
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.logoContainer}>
          <AppText style={styles.logo}>Add Salesman</AppText>
          <AppText style={styles.subText}>
            Provide the details to add a new salesman
          </AppText>
        </View>
        <View style={styles.formContainer}>
          <AppForm
            initialValues={{
              Name: "",
              Cnic: "",
              Phone: "",
              Address: "",
              password: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <AppErrorMessage error={error} visible={errorVisible} />
            <AppFormField
              name={"Name"}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Enter name"
            />
            <AppFormField
              name={"Cnic"}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="CNIC"
            />
            <AppFormField
              name={"Phone"}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Enter phone"
            />
            <AppFormField
              name={"Address"}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Enter address"
            />
            <View style={styles.passwordContainer}>
              <View style={{ flex: 1 }}>
                <AppFormField
                  name={"password"}
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder="Password"
                  secureTextEntry={!showPassword}
                  textContentType="password"
                />
              </View>
              <TouchableOpacity
                onPress={() => setShowPassword((prev) => !prev)}
                style={styles.eyeIcon}
              >
                <MaterialCommunityIcons
                  name={showPassword ? "eye-off" : "eye"}
                  size={24}
                  color={colors.medium}
                />
              </TouchableOpacity>
            </View>
            <SubmitButton title={"Done"} />
          </AppForm>
        </View>
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
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 5,
  },
  eyeIcon: {
    position: "absolute",
    right: 3,
  },
});

export default AddSalesman;
