import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import * as Yup from "yup";
import AppFormField from "../components/forms/AppFormField";
import SubmitButton from "../components/forms/SubmitButton";
import AppForm from "../components/forms/AppForm";
import AppErrorMessage from "../components/forms/AppErrorMessage";
import colors from "../config/colors";
import AppText from "../components/AppText";
import AppFormPicker from "../components/forms/AppFormPicker";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  category: Yup.object().required().label("Category"),
  price: Yup.number().required().positive().label("Price"),
  sizes: Yup.object().shape({
    small: Yup.number().required().positive().label("Small"),
    medium: Yup.number().required().positive().label("Medium"),
    large: Yup.number().required().positive().label("Large"),
  }),
  color: Yup.string().required().label("Color"),
  imageUrl: Yup.string().required().label("Image URL"),
});

function AddProduct({ navigation }) {
  const [error, setError] = useState();
  const [errorVisible, setErrorVisible] = useState(false);

  const handleSubmit = async (productData) => {
    console.log(productData);
    // Send productData to backend API endpoint for creating a product
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
              name: "",
              category: "",
              price: "",
              sizes: { small: "", medium: "", large: "" },
              color: "",
              imageUrl: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <AppErrorMessage error={error} visible={errorVisible} />
            <AppFormField
              name="name"
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
              name="price"
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Price"
            />
            <AppFormField
              name="sizes.small"
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Small Quantity"
            />
            <AppFormField
              name="sizes.medium"
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Medium Quantity"
            />
            <AppFormField
              name="sizes.large"
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Large Quantity"
            />
            <AppFormField
              name="color"
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Color"
            />
            <AppFormField
              name="imageUrl"
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Image URL"
            />
            <SubmitButton title="Submit" />
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
});

export default AddProduct;
