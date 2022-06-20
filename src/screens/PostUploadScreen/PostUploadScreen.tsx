import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Camera, CameraPermissionStatus} from 'react-native-vision-camera';
// import {Camera, CameraType} from 'expo-camera';
import PermissionsPage from './PermissionsPage';
import CameraPage from './CameraPage';
import {useRecoilState} from 'recoil';
import {
  cameraPermissionState,
  microphonePermissionState,
} from '../../atoms/permissions';

const PostUploadScreen = () => {
  const [cameraPermission, setCameraPermission] = useRecoilState(
    cameraPermissionState,
  );
  const [microphonePermission, setMicrophonePermission] = useRecoilState(
    microphonePermissionState,
  );

  const [appStateVisible, setAppStateVisible] = useState();

  useEffect(() => {
    Camera.getCameraPermissionStatus().then(setCameraPermission);
    Camera.getMicrophonePermissionStatus().then(setMicrophonePermission);
  }, [appStateVisible]);

  return (
    <View style={{flex: 1}}>
      {cameraPermission == 'authorized' &&
      microphonePermission == 'authorized' ? (
        <CameraPage />
      ) : (
        <PermissionsPage setAppStateVisible={setAppStateVisible} />
      )}
    </View>
  );
};

export default PostUploadScreen;

const styles = StyleSheet.create({});
