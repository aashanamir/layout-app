
import { AdMobRewarded } from 'expo-ads-admob';
import { AD_UNIT_IDS } from '../constants/AdMobConfig';

class RewardedAdManager {
  constructor() {
    this.isLoaded = false;
    this.setupRewarded();
  }

  setupRewarded() {
    AdMobRewarded.setAdUnitID(AD_UNIT_IDS.REWARDED);
    AdMobRewarded.setTestDeviceID('EMULATOR');
    
    AdMobRewarded.addEventListener('rewardedVideoDidLoad', () => {
      console.log('Rewarded ad loaded');
      this.isLoaded = true;
    });
    
    AdMobRewarded.addEventListener('rewardedVideoDidFailToLoad', (error) => {
      console.log('Rewarded ad failed to load:', error);
      this.isLoaded = false;
    });
    
    AdMobRewarded.addEventListener('rewardedVideoDidOpen', () => {
      console.log('Rewarded ad opened');
    });
    
    AdMobRewarded.addEventListener('rewardedVideoDidClose', () => {
      console.log('Rewarded ad closed');
      this.isLoaded = false;
      // Preload next rewarded ad
      this.requestAd();
    });
    
    AdMobRewarded.addEventListener('rewardedVideoUserDidEarnReward', (reward) => {
      console.log('User earned reward:', reward);
      // Handle reward logic here
    });
  }

  async requestAd() {
    try {
      await AdMobRewarded.requestAdAsync({ servePersonalizedAds: false });
    } catch (error) {
      console.log('Error requesting rewarded ad:', error);
    }
  }

  async showAd() {
    try {
      if (this.isLoaded) {
        await AdMobRewarded.showAdAsync();
      } else {
        console.log('Rewarded ad not loaded yet');
        await this.requestAd();
      }
    } catch (error) {
      console.log('Error showing rewarded ad:', error);
    }
  }
}

export default new RewardedAdManager();
