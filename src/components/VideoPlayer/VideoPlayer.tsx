import {Pressable, StyleSheet, Text, View} from 'react-native';
import {SIZES} from '../../assets/theme/sizes';
import Video, {OnProgressData} from 'react-native-video';
import {useEffect, useRef, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../assets/theme/colors';
import fonts from '../../assets/theme/fonts';
import {muteState} from '../../atoms/videoPlayerAtom';
import {useRecoilValue} from 'recoil';

interface IVideo {
  uri: string;
  isPaused: boolean;
  isPausedHorizontal: boolean;
  style: {};
  showMuteIcon: boolean;
}

const VideoPlayer = (props: IVideo) => {
  const {uri, isPaused, isPausedHorizontal, style, showMuteIcon = true} = props;
  const playerRef = useRef<any>(null);
  const mute = useRecoilValue(muteState);
  const [progress, setProgress] = useState<OnProgressData>();
  let timer = progress?.seekableDuration! - progress?.currentTime!;
  useEffect(() => {
    playerRef?.current?.seek(0);
  }, [isPaused, isPausedHorizontal]);

  return (
    <View>
      <Video
        ref={playerRef}
        // source={{
        //   uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        // }}
        source={{uri}}
        style={[styles.video, style]}
        resizeMode={'cover'}
        muted={mute}
        paused={isPaused || isPausedHorizontal}
        repeat
        // onBuffer={e => console.log(e)}
        // controls={true}
        onProgress={v => setProgress(v)}
      />
      <View style={styles.timerContainer}>
        {timer < 60 && (
          <Text style={styles.timer}>
            0:{('00' + Math.floor(timer)).slice(-2)}
          </Text>
        )}
        {timer > 60 && (
          <Text style={styles.timer}>
            {Math.floor(timer / 60)}:{('00' + Math.floor(timer % 60)).slice(-2)}
          </Text>
        )}
      </View>
      {showMuteIcon && (
        <View style={styles.iconContainer}>
          <Ionicons
            name={mute ? 'volume-mute' : 'volume-high'}
            size={16}
            color={colors.white}
          />
        </View>
      )}
    </View>
  );
};

export default VideoPlayer;

const styles = StyleSheet.create({
  video: {
    width: SIZES.width,
    aspectRatio: 1,
  },
  iconContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: colors.black + '90',
    height: 30,
    width: 30,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  timer: {
    color: colors.white,
    fontWeight: fonts.weight.thin,
  },
});
