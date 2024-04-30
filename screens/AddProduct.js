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
import { getSizes } from "../utilty/sizeUtility";

function AddProduct({ navigation }) {
  const [error, setError] = useState();
  const [errorVisible, setErrorVisible] = useState(false);
  const [colorFields, setColorFields] = useState([{ name: "", sizes: {} }]);
  const [categories, setCategories] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [sizes, setSizes] = useState([]);
  const validationSchema = Yup.object().shape({
    name: Yup.string().required().label("Name"),
    category: Yup.object().required().label("Category"),
    department: Yup.object().required().label("Department"),
    price: Yup.number().required().positive().label("Price"),
    colors: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().min(1).max(15).required(),
        sizes: Yup.object(),
      })
    ),
    imageUrl: Yup.array()
      .min(1, "Please select at least one image.")
      .max(3, "You can upload up to three images.")
      .of(Yup.string().required("Image URL is required")),
    description: Yup.string().required().max(400).label("Description"),
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const sizesData = await getSizes();
        setSizes(sizesData.data);
      } catch (error) {
        console.error("Error fetching sizes:", error);
      }
    };

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

    fetchData();
    fetchCategoriesAndDepartments();
  }, []);

  const handleAddColorField = () => {
    setColorFields([...colorFields, { name: "", sizes: {} }]);
  };
  const handleSizeChange = (colorIndex, sizeKey, value) => {
    setColorFields((prevColorFields) => {
      const updatedColorFields = [...prevColorFields];
      updatedColorFields[colorIndex].sizes[sizeKey] = parseInt(value, 10) || 0;
      return updatedColorFields;
    });
  };

  const handleColorChange = (index, name) => {
    // Create a copy of the current colorFields state
    const updatedColorFields = [...colorFields];
    // Update the name of the color at the specified index
    updatedColorFields[index].name = name;
    // Initialize or update the sizes object for the color at the specified index
    updatedColorFields[index].sizes = sizes.reduce((acc, size) => {
      // For each size, set its value to the existing value if it exists, or 0 if it doesn't
      acc[size.size] = updatedColorFields[index].sizes[size.size] || 0;
      return acc;
    }, {});
    // Update the state with the new colorFields array
    setColorFields(updatedColorFields);
  };

  const handleRemoveColorField = (index) => {
    const updatedColorFields = [...colorFields];
    updatedColorFields.splice(index, 1);
    setColorFields(updatedColorFields);
  };

  console.log(colorFields);
  const handleSubmit = async (productData) => {
    try {
      const transformedData = {
        name: productData.name,
        category: productData.category.value,
        department: productData.department.value,
        price: productData.price,
        colors: colorFields,
        imageUrl: productData.imageUrl,
        description: productData.description,
      };
      console.log(transformedData);
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
                  colors: colorFields,
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
                  name="category"
                  placeholder="Category"
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
                {colorFields.map((colorField, index) => (
                  <View key={index}>
                    <AppFormField
                      name={`colors[${index}].name`}
                      autoCapitalize="none"
                      autoCorrect={false}
                      placeholder="Color"
                      value={colorField.name}
                      onChangeText={(name) => handleColorChange(index, name)}
                    />
                    <View style={styles.sizeInputContainer}>
                      {sizes?.map((size) => (
                        <AppFormField
                          width={"30%"}
                          key={size?.size}
                          name={`colors[${index}].sizes.${size.size}`}
                          autoCapitalize="none"
                          autoCorrect={false}
                          placeholder={`${size.size}`}
                          keyboardType="numeric"
                          onChangeText={(value) =>
                            handleSizeChange(index, size.size, value)
                          }
                        />
                      ))}
                    </View>
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
  sizeInputContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 10,
  },
});

export default AddProduct;
