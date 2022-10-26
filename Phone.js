import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera, CameraType } from 'expo-camera';

const Phone = () => {

  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No permission to access camera :(</Text>;
  }

  return (
    <>
    <View style={styles.container}>
      <Camera style={styles.camera} type={type}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType(type === CameraType.back ? CameraType.front : CameraType.back);
            }}>
            <Text style={styles.text}> Flip </Text>
          </TouchableOpacity>
        </View>
      </Camera>
      {/* <Text>Hello World!</Text> */}
      <StatusBar style="auto" />
    </View>
    </>
  );
}

function getRandomColor () {
  let letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const styles = StyleSheet.create({
  container: {
    flex: 5,
    backgroundColor: getRandomColor(),
    alignItems: 'center',
    justifyContent: 'center',
  },
  camera: {
    width: 300,
    height: 500,
    // backgroundColor: '#00CAB1',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Phone;