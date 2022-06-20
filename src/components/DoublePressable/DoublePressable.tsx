import {PropsWithChildren, useCallback, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

interface IDoublePressable {
  onDoublePress?: () => void;
  onPress?: () => void;
}

const DoublePressable = ({
  onPress = () => {},
  onDoublePress = () => {},
  children,
}: PropsWithChildren<IDoublePressable>) => {
  let delayTime = 200;
  let firstPress = true;
  let lastTime: number;
  let timer: null | ReturnType<typeof setTimeout>;

  const handlePress = () => {
    let now = new Date().getTime();
    if (firstPress) {
      firstPress = false;
      timer = setTimeout(() => {
        onPress ? onPress() : null;
        firstPress = true;
      }, delayTime);
      lastTime = now;
    } else {
      if (now - lastTime < delayTime) {
        timer && clearTimeout(timer);
        onDoublePress ? onDoublePress() : null;
        firstPress = true;
      }
    }
  };

  return <Pressable onPress={handlePress}>{children}</Pressable>;
};

export default DoublePressable;

const styles = StyleSheet.create({});
