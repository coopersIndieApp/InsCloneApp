import {useRef, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ViewabilityConfig,
  ViewToken,
} from 'react-native';
import posts from '../../assets/data/posts.json';
import FeedPost from '../../components/FeedPost';

const HomeScreen = () => {
  const [activePostId, setActivePostId] = useState<string | null>(null);

  const viewabilityConfig: ViewabilityConfig = {
    itemVisiblePercentThreshold: 51,
  };

  const onViewableItemsChanged = useRef(
    ({viewableItems}: {viewableItems: Array<ViewToken>}) => {
      if (viewableItems.length > 0) {
        setActivePostId(viewableItems[0].item.id);
      }
    },
  );

  const renderItem = ({item}: any) => (
    <FeedPost post={item} isPaused={activePostId != item.id} />
  );

  return (
    <FlatList
      data={posts}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      onViewableItemsChanged={onViewableItemsChanged.current}
      viewabilityConfig={viewabilityConfig}
    />
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
