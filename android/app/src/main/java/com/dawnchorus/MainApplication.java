package com.dawnchorus;

import android.app.Application;
import android.util.Log;

import com.facebook.react.ReactApplication;
import com.dawnchorus.alarms.AlarmPackage;
import com.cboy.rn.splashscreen.SplashScreenReactPackage;
import com.jadsonlourenco.RNShakeEvent.RNShakeEventPackage;
import com.cboy.rn.splashscreen.SplashScreenReactPackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.zmxv.RNSound.RNSoundPackage;
import com.tapme.RNVolume.VolumePackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
      protected boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
        new MainReactPackage(),
        new SplashScreenReactPackage(),
        new RNShakeEventPackage(),
        new RNSoundPackage(),
        new VolumePackage(),
        new AlarmPackage(),
        new ReactNativePushNotificationPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }
}
