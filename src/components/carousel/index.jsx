import * as React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { Icon } from 'react-native-elements';

const CarouselComponent = (props) => {
  const styles = StyleSheet.create({
    containerTitle: {
      marginBottom: 20,
      width: "100%",
    },
    title: {
      fontSize: Dimensions.get('window').width <= 1023 ? 35 : Dimensions.get('window').width / 35,
      fontWeight: "bold",
    },
    containerComponent: {
      marginTop: props.marginTop,
      marginBottom: props.marginBottom,
    },
    containerCarousel: {
      flexDirection: "row",
      justifyContent: "center",
    },
    btnLeft: {
      position: "absolute",
      left: 15,
      top: "40%",
      zIndex: 100,
    },
    btnRight: {
      position: "absolute",
      right: 15,
      top: "40%",
      zIndex: 100,
    },
  });

  const [paginaAtual, setPaginaAtual] = React.useState(0);

  function renderComponent() {
    let item = props.items[paginaAtual];
    return React.cloneElement(props.children, { data: item })
  }

  React.useEffect(() => {
    if(paginaAtual === props.items.length - 1) {
      props.lastItem();
    }
  }, [paginaAtual]);

  return <>
    <View style={styles.containerComponent}>
      <View style={styles.containerTitle}>
        <Text style={styles.title}>{props.title}</Text>
      </View>
      <View style={styles.containerCarousel}>
        {paginaAtual !== 0 &&
          <TouchableOpacity style={styles.btnLeft} onPress={() => { setPaginaAtual(paginaAtual - 1) }}>
            <Icon style={styles.iconBtn} name="chevron-left" size={Dimensions.get('window').width <= 1023 ? 35 : Dimensions.get('window').width / 40} type="FontAwesome" color="#fff" />
          </TouchableOpacity>
        }
        <View style={styles.carouselItem}>
          {props.items.length !== 0 && renderComponent()}
        </View>
        {paginaAtual !== props.items.length - 1 &&
          <TouchableOpacity style={styles.btnRight} onPress={() => { setPaginaAtual(paginaAtual + 1) }}>
            <Icon style={styles.iconBtn} name="chevron-right" size={Dimensions.get('window').width <= 1023 ? 35 : Dimensions.get('window').width / 40} type="FontAwesome" color="#fff" />
          </TouchableOpacity>
        }
      </View>
    </View>
  </>
};

export default CarouselComponent; 