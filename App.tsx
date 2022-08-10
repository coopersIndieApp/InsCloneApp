import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {RecoilRoot} from 'recoil';
import HomeScreen from './src/screens/HomeScreen';
import CommentsScreen from './src/screens/CommentsScreen';
import colors from './src/assets/theme/colors';
import ProfileScreen from './src/screens/ProfileScreen';
import EditProfileScreen from './src/screens/EditProfileScreen';
import PostUploadScreen from './src/screens/PostUploadScreen';
import {NavigationContainer} from '@react-navigation/native';
import Navigation from './src/navigation';
const App = () => {
  return (
    <RecoilRoot>
      <StatusBar barStyle="light-content" />
      {/* <SafeAreaView style={styles.container}> */}
      <Navigation />
      {/* </SafeAreaView> */}
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
