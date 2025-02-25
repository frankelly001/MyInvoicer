import React, {FunctionComponent, useState} from 'react';
import {ActivityIndicator, TouchableOpacity, View} from 'react-native';
import WebView from 'react-native-webview';
import {ArrowLeftIcon, OptionsCircleIcon} from '../../../../../assets/svg';
import {
  AppAlert,
  AppButton,
  AppHeader,
  AppScreen,
  BillPreviewLoader,
} from '../../../../../components';
import {useColors} from '../../../../../hooks/useColors';
import {useSheet} from '../../../../../hooks/useSheet';
import {BillType} from '../../../../../types/Billing';
import {downloadConvertedHTMLtoPDF} from '../../../../../utils/helpers';
import SendSheet from './send-sheet';
import {previewInvoicestyles} from './styles';

const BillPreviewScreen: FunctionComponent<{
  html: string | undefined;
  type: BillType;
  fileName: string | undefined;
  onMorePress: () => void;
  isLoading?: boolean;
}> = ({html = '', type, onMorePress, isLoading, fileName}) => {
  const colors = useColors();
  const styles = previewInvoicestyles({colors});

  const {
    sheetRef: sendOptsSheetRef,
    closeSheet: sendOptsCloseSheet,
    openSheet: sendOptsOpenSheet,
  } = useSheet();

  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      await downloadConvertedHTMLtoPDF({html, fileName});
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <>
      <AppScreen
        isScrollable={false}
        ScreenHeader={
          <AppHeader
            LeftContent={<ArrowLeftIcon fill={colors.highlight_5} />}
            middleTitle={`${type} Preview`}
            RightContent={
              <TouchableOpacity style={styles.icon} onPress={onMorePress}>
                <OptionsCircleIcon />
              </TouchableOpacity>
            }
          />
        }>
        <View style={styles.flex1}>
          {isLoading ? (
            <BillPreviewLoader />
          ) : html ? (
            <WebView
              source={{html}}
              style={styles.pdfView}
              setDisplayZoomControls={false}
              renderLoading={() => (
                <ActivityIndicator color={colors.highlight_5} size={50} />
              )}
              nativeConfig={{}}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            />
          ) : (
            <View style={styles.pdfView}>
              <AppAlert
                title={'Data not available'}
                description={`This ${type} data is no longer available`}
                removeButton
                containerStyle={styles.appAlert}
              />
            </View>
          )}

          {html && (
            <View style={styles.submitBtn}>
              <AppButton
                text="Download"
                buttonColor="neutral_light_1"
                textColor="highlight_5"
                borderColor="highlight_5"
                borderWidth={1.5}
                disabled={isDownloading}
                isLoading={isDownloading}
                onPress={handleDownload}
                style={styles.btn}
              />

              <AppButton
                onPress={sendOptsOpenSheet}
                text="Send"
                borderWidth={1.5}
                borderColor="highlight_5"
                style={styles.btn}
              />
            </View>
          )}
        </View>

        <SendSheet
          sheetRef={sendOptsSheetRef}
          closeSheet={sendOptsCloseSheet}
          title={`Send ${type}`}
        />
      </AppScreen>
    </>
  );
};

export default BillPreviewScreen;
