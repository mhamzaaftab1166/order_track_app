import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
} from "react-native";
import { useCart } from "../../CartContext";
import colors from "../../config/colors";
import Icon from "react-native-vector-icons/FontAwesome";
import * as Location from "expo-location";
import { saveOrder } from "../../utilty/orderUtility";

const CartScreen = () => {
  const { cartItems, removeFromCart } = useCart();
  const [location, setLocation] = useState(null);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image
        source={{ uri: item.imageUrl }}
        style={styles.itemImage}
        resizeMode="cover"
      />
      <View style={styles.itemDetailsContainer}>
        <Text style={styles.itemName}>{item.pname}</Text>
        <Text>Size: {item.size}</Text>
        <Text>Color: {item.color}</Text>
        <Text>Quantity: {item.quantity}</Text>
        <TouchableOpacity
          style={{ alignSelf: "flex-end" }}
          onPress={() => removeFromCart(item._id)}
        >
          <Icon name="trash" size={20} color={colors.danger} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const handlePlaceOrder = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Location permission is required to place an order."
        );
        return;
      }

      let userLocation = await Location.getCurrentPositionAsync({});
      setLocation(userLocation);

      // Map through cartItems array to construct an array of order objects
      const orderData = cartItems.map((item) => ({
        ...item,
        longitude: userLocation.coords.longitude,
        latitude: userLocation.coords.latitude,
      }));

      try {
        await saveOrder(orderData);
        console.log("done");
      } catch (error) {
        console.log(error.respone.data);
      }
      console.log(orderData); // Log the order data
      // Send order data to backend
    } catch (error) {
      console.error("Error handling place order:", error);
      Alert.alert("Error", "Could not place order. Please try again later.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        {cartItems.length > 0
          ? "Your Added Items in Cart"
          : "Your Cart Is Empty"}
      </Text>
      {cartItems.length === 0 ? (
        <Text style={styles.noItemText}>No items added to cart yet.</Text>
      ) : (
        <FlatList
          data={cartItems}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.placeOrderButton,
            { opacity: cartItems.length === 0 ? 0.5 : 1 },
          ]}
          disabled={cartItems.length === 0}
          onPress={handlePlaceOrder}
        >
          <Text style={styles.placeOrderText}>Place Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  itemContainer: {
    flexDirection: "row",
    backgroundColor: colors.light,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  itemDetailsContainer: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    paddingHorizontal: 20,
    alignItems: "center",
    alignSelf: "center",
  },
  placeOrderButton: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
    width: "100%",
  },
  placeOrderText: {
    color: colors.light,
    fontSize: 18,
    fontWeight: "bold",
  },
  noItemText: {
    textAlign: "center",
    fontSize: 16,
    marginBottom: 20,
  },
});

export default CartScreen;
