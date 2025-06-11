
import { AdMobInterstitial } from 'expo-ads-admob';
import { AD_UNIT_IDS } from '../constants/AdMobConfig';

class InterstitialAdManager {
  constructor() {
    this.isLoaded = false;
    this.setupInterstitial();
  }

  setupInterstitial() {
    AdMobInterstitial.setAdUnitID(AD_UNIT_IDS.INTERSTITIAL);
    AdMobInterstitial.setTestDeviceID('EMULATOR');
    
    AdMobInterstitial.addEventListener('interstitialDidLoad', () => {
      console.log('Interstitial ad loaded');
      this.isLoaded = true;
    });
    
    AdMobInterstitial.addEventListener('interstitialDidFailToLoad', (error) => {
      console.log('Interstitial ad failed to load:', error);
      this.isLoaded = false;
    });
    
    AdMobInterstitial.addEventListener('interstitialDidOpen', () => {
      console.log('Interstitial ad opened');
    });
    
    AdMobInterstitial.addEventListener('interstitialDidClose', () => {
      console.log('Interstitial ad closed');
      this.isLoaded = false;
      // Preload next interstitial
      this.requestAd();
    });
  }

  async requestAd() {
    try {
      await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: false });
    } catch (error) {
      console.log('Error requesting interstitial ad:', error);
    }
  }

  async showAd() {
    try {
      if (this.isLoaded) {
        await AdMobInterstitial.showAdAsync();
      } else {
        console.log('Interstitial ad not loaded yet');
        // Try to load and show
        await this.requestAd();
      }
    } catch (error) {
      console.log('Error showing interstitial ad:', error);
    }
  }
}

export default new InterstitialAdManager();
