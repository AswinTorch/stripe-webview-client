import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  const handleCheckout = async () => {
    const res = await axios.post(`https://localhost:3000/users/checkout`, {
      items: [
        {
          name: "Banana",
          amount: 1000,
          currency: "usd",
          quantity: 1,
        },
      ],
      platform: Platform.OS,
    });

    if (Platform.OS === "web") {
      let result = await WebBrowser.openAuthSessionAsync(
        `${URLs.BASE_API}/.netlify/functions/api/web/checkout/redirect?sessionId=${res.data.sessionId}`
      );
      if (result.type === "dismiss") {
        props.clearCart();
        props.navigation.dispatch(
          CommonActions.navigate("OrderPlaced", { orderId: res.data.orderId })
        );
      }
    } else
      props.navigation.navigate("Checkout", {
        sessionId: res.data.sessionId,
        orderId: res.data.orderId,
      });
  };

  return (
    <View style={styles.container}>
      <Text>Hello world</Text>
      <Button
        small
        title="Add to Cart"
        style={{ borderBottomLeftRadius: 5, borderBottomRightRadius: 5 }}
        onPress={() => addToCart({ _id: 0, name: "Banana", amount: 1 })}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
