import {
  Alert,
  AppState,
  AppStateStatus,
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {Camera, CameraPermissionStatus} from 'react-native-vision-camera';
// import {Camera} from 'expo-camera';
import {useRecoilState, useRecoilValue} from 'recoil';

import images from '../../assets/theme/images';
import colors from '../../assets/theme/colors';
import fonts from '../../assets/theme/fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  cameraPermissionState,
  microphonePermissionState,
} from '../../atoms/permissions';

// interface IPermissions {
//   setAppStateVisible: () => void;
// }
const PermissionsPage = ({setAppStateVisible}: any) => {
  // const cameraPermission = useRecoilValue(cameraPermissionState);
  // const microphonePermission = useRecoilValue(microphonePermissionState);
  const [cameraPermission, setCameraPermission] = useRecoilState(
    cameraPermissionState,
  );
  const [microphonePermission, setMicrophonePermission] = useRecoilState(
    microphonePermissionState,
  );

  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    });
    return () => {
      subscription.remove();
    };
  }, []);

  const requestCameraPermission = useCallback(async () => {
    const permission = await Camera.requestCameraPermission();
    setCameraPermission(permission);
    if (permission === 'denied') await Linking.openSettings();
    setCameraPermission(permission);
  }, []);

  const requestMicrophonePermission = useCallback(async () => {
    const permission = await Camera.requestMicrophonePermission();
    setMicrophonePermission(permission);
    if (permission === 'denied') await Linking.openSettings();
    setMicrophonePermission(permission);
  }, []);

  const openSettings = async () => {
    if (
      cameraPermission !== 'authorized' ||
      microphonePermission != 'authorized'
    ) {
      await Linking.openSettings();
    }
  };

  const requestPermission = () => {
    // requestMicrophonePermission();
    // requestCameraPermission();
    Alert.alert(
      'This feature requires camera and microphone access',
      'In iPhone settings, tap Instagram and turn on Microphone and Camera access.',
      [
        {
          text: 'Not now',
          style: 'cancel',
        },
        {
          text: 'Open Settings',
          onPress: () => openSettings(),
        },
      ],
    );
  };

  return (
    <View style={{flex: 1}}>
      <View style={{alignItems: 'center'}}>
        <Image
          source={images.permissionImg}
          style={{width: 90, height: 90, marginTop: 50}}
          resizeMode={'contain'}
        />
      </View>
      <Text
        style={{
          color: colors.white,
          fontSize: fonts.size.lg,
          fontWeight: fonts.weight.bold,
          textAlign: 'center',
          letterSpacing: 1,
          marginVertical: 20,
        }}>
        Allow Instagram to access your camera and microphone
      </Text>
      <View style={{paddingHorizontal: 20}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            alignSelf: 'flex-start',
            marginHorizontal: 10,
          }}>
          <FontAwesome5
            name="photo-video"
            size={18}
            color={colors.white}
            style={{paddingRight: 15, paddingLeft: 5}}
          />
          <Text
            style={{
              color: colors.white,
              fontSize: fonts.size.default,
              fontWeight: fonts.weight.bold,
            }}>
            How you'll use this
          </Text>
        </View>
        <Text
          style={{
            color: colors.lightgrey,
            fontSize: fonts.size.s,
            fontWeight: fonts.weight.thin,
            marginLeft: 55,
            marginRight: 40,
            //   marginTop: 5,
          }}>
          To take photos, record videos and preview visual and audio effects.
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            alignSelf: 'flex-start',
            marginTop: 10,
            marginHorizontal: 10,
          }}>
          <MaterialCommunityIcons
            name="chat-question"
            size={24}
            color={colors.white}
            style={{paddingRight: 15, paddingLeft: 5}}
          />
          <Text
            style={{
              color: colors.white,
              fontSize: fonts.size.default,
              fontWeight: fonts.weight.bold,
            }}>
            How we'Il use this
          </Text>
        </View>
        <Text
          style={{
            color: colors.lightgrey,
            fontSize: fonts.size.s,
            fontWeight: fonts.weight.thin,
            marginLeft: 55,
            marginRight: 40,
            //   marginTop: 5,
          }}>
          To show you previews of visual and audio effects.
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            alignSelf: 'flex-start',
            marginTop: 10,
            marginHorizontal: 10,
          }}>
          <Ionicons
            name="settings-sharp"
            size={24}
            color={colors.white}
            style={{paddingRight: 15, paddingLeft: 5}}
          />
          <Text
            style={{
              color: colors.white,
              fontSize: fonts.size.default,
              fontWeight: fonts.weight.bold,
            }}>
            How these settings work
          </Text>
        </View>
        <Text
          style={{
            color: colors.lightgrey,
            fontSize: fonts.size.s,
            fontWeight: fonts.weight.thin,
            marginLeft: 55,
            marginRight: 40,
            //   marginTop: 5,
          }}>
          You can change your choices at any time in your device settings. If
          you allow access now, you won't have to allow it again.
        </Text>
      </View>
      <View
        style={{
          borderBottomWidth: 0.2,
          borderColor: colors.grey,
          marginTop: 'auto',
        }}
      />
      <TouchableOpacity
        onPress={requestPermission}
        activeOpacity={0.8}
        style={{
          backgroundColor: colors.blue,
          //   marginTop: 'auto',
          padding: 10,
          marginVertical: 20,
          marginBottom: 30,
          marginHorizontal: 20,
          borderRadius: 6,
          alignItems: 'center',
        }}>
        <Text style={{color: colors.white, fontWeight: fonts.weight.semi}}>
          Continue
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default PermissionsPage;

const styles = StyleSheet.create({});
