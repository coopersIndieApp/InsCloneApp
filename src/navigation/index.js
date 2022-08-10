import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProfileScreen from '../screens/ProfileScreen';
import colors from '../assets/theme/colors';
import {Image, Text, View} from 'react-native';
import images from '../assets/theme/images';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: colors.black,
    },
  };

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        initialRouteName="Feed"
        screenOptions={
          {
            //   headerShown: false,
            //   headerStyle: {backgroundColor: colors.black},
          }
        }>
        <Stack.Screen
          name="Feed"
          component={HomeScreen}
          options={{headerShown: true, header: HeaderTitle}}
        />
        <Stack.Screen name="UserProfile" component={ProfileScreen} />
      </Stack.Navigator>
      {/* <HomeScreen /> */}
      {/* <CommentsScreen /> */}
      {/* <ProfileScreen /> */}
      {/* <EditProfileScreen /> */}
      {/* <PostUploadScreen /> */}
    </NavigationContainer>
  );
};

const HeaderTitle = () => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: colors.black,
        paddingTop: insets.top,
        paddingHorizontal: 5,
        alignItems: 'center',
      }}>
      <Image
        source={images.logo}
        style={{width: '40%', height: 60}}
        resizeMode={'contain'}
      />
      <View style={{flexDirection: 'row', marginLeft: 'auto'}}>
        <AntDesign
          name="plussquareo"
          size={28}
          color={colors.white}
          style={{marginHorizontal: 10}}
        />
        <AntDesign
          name="hearto"
          size={28}
          color={colors.white}
          style={{marginHorizontal: 10}}
        />
        <AntDesign
          name="message1"
          size={28}
          color={colors.white}
          style={{marginHorizontal: 10}}
        />
      </View>
    </View>
  );
};

export default Navigation;
