import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import colors from "../config/colors";
import { getProducts, deleteProduct } from "../utilty/ProductUtility";
import SafeScreen from "../components/SafeScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppText from "../components/AppText";

const AddedProducts = ({ navigation }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response.data); // Assuming response.data is an array of products
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    try {
      await deleteProduct(productId);
      // Remove the deleted product from the list
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== productId)
      );
      console.log("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <SafeScreen>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <AppText style={styles.logo}>Added Products</AppText>
            <AppText style={styles.subText}>List of added products</AppText>
          </View>
          {products.length === 0 ? (
            <View style={styles.loadingContainer}>
              <Text>No Products!</Text>
            </View>
          ) : (
            products.map((product, index) => (
              <TouchableOpacity
                onPress={() => navigation.navigate("addproduct", { product })}
                style={styles.productContainer}
                key={index}
              >
                <Image
                  source={{ uri: product.imageUrl[0] }}
                  style={styles.image}
                  resizeMode="cover"
                />
                <View style={styles.card}>
                  <View style={styles.detailsContainer}>
                    <Text style={styles.name}>{product.name}</Text>
                    <Text style={styles.size}>
                      Sizes: Small -{" "}
                      <Text style={styles.bold}>{product.sizes.small}</Text>,
                      Medium -{" "}
                      <Text style={styles.bold}>{product.sizes.medium}</Text>,
                      Large -{" "}
                      <Text style={styles.bold}>{product.sizes.large}</Text>
                    </Text>
                    <Text style={styles.color}>
                      Colors:{" "}
                      <Text style={styles.bold}>
                        {product.color.join(", ")}
                      </Text>
                    </Text>
                    <Text style={styles.description}>
                      {product.description}
                    </Text>
                  </View>
                  <View style={styles.actionsContainer}>
                    <TouchableOpacity onPress={() => handleDelete(product._id)}>
                      <MaterialCommunityIcons
                        name="delete"
                        size={24}
                        color={colors.primary}
                      />
                    </TouchableOpacity>
                    <Text style={styles.price}>Rs. {product.price}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>
    </SafeScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.white,
    padding: 20,
  },
  header: {
    marginBottom: 20,
    alignItems: "flex-start",
    width: "100%",
    paddingHorizontal: 20,
  },
  logo: {
    color: colors.dark,
    fontSize: 35,
    fontWeight: "bold",
  },
  subText: {
    color: colors.medium,
    fontSize: 16,
  },
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  productContainer: {
    marginBottom: 20,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  card: {
    backgroundColor: colors.light,
    padding: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  detailsContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: colors.dark,
  },
  size: {
    marginBottom: 5,
    color: colors.medium,
  },
  bold: {
    fontWeight: "bold",
  },
  color: {
    marginBottom: 5,
    color: colors.medium,
  },
  description: {
    marginBottom: 5,
    color: colors.medium,
  },
  actionsContainer: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.danger,
    marginLeft: 10,
  },
});

export default AddedProducts;
