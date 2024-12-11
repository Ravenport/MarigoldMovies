import { SafeAreaView, View, StyleSheet, Dimensions } from 'react-native';
import Colors from '../../constants/colors.js';

import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';

const Body = (props) => {
    return <>
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Header />
            </View>
            <View style={styles.body}>
                {props.children}
            </View>
            <View style={styles.footer}>
                <Footer />
            </View>
        </SafeAreaView>
    </>
};

export default Body;

const styles = StyleSheet.create({
    footer: {
        flex: 1,
        backgroundColor: Colors().WarmSunset,
        display: "block",
        width: "100%",
        height: "90%",
        padding: 5,
    },
    header: {
        flex: 1,
        backgroundColor: Colors().WarmSunset,
        padding: 5,
    },
    body: {
        flex: 12,
        height: Dimensions.get("window").height,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
    },
});