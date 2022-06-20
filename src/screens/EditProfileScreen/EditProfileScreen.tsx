import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import user from '../../assets/data/user.json';
import colors from '../../assets/theme/colors';
import fonts from '../../assets/theme/fonts';
import EditProfileInput from './EditProfileInput';
import styles from './styles';

const EditProfileScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.profilePhotoContainer}>
        <Image source={{uri: user.image}} style={styles.avatar} />
        <Text style={styles.changePhotoText}>Change profile photo</Text>
      </View>
      <View style={styles.separator} />
      <EditProfileInput title={'Name'} content={user.name} />
      <EditProfileInput title={'Username'} content={user.username} />
      <EditProfileInput title={'Pronouns'} content={user.pronouns} />
      <EditProfileInput title={'Bio'} content={user.bio} />
      <EditProfileInput title={'Links'} content={user?.link} />
      <View style={styles.separator} />
      <View></View>
      <Pressable
        style={({pressed}) => [
          {
            backgroundColor: pressed ? colors.grey + '80' : 'transparent',
          },
          styles.inputContainer,
        ]}>
        <Text style={styles.btnText}>Switch to Professional Account</Text>
      </Pressable>
      <View style={styles.separator} />
      <Pressable
        style={({pressed}) => [
          {
            backgroundColor: pressed ? colors.grey + '80' : 'transparent',
          },
          styles.inputContainer,
        ]}>
        <Text style={styles.btnText}>Personal information settings</Text>
      </Pressable>
    </View>
  );
};

export default EditProfileScreen;
