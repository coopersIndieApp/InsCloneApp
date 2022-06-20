import {StyleSheet} from 'react-native';
import colors from '../../assets/theme/colors';
import fonts from '../../assets/theme/fonts';

export default StyleSheet.create({
  container: {flex: 1},
  headerContainer: {
    flexDirection: 'row',
  },
  userInfoContainer: {marginHorizontal: 10},
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginHorizontal: 10,
  },
  avatarIcon: {
    position: 'absolute',
    bottom: 0,
    right: 5,
    backgroundColor: colors.blue,
    height: 24,
    width: 24,
    borderRadius: 25,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  numbersContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginLeft: 30,
    // marginLeft: 'auto',
  },
  numberContainer: {alignItems: 'center'},
  number: {
    color: colors.white,
    fontSize: fonts.size.default,
    fontWeight: fonts.weight.bold,
  },
  numberType: {color: colors.white, fontSize: fonts.size.default},
  descContainer: {margin: 10},
  name: {color: colors.white, fontWeight: fonts.weight.bold},
  bio: {
    color: colors.white,
    fontWeight: fonts.weight.semi,
    marginVertical: 5,
  },
  btnsContainer: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  editProfileBtnContainer: {
    borderWidth: 1,
    borderColor: colors.grey,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    marginRight: 5,
    borderRadius: 4,
  },
  editProFile: {
    color: colors.white,
    fontWeight: fonts.weight.bold,
    backgroundColor: 'transparent',
    zIndex: 100,
  },
  addFriendsBtnContainer: {
    borderWidth: 1,
    borderColor: colors.grey,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderRadius: 4,
    minWidth: 30,
  },
  postsContainer: {
    flex: 1,
    marginHorizontal: 'auto',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  postContainer: {
    flex: 1,
    minWidth: `${100 / 3}%`,
    maxWidth: `${100 / 3}%`,
    borderWidth: 0.5,
  },
  postSrcImage: {width: '100%', aspectRatio: 1},
});