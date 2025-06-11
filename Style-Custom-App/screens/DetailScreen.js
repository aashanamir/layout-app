
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, TouchableOpacity, Share } from 'react-native';
import BannerAd from '../components/AdMobBanner';
import InterstitialAdManager from '../components/AdMobInterstitial';

const DetailScreen = ({ route, navigation }) => {
  const { design } = route.params;

  useEffect(() => {
    // Show interstitial ad when leaving detail screen occasionally
    const unsubscribe = navigation.addListener('beforeRemove', () => {
      if (Math.random() < 0.2) {
        InterstitialAdManager.showAd();
      }
    });

    return unsubscribe;
  }, [navigation]);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this beautiful ${design.title}! ${design.tags.join(' ')}`,
        title: design.title,
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <BannerAd size="banner" style={styles.topBanner} />
        
        <View style={styles.imageContainer}>
          <Image source={design.image} style={styles.image} />
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.title}>{design.title}</Text>
          
          <View style={styles.tagsContainer}>
            {design.tags.map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.description}>{design.description}</Text>

          <BannerAd size="mediumRectangle" style={styles.middleBanner} />

          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
              <Text style={styles.buttonText}>Share Design</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.downloadButton}>
              <Text style={styles.buttonText}>Save to Gallery</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.relatedSection}>
            <Text style={styles.sectionTitle}>Related Designs</Text>
            <Text style={styles.sectionText}>
              Explore more beautiful designs in this category and discover new inspiration for your style.
            </Text>
          </View>
        </View>

        <BannerAd size="largeBanner" style={styles.bottomBanner} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefefe',
  },
  topBanner: {
    marginBottom: 10,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: '90%',
    height: 300,
    borderRadius: 12,
    resizeMode: 'cover',
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 15,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  tag: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    margin: 4,
  },
  tagText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  description: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 20,
  },
  middleBanner: {
    marginVertical: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  shareButton: {
    backgroundColor: '#4ecdc4',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    flex: 0.48,
  },
  downloadButton: {
    backgroundColor: '#ff6b6b',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    flex: 0.48,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 14,
  },
  relatedSection: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  bottomBanner: {
    marginTop: 20,
    marginBottom: 10,
  },
});

export default DetailScreen;
