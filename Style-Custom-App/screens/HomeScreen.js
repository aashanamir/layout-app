
import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import CategoryCard from '../components/CategoryCard';
import BannerAd from '../components/AdMobBanner';
import InterstitialAdManager from '../components/AdMobInterstitial';
import { categories } from '../constants/dummyData';

const HomeScreen = ({ navigation }) => {
  useEffect(() => {
    // Preload interstitial ad
    InterstitialAdManager.requestAd();
  }, []);

  const handleCategoryPress = (category) => {
    // Show interstitial ad occasionally (every 2-3 category visits)
    if (Math.random() < 0.3) {
      InterstitialAdManager.showAd();
    }
    
    navigation.navigate('Category', { category });
  };

  const renderCategory = ({ item }) => (
    <CategoryCard
      category={item}
      onPress={() => handleCategoryPress(item)}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Beauty Gallery</Text>
        <Text style={styles.headerSubtitle}>Discover Beautiful Designs</Text>
      </View>
      
      <BannerAd size="banner" style={styles.topBanner} />
      
      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        ListFooterComponent={() => (
          <BannerAd size="largeBanner" style={styles.bottomBanner} />
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
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
  },
  listContainer: {
    paddingBottom: 20,
  },
  topBanner: {
    marginBottom: 10,
  },
  bottomBanner: {
    marginTop: 20,
  },
});

export default HomeScreen;
