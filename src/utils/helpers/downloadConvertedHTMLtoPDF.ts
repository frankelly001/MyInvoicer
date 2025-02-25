import RNHTMLtoPDF from 'react-native-html-to-pdf';
import {logThis} from './logThis';
import {onShare} from './share';
import {ShareOptions} from 'react-native-share';
import ReactNativeBlobUtil from 'react-native-blob-util';
import {isAndroid, isIOS} from '../../config/const';
import {showToast} from '../../components/app-toast';
import {getErrorMessage} from './getErrorMessage';
import {PermissionsAndroid} from 'react-native';

export const downloadConvertedHTMLtoPDF = async ({
  html,
  fileName,
}: {
  html: string;
  fileName: string | undefined;
}) => {
  try {
    let options: RNHTMLtoPDF.Options = {
      html,
      fileName,
      directory: 'Documents',
      base64: true,
    };

    let file = await RNHTMLtoPDF.convert(options);

    if (isIOS) {
      const saveOptions: ShareOptions = {
        url: file.filePath as string,
        type: 'application/pdf',
        subject: 'Download PDF',
        saveToFiles: true,
      };

      await onShare(saveOptions);
      await ReactNativeBlobUtil.fs.unlink(file.filePath as string);
      showToast('SUCCESS', {
        title: 'File downloaded successfully.',
        message: 'File was downloaded on the selected directory specified',
      });
      return;
    } else if (isAndroid) {
      const hasPermission = await requestAndroidStoragePermission();
      if (hasPermission) {
        // await ReactNativeBlobUtil.fs.writeFile(
        //   ReactNativeBlobUtil.fs.dirs.LegacyDownloadDir +
        //     `/MyInvoicer/PDF/${fileName}.pdf`,
        //   file.base64 as string,
        //   'base64',
        // );
        // await ReactNativeBlobUtil.fs.unlink(file.filePath as string);

        const dirPath =
          ReactNativeBlobUtil.fs.dirs.LegacyDownloadDir + '/MyInvoicer/PDF';
        const filePath = `${dirPath}/${fileName}.pdf`;

        // Check if the directory exists, if not, create it
        const isDirExist = await ReactNativeBlobUtil.fs.isDir(dirPath);
        if (!isDirExist) {
          await ReactNativeBlobUtil.fs.mkdir(dirPath);
        }

        // Now write the file to the directory
        await ReactNativeBlobUtil.fs.writeFile(
          filePath,
          file.base64 as string,
          'base64',
        );
        await ReactNativeBlobUtil.fs.unlink(file.filePath as string);

        showToast('SUCCESS', {
          title: 'File downloaded successfully.',
          message: 'File was downloaded on downloads directory',
        });
      } else {
        showToast('INFO', {
          title: 'Storage Permisson is required',
          message: 'Please enable storage permission',
        });
      }
      return;
    }
  } catch (error) {
    showToast('ERROR', {
      title: 'File downloaded failed!',
      message: getErrorMessage(error),
    });
    logThis(error);
  }
};

const requestAndroidStoragePermission = async () => {
  try {
    const isGranted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    );
    if (isGranted) {
      return isGranted;
    } else {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
  } catch (err) {
    return false;
  }
};
