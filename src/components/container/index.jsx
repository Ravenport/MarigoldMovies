import { View, StyleSheet, Dimensions } from "react-native";

const Container = (props) => {
  return <View style={styles.alignmentContainer}>
    <View style={styles.container}>
      {props.children}
    </View>
  </View>
}

const styles = StyleSheet.create({
  alignmentContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },  
  container: {
    maxWidth: Dimensions.get("window").width * 0.9,
    minWidth: Dimensions.get("window").width * 0.75,
    width: "100%",
    flexDirection: "row",
  }
});

export default Container;