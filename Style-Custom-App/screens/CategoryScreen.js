
import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import BannerAd from '../components/AdMobBanner';
import RewardedAdManager from '../components/AdMobRewarded';
import { designs } from '../constants/dummyData';

const CategoryScreen = ({ route, navigation }) => {
  const { category } = route.params;
  const categoryDesigns = designs[category.id] || [];

  useEffect(() => {
    // Preload rewarded ad
    RewardedAdManager.requestAd();
  }, []);

  const handleDesignPress = (design) => {
    navigation.navigate('Detail', { design });
  };

  const showRewardedAd = () => {
    RewardedAdManager.showAd();
  };

  const renderDesign = ({ item, index }) => (
    <TouchableOpacity
      style={styles.designCard}
      onPress={() => handleDesignPress(item)}
    >
      <Image source={item.image} style={styles.designImage} />
      <Text style={styles.designTitle} numberOfLines={2}>
        {item.title}
      </Text>
      {/* Show banner ad after every 4 items */}
      {(index + 1) % 4 === 0 && (
        <View style={styles.inlineBanner}>
          <BannerAd size="mediumRectangle" />
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{category.title}</Text>
        <TouchableOpacity style={styles.rewardButton} onPress={showRewardedAd}>
          <Text style={styles.rewardButtonText}>Watch Ad for Premium Content</Text>
        </TouchableOpacity>
      </View>

      <BannerAd size="banner" style={styles.topBanner} />

      <FlatList
        data={categoryDesigns}
        renderItem={renderDesign}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No designs available yet!</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefefe',
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  rewardButton: {
    backgroundColor: '#ff6b6b',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  rewardButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  topBanner: {
    marginBottom: 10,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
  },
  designCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  designImage: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    resizeMode: 'cover',
  },
  designTitle: {
    padding: 12,
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  inlineBanner: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
  },
});

export default CategoryScreen;
