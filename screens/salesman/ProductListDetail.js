import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Slider } from "react-native-elements";
import colors from "../../config/colors";
import Icon from "react-native-vector-icons/Ionicons"; // Import Ionicons
import { useCart } from "../../CartContext";

const ProductListDetail = ({ route, navigation }) => {
  const { product } = route.params;
  const { addToCart, cartItems } = useCart();
  console.log(cartItems);
  // Remove _id property from sizes
  const sizesArray = Object.keys(product.sizes)
    .filter((sizeName) => sizeName !== "_id")
    .map((sizeName) => ({
      size: sizeName,
      quantity: product.sizes[sizeName],
    }));

  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleSizeSelect = (index) => {
    setSelectedSizeIndex(index);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const handleQuantityIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleQuantityDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    // Add logic to add the selected product to the cart
    addToCart({
      _id: product._id,
      selectedSize: sizesArray[selectedSizeIndex].size,
      selectedColor,
      quantity,
      imageUrl: product.imageUrl[0],
      name: product.name,
      price: product.price,
    });
    // Show alert
    alert("Your Item added to cart sucessfully!");

    // Navigate to the home screen
    navigation.navigate("list");
  };

  const navigateNextImage = () => {
    if (currentImageIndex < product.imageUrl.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const navigatePrevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.imageUrl[currentImageIndex] }}
          style={styles.productImage}
          resizeMode="cover"
        />
        <View style={styles.imageNavContainer}>
          <TouchableOpacity onPress={navigatePrevImage}>
            <Icon name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={navigateNextImage}>
            <Icon name="arrow-forward" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>Price: ${product.price}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <View style={styles.sizesContainer}>
          <Text style={styles.sizesLabel}>Available Sizes:</Text>
          <ScrollView horizontal>
            {sizesArray.map(({ size, quantity }, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.sizeButton,
                  selectedSizeIndex === index && {
                    backgroundColor: colors.primary,
                  },
                ]}
                onPress={() => handleSizeSelect(index)}
              >
                <Text
                  style={[
                    styles.sizeButtonText,
                    selectedSizeIndex === index && { color: colors.light },
                  ]}
                >
                  {size}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <View style={styles.colorsContainer}>
          <Text style={styles.colorsLabel}>Available Colors:</Text>
          <ScrollView horizontal>
            {product.color.map((color, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.colorButton,
                  selectedColor === color && {
                    backgroundColor: colors.primary,
                  },
                ]}
                onPress={() => handleColorSelect(color)}
              >
                <Text
                  style={[
                    styles.colorButtonText,
                    selectedColor === color && { color: colors.light },
                  ]}
                >
                  {color}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={handleQuantityDecrement}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={handleQuantityIncrement}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={handleAddToCart}
        >
          <Text style={styles.addToCartButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
    position: "relative",
  },
  productImage: {
    width: 300,
    height: 300,
    borderRadius: 10,
  },
  imageNavContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    position: "absolute",
    bottom: 0,
    // backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
  },
  detailsContainer: {
    paddingHorizontal: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  sizesContainer: {
    marginBottom: 20,
  },
  sizesLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sizeButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: colors.light,
    borderRadius: 5,
    marginRight: 10,
  },
  sizeButtonText: {
    fontSize: 16,
  },
  colorsContainer: {
    marginBottom: 20,
  },
  colorsLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  colorButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: colors.light,
    borderRadius: 5,
    marginRight: 10,
  },
  colorButtonText: {
    fontSize: 16,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  quantityButton: {
    backgroundColor: colors.light,
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  quantityButtonText: {
    fontSize: 24,
    color: colors.dark,
  },
  quantity: {
    fontSize: 20,
    marginHorizontal: 10,
  },
  addToCartButton: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
  },
  addToCartButtonText: {
    color: colors.light,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ProductListDetail;
