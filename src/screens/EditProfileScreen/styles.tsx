import {StyleSheet} from 'react-native';
import colors from '../../assets/theme/colors';
import fonts from '../../assets/theme/fonts';

export default StyleSheet.create({
  container: {flex: 1, paddingHorizontal: 10},
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginVertical: 10,
  },
  profilePhotoContainer: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  changePhotoText: {
    color: colors.blue,
    fontWeight: fonts.weight.semi,
    fontSize: fonts.size.default,
    marginVertical: 5,
  },
  separator: {
    borderBottomWidth: 0.2,
    borderColor: colors.grey,
    // backgroundColor: 'red',
  },
  inputContainer: {
    flexDirection: 'row',

    borderBottomWidth: 0.2,
  },
  infoText: {
    color: colors.white,
    flex: 2.5,
    fontSize: fonts.size.md,
    fontWeight: fonts.weight.thin,
    paddingVertical: 10,
    lineHeight: 24,
  },
  infoTextInputContainer: {
    flex: 7.5,
    borderBottomWidth: 0.2,
    borderBottomColor: colors.grey,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoTextInput: {
    color: colors.white,
    fontSize: fonts.size.md,
    fontWeight: fonts.weight.thin,
    lineHeight: 24,
    marginRight: 10,
  },
  btnText: {
    color: colors.blue,
    flex: 2.5,
    fontSize: fonts.size.md,
    fontWeight: fonts.weight.thin,
    paddingVertical: 10,
    lineHeight: 24,
  },
});
