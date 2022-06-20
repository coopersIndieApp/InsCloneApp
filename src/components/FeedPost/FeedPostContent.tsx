import {useState} from 'react';
import {Animated, Image, StyleSheet, Text, View} from 'react-native';
import {useRecoilState, useSetRecoilState} from 'recoil';
import {SIZES} from '../../assets/theme/sizes';
import {muteState} from '../../atoms/videoPlayerAtom';
import {checkFileType} from '../../helper/checkFileType';
import {IPost} from '../../types/models';
import Carousel from '../Carousel';
import DoublePressable from '../DoublePressable/DoublePressable';
import VideoPlayer from '../VideoPlayer';
import styles from './styles';

interface IFeedPostContent {
  postSources: string[];
  toggleLike: () => void;
  scrollX: Animated.Value;
  isPaused: boolean;
}

const FeedPostContent = (props: IFeedPostContent) => {
  const {postSources, toggleLike, scrollX, isPaused} = props;
  const setMute = useSetRecoilState(muteState);

  const toggleMute = () => {
    setMute(v => !v);
  };

  let content = null;

  if (postSources.length == 1) {
    let isVideo = checkFileType(postSources[0]);

    content = (
      <DoublePressable onDoublePress={toggleLike} onPress={toggleMute}>
        {isVideo ? (
          <VideoPlayer
            uri={postSources[0]}
            isPaused={isPaused}
            isPausedHorizontal={false}
          />
        ) : (
          <Image
            source={{
              uri: postSources[0],
            }}
            style={styles.image}
          />
        )}
      </DoublePressable>
    );
  } else if (postSources.length > 1) {
    content = (
      <Carousel
        postSources={postSources}
        onDoublePress={toggleLike}
        onPress={toggleMute}
        scrollX={scrollX}
        isPaused={isPaused}
      />
    );
  }

  return <View>{content}</View>;
};

export default FeedPostContent;
