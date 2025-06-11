
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AdMobBanner } from 'expo-ads-admob';
import { AD_UNIT_IDS } from '../constants/AdMobConfig';

const BannerAd = ({ size = 'banner', style }) => {
  return (
    <View style={[styles.container, style]}>
      <AdMobBanner
        bannerSize={size}
        adUnitID={AD_UNIT_IDS.BANNER}
        servePersonalizedAds={false}
        onDidFailToReceiveAdWithError={(error) => console.log('Banner ad error:', error)}
        onAdViewDidReceiveAd={() => console.log('Banner ad loaded')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
});

export default BannerAd;
