import { Text, View, StyleSheet, Image, Dimensions } from 'react-native';

const Header = () => {
  return <>
    <View style={styles.containerHead}>
      <View style={styles.containerLogo}>
        <Image style={styles.logo} source={require("../../../assets/imageIcon.png")} />
        <Text style={styles.titulo}>Marigold</Text>
      </View>
    </View>
  </>
};

const styles = StyleSheet.create({
  containerLogo: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  containerHead: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    width: Dimensions.get('window').width <= 600? Dimensions.get('window').width / 8: 64,
    height: Dimensions.get('window').width <= 600? Dimensions.get('window').height / 15: 64,
  },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
  },
});

export default Header;