import {StyleSheet} from 'react-native';
import colors from '../../assets/theme/colors';
import fonts from '../../assets/theme/fonts';

export default StyleSheet.create({
  postsContainer: {
    flex: 1,
    // marginHorizontal: 'auto',
    // flexDirection: 'row',
    // flexWrap: 'wrap',
  },
  postContainer: {
    flex: 1,
    maxWidth: `${100 / 3}%`,
    borderWidth: 0.5,
  },
  postSrcImage: {width: '100%', aspectRatio: 1},
});
