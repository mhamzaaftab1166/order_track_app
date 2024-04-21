import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { getSaleman } from "../../utilty/salesmanUtility";

const OrderDetailsScreen = ({ navigation, route }) => {
  const [salesman, setSalesman] = useState(null);
  const { order } = route.params;
  console.log(salesman);

  useEffect(() => {
    const fetchSalesman = async () => {
      try {
        const salesmanDetails = await getSaleman(order.salesman);
        setSalesman(salesmanDetails.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSalesman();
  }, [order.salesman]);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Details</Text>
      <Text style={styles.locationInfo}>Location Info with Date and Time</Text>

      {/* Smaller Map */}
      <View style={styles.mapContainer}>
        <MapView
          onPress={() =>
            navigation.navigate("orderdetailmap", {
              long: order.longitude,
              lat: order.latitude,
            })
          }
          style={styles.map}
          initialRegion={{
            latitude: order.latitude,
            longitude: order.longitude, // Corrected typo
            latitudeDelta: 0.01, // Adjusted for closer zoom
            longitudeDelta: 0.01, // Adjusted for closer zoom
          }}
        >
          <Marker
            coordinate={{
              latitude: order.latitude,
              longitude: order.longitude, // Corrected typo
            }}
            title="Order Location"
          />
        </MapView>
      </View>

      {/* Image Carousel */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {order.pimage.map((imgUrl, index) => (
          <Image
            key={index} // Added key for list items
            source={{ uri: imgUrl }} // Use the actual image URL
            style={styles.image}
            defaultSource={require("../../assets/noimage.jpg")}
          />
        ))}
      </ScrollView>

      <View style={styles.productInfo}>
        <Text style={styles.title}>{order.pname}</Text>
        <Text>SKU: 000-000-000</Text>
        <Text style={styles.heading}>{`RS: ${order.price}`}</Text>
        <Text style={styles.heading}>{`Quantity: ${order.quantity}`}</Text>
        <Text>{`${order.color} / ${order.size}`}</Text>
        <Text>{`${order.pcategory.mainCategory} / ${order.pcategory.subCategory}`}</Text>
      </View>

      <View style={styles.contactInfo}>
        {/* Add icons for user and phone */}
        <Text style={styles.heading}>{`ORDER PLACED BY: ${
          salesman ? salesman.name : "Loading..."
        }`}</Text>

        <Text>{`Phone Number: ${salesman?.phone}`}</Text>
      </View>

      <TouchableOpacity style={styles.detailsButton}>
        <Text style={styles.detailsButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    paddingTop: 16,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
  },
  locationInfo: {
    fontSize: 16,
    color: "#666",
    marginBottom: 16,
  },
  mapContainer: {
    height: 200,
    marginBottom: 10,
  },
  map: {
    flex: 1,
  },
  image: {
    width: 200,
    height: 200,
    marginRight: 10,
    borderRadius: 8,
  },
  productInfo: {
    marginBottom: 16,
  },
  contactInfo: {
    marginBottom: 16,
  },
  detailsButton: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  detailsButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
});

export default OrderDetailsScreen;
