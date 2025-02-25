import {Linking} from 'react-native';
import {showToast} from '../../components/app-toast';
import {getErrorMessage} from './getErrorMessage';
import {EMPTY_STRING} from '../constants/fieldDefaultValues';

const makePhoneCall = async (phone: string | undefined | null) => {
  if (phone) {
    try {
      await Linking.openURL(`tel: ${phone}`);
    } catch (error) {
      console.error('This device cannot make a phone call');
      showToast('ERROR', {
        title: 'Phone call error encountered',
        message: getErrorMessage(error),
      });
    }
  } else {
    showToast('INFO', {
      title: 'Phone number not available',
      message: 'No phone number to dial',
    });
  }
};

const sendEmail = async ({
  email,
  body,
  subject,
}: {
  email: string | undefined | null;
  subject?: string | undefined | null;
  body?: string | undefined | null;
}) => {
  if (email) {
    try {
      Linking.openURL(
        `mailto:${email}?subject=${subject || EMPTY_STRING}&body=${
          body || EMPTY_STRING
        }`,
      );
    } catch (error) {
      console.error('This device cannot send mail');
      showToast('ERROR', {
        title: 'Send email error encountered',
        message: getErrorMessage(error),
      });
    }
  } else {
    showToast('INFO', {
      title: 'Email not available',
      message: 'No email to available to send',
    });
  }
};

export {makePhoneCall, sendEmail};
