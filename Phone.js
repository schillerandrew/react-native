import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Camera, CameraType } from 'expo-camera';

const Phone = () => {

  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasPermission(cameraStatus.status === 'granted');
    })();
  }, []);

  // no permissions
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No permission to access camera</Text>;
  }

  const takePicture = async () => {
    if (camera) {
      let data = await camera.takePictureAsync(null);
      setImage(data.uri);
    }
  }

  return (
    <>
      <View style={styles.container}>
        <Camera
        style={styles.cameraView}
        type={type}
        ref={ref => setCamera(ref)}
        ratio={'1:1'}
        >
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

        <TouchableOpacity
          style={styles.button}
          onPress={takePicture}>
          <Text style={{fontWeight: '900'}}>Take Picture</Text>
        </TouchableOpacity>
        {image && <Image source={{uri: image}} style={{flex:1}}/>}
        <StatusBar style="auto" />
      </View>
    </>
  );
}

function getRandomColor() {
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
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  cameraView: {
    width: 300,
    height: 500,
    // backgroundColor: '#00CAB1',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Phone;