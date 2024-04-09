import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import * as Yup from "yup";
import AppFormField from "../components/forms/AppFormField";
import AppFormPicker from "../components/forms/AppFormPicker";
import SubmitButton from "../components/forms/SubmitButton";
import AppForm from "../components/forms/AppForm";
import AppErrorMessage from "../components/forms/AppErrorMessage";
import { getSalesmans } from "../utilty/salesmanUtility";
import { getProducts } from "../utilty/ProductUtility";
import { allocate } from "../utilty/allocationUtility";

const validationSchema = Yup.object({
  salesmanId: Yup.object().required().label("Salesman ID"),
  productId: Yup.object().required().label("Product ID"),
  small: Yup.number().required().min(0).label("Small"),
  medium: Yup.number().required().min(0).label("Medium"),
  large: Yup.number().required().min(0).label("Large"),
});

function AllocateForm({ navigation }) {
  const [error, setError] = useState();
  const [errorVisible, setErrorVisible] = useState(false);
  const [salesmen, setSalesmen] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchSalesmen = async () => {
      try {
        const { data } = await getSalesmans();
        setSalesmen(data);
      } catch (error) {
        console.error("Error fetching salesmen data:", error);
      }
    };

    const fetchProducts = async () => {
      try {
        const { data } = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products data:", error);
      }
    };

    fetchSalesmen();
    fetchProducts();
  }, []);

  const handleSubmit = async (info) => {
    const { salesmanId, productId, small, medium, large } = info;
    const productAllocationData = {
      salesmanId: salesmanId.value,
      productId: productId.value,
      allocatedQuantities: {
        small: parseInt(small),
        medium: parseInt(medium),
        large: parseInt(large),
      },
    };
    try {
      const response = await allocate(productAllocationData); // Assuming allocate function sends the request to backend
      console.log("Allocation successful:", response.data);
      navigation.navigate("allocation");
      // Optionally, you can navigate to another screen or perform any other action upon successful allocation
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
        <AppForm
          initialValues={{
            salesmanId: "",
            productId: "",
            small: "0",
            medium: "0",
            large: "0",
          }} // Converted numbers to strings
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <AppErrorMessage error={error} visible={errorVisible} />
          <AppFormPicker
            items={salesmen.map((salesman) => ({
              label: salesman.name,
              value: salesman._id,
            }))}
            name={"salesmanId"}
            placeholder={"Select Salesman"}
            width={"98%"}
          />
          <AppFormPicker
            items={products.map((product) => ({
              label: product.name,
              value: product._id,
            }))}
            name={"productId"}
            placeholder={"Select Product"}
            width={"98%"}
          />
          <AppFormField
            name={"small"}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Small Quantity"
            keyboardType="numeric"
          />
          <AppFormField
            name={"medium"}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Medium Quantity"
            keyboardType="numeric"
          />
          <AppFormField
            name={"large"}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Large Quantity"
            keyboardType="numeric"
          />
          <SubmitButton title={"Allocate"} />
        </AppForm>
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
});

export default AllocateForm;
