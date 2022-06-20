import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import colors from '../../assets/theme/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface ICameraButton {
  main?: boolean;
  style?: {};
  iconName?: string;
  onPress: () => void;
}

const CameraButton = (props: ICameraButton) => {
  const {main = false, style, iconName = '', onPress} = props;
  return main ? (
    <Pressable onPress={onPress} style={styles.mainBtnContainer}>
      <View style={styles.insideContainer} />
    </Pressable>
  ) : (
    <Pressable onPress={onPress} style={[{position: 'absolute'}, style]}>
      <MaterialIcons name={iconName} size={30} color={colors.white} />
    </Pressable>
  );
};

export default CameraButton;

const styles = StyleSheet.create({
  mainBtnContainer: {
    position: 'absolute',
    bottom: 20,
    width: 80,
    height: 80,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  insideContainer: {
    width: 66,
    height: 66,
    position: 'absolute',
    borderRadius: 60,
    backgroundColor: colors.white,
  },
});
