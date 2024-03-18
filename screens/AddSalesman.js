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
import { saveSalesman } from "../utilty/salesmanUtility";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  cnic: Yup.string().required().label("CNIC"),
  phone: Yup.string().required().label("Phone"),
  email: Yup.string().required().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function AddSalesman({ navigation, route }) {
  const [error, setError] = useState();
  const [errorVisible, setErrorVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { salesman } = route.params;

  const handleSubmit = async (info) => {
    try {
      if (salesman) {
        // Include _id only if salesman exists
        info._id = salesman._id;
      }
      await saveSalesman(info);
      if (info._id) {
        navigation.navigate("addedsalesman");
      } else {
        navigation.navigate("profiles");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError(error.response.data);
        setErrorVisible(true);
      }
    }
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
              name: salesman ? salesman.name : "",
              cnic: salesman ? salesman.cnic : "",
              phone: salesman ? salesman.phone : "",
              email: salesman ? salesman.email : "",
              password: salesman ? salesman.password : "",
            }}
            onSubmit={handleSubmit} // Make sure handleSubmit is passed here
            validationSchema={validationSchema}
          >
            <AppErrorMessage error={error} visible={errorVisible} />
            <AppFormField
              name={"name"}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Enter name"
            />
            <AppFormField
              name={"cnic"}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="CNIC"
            />
            <AppFormField
              name={"phone"}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Enter phone"
            />
            <AppFormField
              name={"email"}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Enter email address"
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
