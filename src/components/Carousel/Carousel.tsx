import {
  Animated,
  FlatList,
  Image,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  ViewabilityConfig,
  ViewToken,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import DoublePressable from '../DoublePressable/DoublePressable';
import colors from '../../assets/theme/colors';
import {SIZES} from '../../assets/theme/sizes';
import {checkFileType} from '../../helper/checkFileType';
import VideoPlayer from '../VideoPlayer';
import fonts from '../../assets/theme/fonts';

interface ICarousel {
  postSources: string[];
  onDoublePress: () => void;
  onPress: () => void;
  scrollX: Animated.Value;
  isPaused: boolean;
}

const Carousel = (props: ICarousel) => {
  const {postSources, onDoublePress, onPress, scrollX, isPaused} = props;
  const [activeIndex, setActiveIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (!isPaused) {
      const timeout = setTimeout(() => {
        fadeOut();
      }, 5000);
      return () => {
        clearTimeout(timeout);
      };
    } else {
      fadeIn();
    }
  }, [isPaused]);

  const renderItem = ({item, index}: any) => {
    let isVideo = checkFileType(item);
    return (
      <DoublePressable onDoublePress={onDoublePress} onPress={onPress}>
        {isVideo ? (
          <VideoPlayer
            uri={item}
            isPaused={isPaused}
            isPausedHorizontal={activeIndex != index}
          />
        ) : (
          <Image
            source={{uri: item}}
            style={{width: SIZES.width, aspectRatio: 1}}
          />
        )}
      </DoublePressable>
    );
  };

  const viewabilityConfig: ViewabilityConfig = {
    itemVisiblePercentThreshold: 51,
  };

  const onViewableItemsChanged = useRef(
    ({viewableItems}: {viewableItems: Array<ViewToken>}) => {
      if (viewableItems.length > 0) {
        setActiveIndex(viewableItems[0].index || 0);
      }
    },
  );

  const renderDots = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          position: 'absolute',
          bottom: 0,
          width: '100%',
        }}>
        {postSources.map((_, index) => {
          return (
            <Animated.View
              key={index}
              style={{
                width: 15,
                maxWidth: SIZES.width / postSources.length - 4,
                // height: 4,
                aspectRatio: 5,
                borderRadius: 5,
                backgroundColor:
                  activeIndex == index ? colors.white : colors.lightgrey,
                margin: 2,
                borderWidth: 0.1,
                borderColor:
                  activeIndex == index ? colors.lightgrey : colors.white,
              }}
            />
          );
        })}
      </View>
    );
  };

  return (
    <View>
      <Animated.FlatList
        data={postSources}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={viewabilityConfig}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
      />
      {/* {showIndexTag && ( */}
      <Animated.View
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
          backgroundColor: colors.black + '99',
          borderRadius: 10,
          padding: 4,
          opacity: fadeAnim,
        }}>
        <Text
          style={{
            color: colors.white,
            fontSize: fonts.size.s,
            marginHorizontal: 2,
          }}>
          {activeIndex + 1}/{postSources.length}
        </Text>
      </Animated.View>
      {/* )} */}
      {/* {renderDots()} */}
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({});
