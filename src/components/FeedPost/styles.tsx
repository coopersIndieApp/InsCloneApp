import {StyleSheet} from 'react-native';
import colors from '../../assets/theme/colors';
import fonts from '../../assets/theme/fonts';

export default StyleSheet.create({
  post: {},
  header: {flexDirection: 'row', padding: 10, alignItems: 'center'},
  userAvatar: {width: 50, height: 50, borderRadius: 25, marginRight: 10},
  userName: {fontWeight: fonts.weight.bold, color: colors.white},
  threeDots: {marginLeft: 'auto'},
  image: {width: '100%', aspectRatio: 1},
  footer: {padding: 10},
  iconsContainer: {
    flexDirection: 'row',
    marginBottom: 0,
  },
  icon: {marginRight: 10},
  text: {color: colors.white, marginBottom: 5, width: '90%'},
  boldText: {fontWeight: fonts.weight.bold},
});
