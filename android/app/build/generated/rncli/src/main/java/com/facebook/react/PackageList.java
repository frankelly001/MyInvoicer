
package com.facebook.react;

import android.app.Application;
import android.content.Context;
import android.content.res.Resources;

import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainPackageConfig;
import com.facebook.react.shell.MainReactPackage;
import java.util.Arrays;
import java.util.ArrayList;

// react-native-vector-icons
import com.oblador.vectoricons.VectorIconsPackage;
// @react-native-community/clipboard
import com.reactnativecommunity.clipboard.ClipboardPackage;
// @react-native-masked-view/masked-view
import org.reactnative.maskedview.RNCMaskedViewPackage;
// @shopify/flash-list
import com.shopify.reactnative.flash_list.ReactNativeFlashListPackage;
// @stripe/stripe-react-native
import com.reactnativestripesdk.StripeSdkPackage;
// lottie-react-native
import com.airbnb.android.react.lottie.LottiePackage;
// react-native-background-timer
import com.ocetnik.timer.BackgroundTimerPackage;
// react-native-blob-util
import com.ReactNativeBlobUtil.ReactNativeBlobUtilPackage;
// react-native-contacts
import com.rt2zz.reactnativecontacts.ReactNativeContacts;
// react-native-date-picker
import com.henninghall.date_picker.DatePickerPackage;
// react-native-gesture-handler
import com.swmansion.gesturehandler.RNGestureHandlerPackage;
// react-native-html-to-pdf
import com.christopherdro.htmltopdf.RNHTMLtoPDFPackage;
// react-native-image-crop-picker
import com.reactnative.ivpusic.imagepicker.PickerPackage;
// react-native-linear-gradient
import com.BV.LinearGradient.LinearGradientPackage;
// react-native-mmkv
import com.reactnativemmkv.MmkvPackage;
// react-native-reanimated
import com.swmansion.reanimated.ReanimatedPackage;
// react-native-safe-area-context
import com.th3rdwave.safeareacontext.SafeAreaContextPackage;
// react-native-screens
import com.swmansion.rnscreens.RNScreensPackage;
// react-native-share
import cl.json.RNSharePackage;
// react-native-svg
import com.horcrux.svg.SvgPackage;
// react-native-webview
import com.reactnativecommunity.webview.RNCWebViewPackage;

public class PackageList {
  private Application application;
  private ReactNativeHost reactNativeHost;
  private MainPackageConfig mConfig;

  public PackageList(ReactNativeHost reactNativeHost) {
    this(reactNativeHost, null);
  }

  public PackageList(Application application) {
    this(application, null);
  }

  public PackageList(ReactNativeHost reactNativeHost, MainPackageConfig config) {
    this.reactNativeHost = reactNativeHost;
    mConfig = config;
  }

  public PackageList(Application application, MainPackageConfig config) {
    this.reactNativeHost = null;
    this.application = application;
    mConfig = config;
  }

  private ReactNativeHost getReactNativeHost() {
    return this.reactNativeHost;
  }

  private Resources getResources() {
    return this.getApplication().getResources();
  }

  private Application getApplication() {
    if (this.reactNativeHost == null) return this.application;
    return this.reactNativeHost.getApplication();
  }

  private Context getApplicationContext() {
    return this.getApplication().getApplicationContext();
  }

  public ArrayList<ReactPackage> getPackages() {
    return new ArrayList<>(Arrays.<ReactPackage>asList(
      new MainReactPackage(mConfig),
      new VectorIconsPackage(),
      new ClipboardPackage(),
      new RNCMaskedViewPackage(),
      new ReactNativeFlashListPackage(),
      new StripeSdkPackage(),
      new LottiePackage(),
      new BackgroundTimerPackage(),
      new ReactNativeBlobUtilPackage(),
      new ReactNativeContacts(),
      new DatePickerPackage(),
      new RNGestureHandlerPackage(),
      new RNHTMLtoPDFPackage(),
      new PickerPackage(),
      new LinearGradientPackage(),
      new MmkvPackage(),
      new ReanimatedPackage(),
      new SafeAreaContextPackage(),
      new RNScreensPackage(),
      new RNSharePackage(),
      new SvgPackage(),
      new RNCWebViewPackage()
    ));
  }
}
