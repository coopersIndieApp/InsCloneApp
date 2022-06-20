import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import styles from './styles';
import VideoPlayer from '../VideoPlayer';
import {checkFileType} from '../../helper/checkFileType';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../assets/theme/colors';
import {IPost} from '../../types/models';

const FeedGridItem = ({item}: {item: IPost}) => {
  let isVideo = checkFileType(item.postSources[0]);
  let icon = null;
  if (item.postSources.length > 1) {
    icon = <Ionicons name="copy" size={16} color={colors.white} />;
  } else if (isVideo) {
    icon = <Ionicons name="play" size={20} color={colors.white} />;
  }

  return (
    <View style={styles.postContainer}>
      {isVideo ? (
        <VideoPlayer
          uri={item.postSources[0]}
          isPaused={true}
          isPausedHorizontal={false}
          showMuteIcon={false}
          style={styles.postSrcImage}
        />
      ) : (
        <Image
          source={{uri: item.postSources[0]}}
          style={styles.postSrcImage}
        />
      )}
      <View style={{position: 'absolute', right: 5, top: 5}}>{icon}</View>
    </View>
  );
};

export default FeedGridItem;
