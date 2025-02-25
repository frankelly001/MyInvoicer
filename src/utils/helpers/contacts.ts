import Contacts, {Contact} from 'react-native-contacts';

export const checkContactPermission = async () => {
  const isGranted = await Contacts.checkPermission();
  if (isGranted !== 'authorized') {
    const request = await Contacts.requestPermission();
    if (request !== 'authorized') {
      return false;
    }
  }
  return true;
};

export const getAllContacts = async (): Promise<Contact[] | null> => {
  const isGranted = await checkContactPermission();
  return isGranted ? await Contacts.getAll() : null;
};
