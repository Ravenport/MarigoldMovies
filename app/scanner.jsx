import { View, StyleSheet, Text, Button, TouchableOpacity, Linking } from "react-native";
import { useEffect, useState } from "react";
import { CameraView, useCameraPermissions } from 'expo-camera';

const Scanner = () => {
    const [facing, setFacing] = useState('back');
    const [permission, requestPermission] = useCameraPermissions();

    const styles = StyleSheet.create({
        titleScanner: {
            flex: 1,
            fontSize: 18,
            padding: 32,
            color: '#777'
        },
        camera: {
            flex: 1,
        },
        containerNoCamera: {
            padding: 20,
            width: "100%",
            marginTop: 20,
        },
        container: {
            flex: 1,
            justifyContent: 'center',
        },
        text: {
            backgroundColor: "white",
            padding: 10,
            borderRadius: 20, 
            margin: 10,
            fontSize: 15,
            width: "35%",
            textAlign: "center",
            fontWeight: "bold",
        },
    });

    const handleRedirect = (data) => {
        Linking.openURL(data.data);
    };

    const toggleCamera = () => {
        setFacing(current => (current === "back" ? "front" : "back"));
    };

    if (!permission) {
        return <View />
    }

    if (!permission.granted) {
        return (
            <View style={styles.containerNoCamera}>
                <Text style={styles.message}>Nós Precisamos da sua permissão para usar sua camera.</Text>
                <Button onPress={requestPermission} title="Dar Permissão." />
            </View>
        );
    }

    return <View style={styles.container}>
        <CameraView 
            style={styles.camera} 
            facing={facing}
            barcodeScannerSettings={{
                barcodeTypes: ["qr"],
            }}
            onBarcodeScanned={handleRedirect}
        >
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={toggleCamera}>
                    <Text style={styles.text}>Virar Câmera</Text>
                </TouchableOpacity>
            </View>
        </CameraView>
    </View>
};

export default Scanner;