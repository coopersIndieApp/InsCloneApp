import {SafeAreaView, StyleSheet} from 'react-native';
import {RecoilRoot} from 'recoil';
import HomeScreen from './src/screens/HomeScreen';
import CommentsScreen from './src/screens/CommentsScreen';
import colors from './src/assets/theme/colors';
import ProfileScreen from './src/screens/ProfileScreen';
import EditProfileScreen from './src/screens/EditProfileScreen';
import PostUploadScreen from './src/screens/PostUploadScreen';

const App = () => {
  return (
    <RecoilRoot>
      <SafeAreaView style={styles.container}>
        {/* <HomeScreen /> */}
        {/* <CommentsScreen /> */}
        {/* <ProfileScreen /> */}
        {/* <EditProfileScreen /> */}
        <PostUploadScreen />
      </SafeAreaView>
    </RecoilRoot>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
});
