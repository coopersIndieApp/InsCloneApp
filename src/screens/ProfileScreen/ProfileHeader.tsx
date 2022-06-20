import {Image, Pressable, Text, View} from 'react-native';
import user from '../../assets/data/user.json';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import colors from '../../assets/theme/colors';
import Entypo from 'react-native-vector-icons/Entypo';

const ProfileHeader = () => {
  return (
    <View style={styles.container}>
      {/* UserInfo */}
      <View style={styles.userInfoContainer}>
        {/* Header */}
        <View style={styles.headerContainer}>
          {/*Ａdd Story */}
          <View>
            <Image source={{uri: user.image}} style={styles.avatar} />
            <View style={styles.avatarIcon}>
              <Entypo name="plus" size={16} color={colors.white} />
            </View>
          </View>
          {/* Post num, Follower num, Following num */}
          <View style={styles.numbersContainer}>
            <View style={styles.numberContainer}>
              <Text style={styles.number}>16</Text>
              <Text style={styles.numberType}>Posts</Text>
            </View>
            <View style={styles.numberContainer}>
              <Text style={styles.number}>357</Text>
              <Text style={styles.numberType}>Followers</Text>
            </View>
            <View style={styles.numberContainer}>
              <Text style={styles.number}>422</Text>
              <Text style={styles.numberType}>Following</Text>
            </View>
          </View>
        </View>
        {/* Desc */}
        <View style={styles.descContainer}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.bio}>{user.bio}</Text>
        </View>
        {/* Edit Profile */}
        <View style={styles.btnsContainer}>
          <Pressable
            onPress={() => console.log('Pressed!')}
            style={({pressed}) => [
              {
                backgroundColor: pressed ? colors.grey + '80' : 'transparent',
              },
              styles.editProfileBtnContainer,
            ]}>
            <Text style={styles.editProFile}>Edit Profile</Text>
          </Pressable>
          <Pressable
            style={({pressed}) => [
              {
                backgroundColor: pressed ? colors.grey + '80' : 'transparent',
              },
              styles.addFriendsBtnContainer,
            ]}>
            <Ionicons
              name="person-add-outline"
              size={16}
              color={colors.white}
            />
          </Pressable>
        </View>
      </View>
      {/* Posts */}
      {/* <View style={styles.postsContainer}>
        {user.posts.map((item, i) => (
          <RenderItem key={i} item={item} />
        ))}
      </View> */}
    </View>
  );
};

export default ProfileHeader;
