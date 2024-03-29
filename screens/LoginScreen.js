import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Yup from "yup";
import AppFormField from "../components/forms/AppFormField";
import SubmitButton from "../components/forms/SubmitButton";
import AppForm from "../components/forms/AppForm";
import AppErrorMessage from "../components/forms/AppErrorMessage";
import { TouchableOpacity } from "react-native";
import colors from "../config/colors";
import AppText from "../components/AppText";

const validationSchema = Yup.object({
  id: Yup.string().required().label("ID"),
  password: Yup.string().required().min(4).label("Password"),
});

function LoginScreen({ navigation }) {
  const [error, setError] = useState();
  const [errorVisible, setErrorVisible] = useState(false);

  const handleSubmit = async (info) => {
    console.log(info);
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.logoContainer}>
          <AppText style={styles.logo}>Admin (Log in)</AppText>
          <AppText style={styles.subText}>Log in to proceed further</AppText>
        </View>
        <View style={styles.formContainer}>
          <AppForm
            initialValues={{ id: "", password: "" }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <AppErrorMessage error={error} visible={errorVisible} />
            <AppFormField
              name={"id"} // Changed "ID" to "id"
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="ID"
            />
            <AppFormField
              name={"password"}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Password"
              secureTextEntry
              textContentType="password"
            />
            <TouchableOpacity
              onPress={() => null}
              style={{ alignItems: "flex-end", paddingVertical: 5 }}
            >
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
            <SubmitButton title={"Login"} />
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
  forgotPasswordText: {
    color: colors.primary,
    textAlign: "center",
    fontSize: 16,
    marginTop: 10,
    textDecorationLine: "underline",
    alignItems: "flex-end",
  },
});

export default LoginScreen;
