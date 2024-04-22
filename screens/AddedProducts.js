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
  const [isListView, setIsListView] = useState(false); // State to toggle between list view and cart-like view

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
        <View style={styles.header}>
          <View style={{}}>
            <AppText style={styles.logo}>Added Products</AppText>
            <AppText style={styles.subText}>List of added products</AppText>
          </View>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={() => setIsListView(false)}>
              <MaterialCommunityIcons
                name="view-grid"
                size={24}
                color={isListView ? colors.medium : colors.primary}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsListView(true)}>
              <MaterialCommunityIcons
                name="view-list"
                size={24}
                color={isListView ? colors.primary : colors.medium}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.container}>
          {products.length === 0 ? (
            <Text>No Products!</Text>
          ) : isListView ? (
            products.map((product, index) => (
              <View style={styles.listItemContainer} key={index}>
                <Image
                  source={{ uri: product.imageUrl[0] }}
                  style={styles.listItemImage}
                  resizeMode="cover"
                  defaultSource={require("../assets/noimage.jpg")}
                />
                <View style={styles.listItemDetails}>
                  <Text style={styles.listItemName}>{product.name}</Text>
                  <Text style={styles.listItemDescription}>
                    {product.description}
                  </Text>
                  <Text style={styles.listItemPrice}>Rs. {product.price}</Text>
                  <TouchableOpacity onPress={() => handleDelete(product._id)}>
                    <MaterialCommunityIcons
                      name="delete"
                      size={24}
                      color={colors.primary}
                      style={{ alignSelf: "flex-end" }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ))
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
                    <TouchableOpacity
                      onPress={() => handleDelete(product._id)}
                      style={{ alignSelf: "flex-end" }}
                    >
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  logo: {
    color: colors.dark,
    fontSize: 25,
    fontWeight: "bold",
  },
  subText: {
    color: colors.medium,
    fontSize: 16,
  },
  iconContainer: {
    flexDirection: "row",
  },
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.white,
    padding: 20,
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
  listItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.light,
  },
  listItemImage: {
    width: 80,
    height: 80,
    borderRadius: 5,
    marginRight: 10,
  },
  listItemDetails: {
    flex: 1,
  },
  listItemName: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.dark,
    marginBottom: 5,
  },
  listItemDescription: {
    marginBottom: 5,
    color: colors.medium,
  },
  listItemPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.danger,
    marginBottom: 5,
    alignSelf: "flex-end",
  },
});

export default AddedProducts;
