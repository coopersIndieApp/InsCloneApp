import {atom} from 'recoil';

export const cameraPermissionState = atom({
  key: 'cameraPermission',
  default: 'not-determined',
});
export const microphonePermissionState = atom({
  key: 'microphonePermission',
  default: 'not-determined',
});
