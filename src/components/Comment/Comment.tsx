import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import colors from '../../assets/theme/colors';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {IComment} from '../../types/models';
import {useState} from 'react';

interface ICommentProps {
  comment: IComment;
  isDetail: boolean;
}

const Comment = (props: ICommentProps) => {
  const {comment, isDetail} = props;
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = () => {
    setIsLiked(v => !v);
  };

  return (
    <View style={styles.comment}>
      {/* <View style={{alignSelf: 'flex-start'}}> */}
      {isDetail && (
        <Image
          source={{
            uri: comment.user.image,
          }}
          style={styles.userAvatar}
        />
      )}
      {/* </View> */}
      <View style={styles.commentContainer}>
        <Text style={styles.commentText}>
          <Text style={styles.boldText}>{comment.user.username} </Text>
          <Text>{comment.comment}</Text>
        </Text>
        {isDetail && (
          <View style={{flexDirection: 'row', marginVertical: 5}}>
            <Text style={styles.commentFooter}>2d</Text>
            <Text style={styles.commentFooter}>3 likes</Text>
            <Text style={styles.commentFooter}>Reply</Text>
          </View>
        )}
      </View>
      <Pressable onPress={toggleLike} hitSlop={10}>
        <AntDesign
          name={isLiked ? 'heart' : 'hearto'}
          size={12}
          style={styles.icon}
          color={isLiked ? colors.accent : colors.lightgrey}
        />
      </Pressable>
    </View>
  );
};

export default Comment;
