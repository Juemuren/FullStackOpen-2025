import React, { useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';

import RepositoryListHead from './RepositoryListHead';
import RepositoryItemPressable from './RepositoryItemPressable';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

// const RepositoryListContainer = ({ repositories, orderKey, setOrderKey }) => {
//   const [searchKeyword, setSearchKeyword] = useState('');
//   const repositoryNodes = repositories ? repositories.edges.map((edge) => edge.node) : [];

//   const filteredRepositoryNodes = repositoryNodes.filter((r) => r.fullName.includes(searchKeyword));

//   return (
//     <FlatList
//       data={filteredRepositoryNodes}
//       ItemSeparatorComponent={() => <View style={styles.separator} />}
//       renderItem={({ item }) => <RepositoryItemPressable item={item} />}
//       keyExtractor={(item) => item.id}
//       ListHeaderComponent={() => (
//         <RepositoryListHead orderKey={orderKey} setOrderKey={setOrderKey} searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword} />
//       )}
//     />
//   );
// };

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const { orderKey, setOrderKey, searchKeyword, setSearchKeyword } = this.props;

    return (
      <RepositoryListHead
        orderKey={orderKey}
        setOrderKey={setOrderKey}
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
      />
    );
  };

  render() {
    const { repositories, searchKeyword, onEndReach } = this.props;

    const repositoryNodes = repositories ? repositories.edges.map((edge) => edge.node) : [];
    const filteredRepositoryNodes = repositoryNodes.filter((r) => r.fullName.toLowerCase().includes(searchKeyword));

    return (
      <FlatList
        data={filteredRepositoryNodes}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => <RepositoryItemPressable item={item} />}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={this.renderHeader}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
      />
    );
  }
}

export default RepositoryListContainer;
