import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import styles from './styles';
import colors from '../../assets/theme/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface IProfileInput {
  title: string;
  content: string;
}

const EditProfileInput = (props: IProfileInput) => {
  const {title, content} = props;
  return (
    <Pressable
      style={({pressed}) => [
        {
          backgroundColor: pressed ? colors.grey + '80' : 'transparent',
        },
        styles.inputContainer,
      ]}>
      <Text style={styles.infoText}>{title}</Text>
      <View
        style={[
          styles.infoTextInputContainer,
          {borderBottomWidth: title == 'Links' ? 0 : 0.2},
        ]}>
        <Text
          numberOfLines={5}
          style={[
            styles.infoTextInput,
            {color: content.length == 0 ? colors.grey : colors.white},
          ]}>
          {content || title}
        </Text>
        {title == 'Links' && (
          <Ionicons
            name="chevron-forward"
            size={16}
            color={colors.white}
            style={{
              marginLeft: 'auto',
            }}
          />
        )}
      </View>
    </Pressable>
  );
};

export default EditProfileInput;
