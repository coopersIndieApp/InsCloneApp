import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {checkFileType} from '../../helper/checkFileType';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../assets/theme/colors';
import VideoPlayer from '../VideoPlayer';
import styles from './styles';
import {IPost} from '../../types/models';
import FeedGridItem from './FeedGridItem';

interface IFeedGridView {
  data: IPost[];
  ListHeaderComponent?:
    | React.ComponentType<any>
    | React.ReactElement
    | null
    | undefined;
}

const FeedGridView = (props: IFeedGridView) => {
  const {data, ListHeaderComponent} = props;

  return (
    <FlatList
      data={data}
      renderItem={({item}) => <FeedGridItem item={item} />}
      numColumns={3}
      ListHeaderComponent={ListHeaderComponent}
    />
  );
};

export default FeedGridView;
