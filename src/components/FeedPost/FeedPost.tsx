import {Animated, Image, Text, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import colors from '../../assets/theme/colors';
import fonts from '../../assets/theme/fonts';
import styles from './styles';
import FeedPostFooterIcons from './FeedPostFooterIcons';
import Comment from '../Comment';
import {IPost} from '../../types/models';
import {useRef, useState} from 'react';
import FeedPostContent from './FeedPostContent';

interface IFeedPost {
  post: IPost;
  isPaused: boolean;
}

const FeedPost = ({post, isPaused}: IFeedPost) => {
  const [isDescExpanded, setIsDescExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const scrollX = useRef(new Animated.Value(0)).current;

  const toggleDescExpanded = () => {
    setIsDescExpanded(v => !v);
  };
  const toggleLike = () => {
    setIsLiked(v => !v);
  };

  return (
    <View style={styles.post}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{
            uri: post.user.image,
          }}
          style={styles.userAvatar}
        />
        <Text style={styles.userName}>{post.user.username}</Text>
        <Entypo
          name="dots-three-horizontal"
          size={16}
          style={styles.threeDots}
        />
      </View>

      {/* Content */}
      <FeedPostContent
        postSources={post.postSources!}
        toggleLike={toggleLike}
        isPaused={isPaused}
        scrollX={scrollX}
      />

      {/* Footer */}
      <View style={styles.footer}>
        <FeedPostFooterIcons
          isLiked={isLiked}
          toggleLike={toggleLike}
          postSources={post.postSources!}
          scrollX={scrollX}
        />

        {/* Likes */}
        <Text style={styles.text}>
          Liked by{' '}
          <Text style={styles.boldText}>{post.comments[0].user.username}</Text>{' '}
          and <Text style={styles.boldText}>{post.nofLikes - 1} others</Text>
        </Text>

        {/* Post Desc */}

        <Text
          style={[styles.text, {marginBottom: 0}]}
          numberOfLines={isDescExpanded ? 0 : 3}>
          <Text style={styles.boldText}>{post.user.username}</Text>{' '}
          <Text>{post.description}</Text>
        </Text>
        <Text
          onPress={toggleDescExpanded}
          style={{color: colors.grey, marginBottom: 5}}>
          {isDescExpanded ? 'less' : 'more'}
        </Text>

        {/* Comments */}
        <Text style={[styles.text, {color: colors.grey}]}>
          View all {post.nofComments} comments
        </Text>
        {post.comments.map(comment => (
          <Comment key={comment.id} comment={comment} isDetail={false} />
        ))}

        <Text
          style={[styles.text, {color: colors.grey, fontSize: fonts.size.s}]}>
          {post.createdAt}
        </Text>
      </View>
    </View>
  );
};

export default FeedPost;
