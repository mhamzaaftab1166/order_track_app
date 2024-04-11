import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import colors from "../../config/colors";
import { getProducts, deleteProduct } from "../../utilty/ProductUtility";
import SafeScreen from "../../components/SafeScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppText from "../../components/AppText";

const ProductsList = ({ navigation }) => {
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

  const handleProductPress = (product) => {
    navigation.navigate("listdetail", { product });
  };

  return (
    <SafeScreen>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <AppText style={styles.logo}>All Available Products</AppText>
            <AppText style={styles.subText}>
              List of all industry products
            </AppText>
          </View>
          {products.length === 0 ? (
            <View style={styles.loadingContainer}>
              <Text>No Products!</Text>
            </View>
          ) : (
            products.map((product, index) => (
              <TouchableOpacity
                onPress={() => handleProductPress(product)}
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
                    <Text style={styles.price}>${product.price}</Text>
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

export default ProductsList;
