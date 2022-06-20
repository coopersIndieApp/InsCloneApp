import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import comments from '../../assets/data/comments.json';
import Comment from '../../components/Comment';
import CommentInput from './CommentInput';

const CommentsScreen = () => {
  const renderItem = ({item}: any) => {
    return <Comment comment={item} isDetail />;
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 25}
      style={styles.container}>
      <View style={{flex: 1}}>
        <FlatList
          data={comments}
          renderItem={renderItem}
          style={{paddingHorizontal: 10}}
        />

        <CommentInput />
      </View>
    </KeyboardAvoidingView>
  );
};

export default CommentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
