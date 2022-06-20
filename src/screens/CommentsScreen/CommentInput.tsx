import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useState} from 'react';
import fonts from '../../assets/theme/fonts';
import colors from '../../assets/theme/colors';

const emojis = ['❤️', ' 🙌 ', '🔥', '👏', '😢', '😍', '😮', '😂'];

const CommentInput = () => {
  const [comment, setComment] = useState('');

  const onPost = () => {
    console.warn(comment);
    setComment('');
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <View style={styles.emojiContainer}>
        {emojis.map((e, i) => (
          <Pressable key={i} onPress={() => setComment(comment + e)}>
            <Text style={styles.emoji}>{e}</Text>
          </Pressable>
        ))}
      </View>
      <View style={styles.replyContainer}>
        <Image
          source={{
            uri: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/1.jpg',
          }}
          style={styles.avatar}
        />
        <TextInput
          onChangeText={setComment}
          value={comment}
          placeholder="Add a comment..."
          placeholderTextColor={colors.grey}
          style={styles.textInput}
          multiline
          // numberOfLines={5}
        />
        <Pressable
          hitSlop={10}
          style={styles.postBtnContainer}
          onPress={onPost}>
          <Text style={styles.postBtn}>Post</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default CommentInput;

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 0.2,
    borderColor: colors.grey,
    marginBottom: 5,
  },
  emojiContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  emoji: {fontSize: fonts.size.lg, color: colors.white},
  replyContainer: {
    flexDirection: 'row',
    marginHorizontal: 15,
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    aspectRatio: 1,
    borderRadius: 25,
    alignSelf: 'flex-end',
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: colors.grey,
    paddingHorizontal: 10,
    paddingVertical: Platform.OS == 'ios' ? 10 : 5,
    fontSize: fonts.size.s,
    lineHeight: 20,
    color: colors.white,
    maxHeight: 100,
  },
  postBtnContainer: {position: 'absolute', right: 15, bottom: 10},
  postBtn: {
    fontSize: fonts.size.s,
    fontWeight: fonts.weight.semi,
    color: colors.primary,
  },
});
