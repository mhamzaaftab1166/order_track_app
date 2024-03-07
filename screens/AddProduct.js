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
import AppFormPicker from "../components/forms/AppFormPicker";

const validationSchema = Yup.object().shape({
  Name: Yup.string().required().label("Name"),
  category: Yup.string().required().label("Category"),
  Price: Yup.number().required().positive().label("Price"),
  Department: Yup.string().required().label("Department"),
  ID: Yup.string().required().label("Product ID"),
  Size: Yup.string().required().label("Size"),
  Color: Yup.string().required().label("Color"),
});

function AddProduct({ navigation }) {
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
          <AppText style={styles.logo}>Add Product</AppText>
          <AppText style={styles.subText}>
            Provide the details to add a new product
          </AppText>
        </View>
        <View style={styles.formContainer}>
          <AppForm
            initialValues={{
              Name: "",
              category: "",
              Price: "",
              Department: "",
              ID: "",
              Size: "",
              Color: "",
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
            <AppFormPicker
              items={[
                { label: "clothing", value: 1 },
                { label: "apparel", value: 2 },
              ]}
              name={"category"}
              placeholder={"Category"}
              width={"98%"}
            />
            <AppFormField
              name={"Price"}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Price"
            />
            <AppFormField
              name={"Department"}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Select a department"
            />
            <AppFormField
              name={"ID"}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Enter product ID"
            />
            <AppFormField
              name={"Size"}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Size"
            />
            <AppFormField
              name={"Color"}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Color"
            />
            <SubmitButton title={"Upload an image"} />
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

export default AddProduct;
