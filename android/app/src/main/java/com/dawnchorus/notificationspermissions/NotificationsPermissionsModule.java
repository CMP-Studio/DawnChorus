//** **//
package com.dawnchorus.androidnotificationpermissions;

import android.app.Activity;
import com.facebook.react.bridge.ReactContextBaseJavaModule;

import android.support.v4.app.NotificationManagerCompat;
import android.content.Context;
import android.content.Intent;
import android.provider.Settings;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;


import java.util.Map;

public class NotificationsPermissionsModule extends ReactContextBaseJavaModule {

    public NotificationsPermissionsModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "NotificationsPermissions";
    }

    @ReactMethod
    public void checkPermissions(Promise promise) {
      final Activity activity = getCurrentActivity();
      if (activity != null) {
        boolean result = NotificationManagerCompat.from(activity).areNotificationsEnabled();
        promise.resolve(result || false);
      } else {
        promise.reject("ERROR checking permissions");
      }
    }

    @ReactMethod
    public void goToSettings() {
      final Activity activity = getCurrentActivity();
      if (activity != null) {
        Intent intent = new Intent();
        if (intent != null) {
          intent.setAction("android.settings.APP_NOTIFICATION_SETTINGS");
          intent.putExtra("app_package", activity.getPackageName());
          intent.putExtra("app_uid", activity.getApplicationInfo().uid);
          activity.startActivity(intent);
        }
      }
    }
}
