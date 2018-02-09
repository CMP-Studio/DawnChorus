package com.dawnchorus;

import android.os.Bundle;
import android.view.Window;
import android.view.WindowManager;
import com.cboy.rn.splashscreen.SplashScreen;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import android.graphics.Color;

import android.app.Activity;
import android.util.Log;
import javax.annotation.Nullable;


public class MainActivity extends ReactActivity {
  
    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "DawnChorus";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        // Put splash screen up
        SplashScreen.show(this, false);

        super.onCreate(savedInstanceState);
        final Window win = getWindow();
        win.addFlags(WindowManager.LayoutParams.FLAG_SHOW_WHEN_LOCKED |
                WindowManager.LayoutParams.FLAG_DISMISS_KEYGUARD |
                WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON |
                WindowManager.LayoutParams.FLAG_TURN_SCREEN_ON |
                WindowManager.LayoutParams.FLAG_ALLOW_LOCK_WHILE_SCREEN_ON);
    }

    public static class AlarmActivityDelegate extends ReactActivityDelegate {
        private static final String ALARM_ID = "alarmID";
        private static final String MISSED_ALARMS = "missedAlarms";
        private Bundle mInitialProps = null;
        private final @Nullable Activity mActivity;

        public AlarmActivityDelegate(Activity activity, String mainComponentName) {
            super(activity, mainComponentName);
            this.mActivity = activity;
        }

        @Override
        protected void onCreate(Bundle savedInstanceState) {
            mInitialProps = new Bundle();
            // bundle is where we put our alarmID with launchIntent.putExtra
            Bundle bundle = mActivity.getIntent().getExtras();
            if (bundle != null && bundle.containsKey(ALARM_ID)) {
                // put any initialProps here
                mInitialProps.putString(ALARM_ID, bundle.getString(ALARM_ID));
            }
            if (bundle != null && bundle.containsKey(MISSED_ALARMS)) {
                // put any initialProps here
                mInitialProps.putString(MISSED_ALARMS, bundle.getString(MISSED_ALARMS));
            }
            super.onCreate(savedInstanceState);
        }

        @Override
        protected Bundle getLaunchOptions() {
            return mInitialProps;
        }
    };

    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new AlarmActivityDelegate(this, getMainComponentName());
    }
}
