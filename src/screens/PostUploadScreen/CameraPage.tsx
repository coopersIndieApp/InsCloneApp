import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {CONTENT_SPACING, MAX_ZOOM_FACTOR, SAFE_AREA_PADDING} from './Constants';
import colors from '../../assets/theme/colors';
import {
  Camera,
  CameraDeviceFormat,
  PhotoFile,
  sortFormats,
  TakePhotoOptions,
  TakeSnapshotOptions,
  useCameraDevices,
  VideoFile,
} from 'react-native-vision-camera';
import CameraButton from './CameraButton';
import {
  PinchGestureHandler,
  PinchGestureHandlerGestureEvent,
  TapGestureHandler,
} from 'react-native-gesture-handler';
import Reanimated, {
  Extrapolate,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedProps,
  useSharedValue,
} from 'react-native-reanimated';
import {CaptureButton} from './CaptureButton';

const flashModeList = ['off', 'on', 'auto'];
const flashIcon: {[type: string]: string} = {
  off: 'flash-off',
  on: 'flash-on',
  auto: 'flash-auto',
};

const ReanimatedCamera = Reanimated.createAnimatedComponent(Camera);
Reanimated.addWhitelistedNativeProps({
  zoom: true,
});

const CameraPage = () => {
  const [isCameraInitialized, setIsCameraInitialized] = useState(false);

  const [cameraPosition, setCameraPosition] = useState<'front' | 'back'>(
    'back',
  );
  const [flash, setFlash] = useState<any>('off');
  const camera = useRef<Camera>(null);
  const devices = useCameraDevices();
  const device = devices[cameraPosition];
  const zoom = useSharedValue(0);
  const isPressingButton = useSharedValue(false);
  const minZoom = device?.minZoom ?? 1;
  const maxZoom = Math.min(device?.maxZoom ?? 1, 20);

  const cameraAnimatedProps = useAnimatedProps(() => {
    const z = Math.max(Math.min(zoom.value, maxZoom), minZoom);
    return {
      zoom: z,
    };
  }, [maxZoom, minZoom, zoom]);

  const supportsFlash = device?.hasFlash ?? false;
  const onFlipCameraPressed = useCallback(() => {
    setCameraPosition(p => (p === 'back' ? 'front' : 'back'));
  }, []);
  const onFlashPressed = useCallback(() => {
    // setFlash(f => (f === 'off' ? 'on' : 'off'));

    const currentMode = flashModeList.indexOf(flash);
    const nextMode =
      currentMode == flashModeList.length - 1 ? 0 : currentMode + 1;
    setFlash(flashModeList[nextMode]);
  }, [flash]);

  const takePhotoOptions = useMemo<TakePhotoOptions & TakeSnapshotOptions>(
    () => ({
      photoCodec: 'jpeg',
      qualityPrioritization: 'speed',
      flash: flash as any,
      quality: 90,
      skipMetadata: true,
    }),
    [flash],
  );

  const onMediaCaptured = useCallback(
    (media: PhotoFile | VideoFile, type: 'photo' | 'video') => {
      console.log(`Media captured! ${JSON.stringify(media)}`);
    },
    [],
  );

  //#region Camera Capture
  const takePhoto = useCallback(async () => {
    try {
      if (camera.current == null) throw new Error('Camera ref is null!');

      console.log('Taking photo...');
      const photo = await camera.current.takePhoto(takePhotoOptions);
      onMediaCaptured(photo, 'photo');
    } catch (e) {
      console.error('Failed to take photo!', e);
    }
  }, [camera, onMediaCaptured, takePhotoOptions]);

  const onDoubleTap = useCallback(() => {
    onFlipCameraPressed();
  }, [onFlipCameraPressed]);

  const neutralZoom = device?.neutralZoom ?? 1;
  useEffect(() => {
    // Run everytime the neutralZoomScaled value changes. (reset zoom when device changes)
    zoom.value = neutralZoom;
  }, [neutralZoom, zoom]);

  const onPinchGesture = useAnimatedGestureHandler<
    PinchGestureHandlerGestureEvent,
    {startZoom?: number}
  >({
    onStart: (_, context) => {
      context.startZoom = zoom.value;
    },
    onActive: (event, context) => {
      // we're trying to map the scale gesture to a linear zoom here
      const startZoom = context.startZoom ?? 0;
      const scale = interpolate(
        event.scale,
        [1 - 1 / 3, 1, 10],
        [-1, 0, 1],
        Extrapolate.CLAMP,
      );
      zoom.value = interpolate(
        scale,
        [-1, 0, 1],
        [minZoom, startZoom, maxZoom],
        Extrapolate.CLAMP,
      );
    },
  });

  const setIsPressingButton = useCallback(
    (_isPressingButton: boolean) => {
      isPressingButton.value = _isPressingButton;
    },
    [isPressingButton],
  );

  if (device == null) return <Text>No Device</Text>;
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <PinchGestureHandler onGestureEvent={onPinchGesture} enabled={true}>
        <Reanimated.View style={StyleSheet.absoluteFill}>
          <TapGestureHandler onEnded={onDoubleTap} numberOfTaps={2}>
            <ReanimatedCamera
              ref={camera}
              style={StyleSheet.absoluteFill}
              device={device}
              // format={format}
              // fps={fps}
              // hdr={enableHdr}
              // lowLightBoost={device.supportsLowLightBoost && enableNightMode}
              isActive={true}
              onInitialized={() => setIsCameraInitialized(true)}
              // onError={onError}
              enableZoomGesture={false}
              animatedProps={cameraAnimatedProps}
              photo={true}
              video={true}
              // audio={hasMicrophonePermission}
              // frameProcessor={device.supportsParallelVideoProcessing ? frameProcessor : undefined}
              orientation="portrait"
              frameProcessorFps={1}
              // onFrameProcessorPerformanceSuggestionAvailable={onFrameProcessorSuggestionAvailable}
            />
          </TapGestureHandler>
        </Reanimated.View>
      </PinchGestureHandler>

      {/* <ReanimatedCamera
        ref={camera}
        device={device}
        isActive={true}
        style={StyleSheet.absoluteFill}
        photo={true}
        onInitialized={() => setIsCameraInitialized(true)}
        enableZoomGesture={false}
        animatedProps={cameraAnimatedProps}
      /> */}
      <CaptureButton
        style={styles.captureButton}
        camera={camera}
        onMediaCaptured={onMediaCaptured}
        cameraZoom={zoom}
        minZoom={minZoom}
        maxZoom={maxZoom}
        flash={supportsFlash ? flash : 'off'}
        enabled={isCameraInitialized}
        setIsPressingButton={setIsPressingButton}
      />
      <CameraButton
        iconName={'close'}
        style={{top: 20, left: 20}}
        onPress={() => console.log('close')}
      />
      {supportsFlash && (
        <CameraButton
          iconName={flashIcon[flash]}
          style={{top: 20}}
          onPress={onFlashPressed}
        />
      )}
      <CameraButton
        iconName={'settings'}
        style={{top: 20, right: 20}}
        onPress={() => console.log('settings')}
      />
      <CameraButton
        iconName={'photo-library'}
        style={{bottom: 20, left: 20}}
        onPress={() => console.log('images')}
      />
      {/* {isCameraInitialized && (
        <CameraButton main style={{bottom: 20}} onPress={takePhoto} />
      )} */}
      <CameraButton
        iconName={'flip-camera-android'}
        style={{bottom: 20, right: 20}}
        onPress={onFlipCameraPressed}
      />
    </View>
  );
};

export default CameraPage;

const styles = StyleSheet.create({
  captureButton: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: SAFE_AREA_PADDING.paddingBottom,
  },
});
