import { Text, View, StyleSheet, Image } from 'react-native';
import { LinkButton }  from "../button/index.jsx";
import { Icon } from 'react-native-elements';

import Container from '../container/index.jsx';

import Colors from "../../constants/colors";

const Footer = () => {

  function navigate(pagina) {
    navigation.navigate(pagina);
  }

  return <>
    <View>
      <Container>
        <View style={styles.containerFooter}>
          <LinkButton style={styles.btnNav} href="/profile"><Icon name="person" type="ionicon" color="#fff"/></LinkButton>
          <LinkButton style={styles.btnNav} href="/"><Icon name="house" type="FontAwesome6" color="#fff"/></LinkButton>
          <LinkButton style={styles.btnNav} href="/search"><Icon name="search" type="ionicon" color="#fff"/></LinkButton>
        </View>
      </Container>
    </View>
  </>
};

const styles = StyleSheet.create({
  containerFooter: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 10,
  }, 
  btnNav: {
    backgroundColor: Colors().GoldenSunrise,
    borderRadius: 10,
    width: 40,
    height: 40,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    paddingTop: 10,
    paddingBottom: 10,
  }, 
});

export default Footer;