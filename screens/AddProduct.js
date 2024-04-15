import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import * as Yup from "yup";
import AppFormField from "../components/forms/AppFormField";
import SubmitButton from "../components/forms/SubmitButton";
import AppForm from "../components/forms/AppForm";
import AppErrorMessage from "../components/forms/AppErrorMessage";
import colors from "../config/colors";
import AppText from "../components/AppText";
import AppFormPicker from "../components/forms/AppFormPicker";
import AppFormImagePicker from "../components/forms/AppFormImagePicker";
import SafeScreen from "../components/SafeScreen";
import { saveProduct } from "../utilty/ProductUtility";
import { getDepartments } from "../utilty/deptUtility";
import { getCategories } from "../utilty/catUtility";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  category: Yup.object().required().label("Category"),
  department: Yup.object().required().label("Department"),
  price: Yup.number().required().positive().label("Price"),
  sizes: Yup.object().shape({
    small: Yup.number().required().positive().label("Small"),
    medium: Yup.number().required().positive().label("Medium"),
    large: Yup.number().required().positive().label("Large"),
  }),
  color: Yup.array()
    .min(1, "At least one color is required")
    .of(Yup.string().required("colors is required")),
  imageUrl: Yup.array()
    .min(1, "Please select at least one image.")
    .max(3, "You can upload up to three images.")
    .of(Yup.string().required("Image URL is required")),
  description: Yup.string().required().max(200).label("Description"),
});

function AddProduct({ navigation }) {
  const [error, setError] = useState();
  const [errorVisible, setErrorVisible] = useState(false);
  const [colorFields, setColorFields] = useState([{ value: "" }]);
  const [categories, setCategories] = useState([]);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchCategoriesAndDepartments = async () => {
      try {
        const categoriesData = await getCategories();
        const departmentsData = await getDepartments();
        setCategories(categoriesData.data);
        setDepartments(departmentsData.data);
      } catch (error) {
        console.error("Error fetching categories and departments:", error);
      }
    };

    fetchCategoriesAndDepartments();
  }, []);

  const handleAddColorField = () => {
    setColorFields([...colorFields, { value: "" }]);
  };

  const handleColorChange = (index, color) => {
    const updatedColorFields = [...colorFields];
    updatedColorFields[index].value = color;
    setColorFields(updatedColorFields);
  };

  const handleRemoveColorField = async (index) => {
    const updatedColorFields = [...colorFields];
    updatedColorFields.splice(index, 1);
    setColorFields(updatedColorFields);
  };

  const handleSubmit = async (productData) => {
    try {
      const transformedData = {
        name: productData.name,
        category: productData.category.value,
        department: productData.department.value,
        price: parseFloat(productData.price),
        sizes: {
          small: parseInt(productData.sizes.small),
          medium: parseInt(productData.sizes.medium),
          large: parseInt(productData.sizes.large),
        },
        color: colorFields.map((colorField) => colorField.value),
        imageUrl: productData.imageUrl,
        description: productData.description,
      };
      await saveProduct(transformedData);
      navigation.navigate("profiles");
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <ScrollView>
      <SafeScreen>
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
                  department: "",
                  price: "",
                  sizes: { small: "", medium: "", large: "" },
                  color: "",
                  imageUrl: [],
                  description: "",
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
                  items={categories.map((cat) => ({
                    label: `${cat.mainCategory} / ${cat.subCategory}`,
                    value: cat._id,
                  }))}
                  name={"category"} // Change the name to match the field name
                  placeholder={"Category"}
                  width="98%"
                />
                <AppFormPicker
                  items={departments.map((dept) => ({
                    label: dept.name,
                    value: dept._id,
                  }))}
                  name="department"
                  placeholder="Department"
                  width="98%"
                />
                <AppFormField
                  name="price"
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder="Price"
                />
                <Text style={{ color: colors.medium, marginVertical: 5 }}>
                  Note: It's Required to add sizes values to add product!
                </Text>
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
                <Text style={{ color: colors.medium, marginVertical: 5 }}>
                  Add at least one or more colors!
                </Text>
                {colorFields.map((colorField, index) => (
                  <View key={index}>
                    <AppFormField
                      name={`color[${index}]`}
                      autoCapitalize="none"
                      autoCorrect={false}
                      placeholder="Color"
                      value={colorField.value}
                      onChangeText={(color) => handleColorChange(index, color)}
                    />
                    <TouchableOpacity
                      onPress={() => handleRemoveColorField(index)}
                    >
                      <Text style={{ color: colors.danger }}>Remove Color</Text>
                    </TouchableOpacity>
                  </View>
                ))}
                <TouchableOpacity onPress={handleAddColorField}>
                  <Text style={{ color: colors.secondary, marginBottom: 5 }}>
                    Add Color
                  </Text>
                </TouchableOpacity>
                <AppFormImagePicker name="imageUrl" />
                <AppFormField
                  maxLength={225}
                  multiline
                  numberOfLines={3}
                  name="description"
                  placeholder="Descriptions"
                />
                <SubmitButton title="Submit" />
              </AppForm>
            </View>
          </View>
        </View>
      </SafeScreen>
    </ScrollView>
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
