import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import colors from '../../assets/theme/colors';
import {SIZES} from '../../assets/theme/sizes';
import styles from './styles';

interface Props {
  isLiked: boolean;
  toggleLike: () => void;
  postSources: string[];
  scrollX: Animated.Value;
}

const FeedPostFooterIcons = (props: Props) => {
  const {isLiked, toggleLike, postSources, scrollX} = props;

  const renderDots = () => {
    const dotPosition = Animated.divide(scrollX, SIZES.width);

    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
        {postSources.map((_, index) => {
          const dotColor = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [colors.lightgrey, colors.primary, colors.lightgrey],
            extrapolate: 'clamp',
          });
          const dotScale = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.6, 1, 0.6],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={index}
              style={{
                width: 8,
                aspectRatio: 1,
                borderRadius: 5,
                backgroundColor: dotColor,
                marginHorizontal: 1,
                transform: [{scale: dotScale}],
              }}
            />
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.iconsContainer}>
      <Pressable onPress={toggleLike}>
        <Ionicons
          name={isLiked ? 'heart' : 'heart-outline'}
          size={28}
          style={[styles.icon, {bottom: 1.4}]}
          color={isLiked ? colors.accent : colors.white}
        />
      </Pressable>

      <Ionicons
        name="chatbubble-outline"
        size={24}
        style={styles.icon}
        color={colors.white}
      />
      <Ionicons
        name="paper-plane-outline"
        size={24}
        style={styles.icon}
        color={colors.white}
      />
      {postSources.length > 1 && renderDots()}
      <Ionicons
        name="bookmark-outline"
        size={24}
        style={{marginLeft: 'auto'}}
        color={colors.white}
      />
    </View>
  );
};

export default FeedPostFooterIcons;
