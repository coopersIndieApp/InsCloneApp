import {StyleSheet} from 'react-native';
import colors from '../../assets/theme/colors';
import fonts from '../../assets/theme/fonts';

export default StyleSheet.create({
  commentContainer: {flex: 1, marginRight: 10},
  commentText: {color: colors.white},
  boldText: {fontWeight: fonts.weight.bold},
  comment: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  commentFooter: {
    marginRight: 10,
    color: colors.grey,
    fontSize: fonts.size.s,
    marginBottom: 10,
    fontWeight: fonts.weight.bold,
  },
  icon: {marginHorizontal: 10},
  userAvatar: {
    width: 30,
    aspectRatio: 1,
    borderRadius: 25,
    alignSelf: 'flex-start',
    marginRight: 10,
  },
});
