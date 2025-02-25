import React, {FunctionComponent, ReactNode, useState} from 'react';
import {Control, useController} from 'react-hook-form';
import {Contact, PostalAddress} from 'react-native-contacts';
import {
  ContactIcon,
  EmailIcon,
  PhoneIcon,
} from '../../../../../../../assets/svg';
import {
  AppSearchInput,
  AppSeperator,
  AppSheetList,
  AppText,
} from '../../../../../../../components';
import AppListButton from '../../../../../../../components/app-list-button';
import {useColors} from '../../../../../../../hooks/useColors';
import {useSheet} from '../../../../../../../hooks/useSheet';
import {BaseSheetProps} from '../../../../../../../types/Sheet';
import {EMPTY_STRING} from '../../../../../../../utils/constants/fieldDefaultValues';
import {GeneralBillFormSchemaType} from '../../schema';
import {customerSelectSheetStyles} from './styles';

type ContactType = Pick<
  Contact,
  'recordID' | 'phoneNumbers' | 'emailAddresses' | 'postalAddresses'
> & {fullName: string};

const parseAddress = (address: PostalAddress | undefined) => {
  return (
    address?.formattedAddress ??
    `${address?.street ?? ''} ${address?.city ?? ''} ${address?.state ?? ''} ${
      address?.postCode ?? ''
    } ${address?.country ?? ''}`
      .trim()
      .replace(/\s+/g, ' ')
  );
};

const ContactSelectSheet: FunctionComponent<
  {
    control: Control<GeneralBillFormSchemaType>;
    contacts: ContactType[];
  } & BaseSheetProps
> = ({closeSheet = () => null, sheetRef, control, contacts}) => {
  const styles = customerSelectSheetStyles;
  const [selectedContact, setSelectedContact] = useState<ContactType>();
  const [query, setQuery] = useState('');
  const colors = useColors();

  const {
    field: {onChange: onChangeFullname},
  } = useController({control, name: 'fullname'});
  const {
    field: {onChange: onChangeEmail},
  } = useController({control, name: 'email'});
  const {
    field: {onChange: onChangePhone},
  } = useController({control, name: 'phone'});
  const {
    field: {onChange: onChangeAddress},
  } = useController({control, name: 'address'});

  const filteredConatact = contacts.filter(el =>
    el.fullName.toLowerCase().trim().includes(query.toLowerCase().trim()),
  );

  const {
    closeSheet: closePhoneSheet,
    openSheet: openPhoneSheet,
    sheetRef: phonesheetRef,
  } = useSheet();
  const {
    closeSheet: closeAddressSheet,
    openSheet: openAddressSheet,
    sheetRef: addresssheetRef,
  } = useSheet();
  const {
    closeSheet: closeEmailSheet,
    openSheet: openEmailSheet,
    sheetRef: emailsheetRef,
  } = useSheet();

  const resetFields = () => {
    onChangeFullname(EMPTY_STRING);
    onChangeEmail(EMPTY_STRING);
    onChangePhone(EMPTY_STRING);
    onChangeAddress(EMPTY_STRING);
  };

  return (
    <>
      <AppSheetList
        sheetRef={sheetRef}
        closeSheet={closeSheet}
        title="Select Contacts"
        panGestureEnabled={false}
        adjustToContentHeight={false}
        AdditionalHeaderContent={
          <AppSearchInput
            placeholder="Search invoices"
            containerStyle={styles.searchContainer}
            value={query}
            onChangeText={setQuery}
          />
        }
        initialNumToRender={20}
        data={filteredConatact}
        keyExtractor={item => item.recordID}
        // eslint-disable-next-line react/no-unstable-nested-components
        ItemSeparatorComponent={() => <AppSeperator paddingHorizontal={16} />}
        renderItem={({item}) => (
          <AppListButton
            title={item.fullName}
            titleSize={'heading_h5'}
            onPress={() => {
              setSelectedContact(item);
              resetFields();
              closeSheet();
              onChangeFullname(item.fullName.trim().replace(/\s+/g, ' ') || '');
              if (item.phoneNumbers.length > 1) {
                openPhoneSheet();
              } else {
                onChangePhone(item.phoneNumbers[0].number);
                if (item.emailAddresses.length > 1) {
                  openEmailSheet();
                } else {
                  onChangeEmail(
                    item.emailAddresses[0]?.email.trim().replace(/\s+/g, ' '),
                  );
                  if (item.postalAddresses.length > 1) {
                    openAddressSheet();
                  } else {
                    const address = item?.postalAddresses[0];
                    onChangeAddress(parseAddress(address));
                  }
                }
              }
            }}
          />
        )}
      />
      <ContactDetailInputSheet
        sheetRef={phonesheetRef}
        closeSheet={closePhoneSheet}
        title="Select Phone number"
        data={(selectedContact?.phoneNumbers ?? []).map(el => ({
          value: el?.number,
          label: el?.label,
        }))}
        onChange={selected => {
          onChangePhone(selected);
          if ((selectedContact?.emailAddresses ?? [])?.length > 1) {
            openEmailSheet();
          } else {
            onChangeEmail(
              selectedContact?.emailAddresses[0]?.email
                .trim()
                .replace(/\s+/g, ' '),
            );
            if ((selectedContact?.postalAddresses ?? []).length > 1) {
              openAddressSheet();
            } else {
              const address = selectedContact?.postalAddresses[0];
              onChangeAddress(parseAddress(address));
            }
          }
        }}
        Icon={<PhoneIcon stroke={colors.neutral_dark_4} />}
      />
      <ContactDetailInputSheet
        sheetRef={emailsheetRef}
        closeSheet={closeEmailSheet}
        title="Select Email"
        data={(selectedContact?.emailAddresses ?? []).map(el => ({
          value: el?.email,
          label: el?.label,
        }))}
        onChange={selected => {
          onChangeEmail(selectedContact?.emailAddresses[0]?.email);
          if ((selectedContact?.postalAddresses ?? [])?.length > 1) {
            openAddressSheet();
          } else {
            onChangeAddress(selected);
          }
        }}
        Icon={<EmailIcon fill={colors.neutral_dark_4} />}
      />
      <ContactDetailInputSheet
        sheetRef={addresssheetRef}
        closeSheet={closeAddressSheet}
        title="Select Address"
        data={(selectedContact?.postalAddresses ?? []).map(el => ({
          value: parseAddress(el),
          label: el.label,
        }))}
        onChange={selected => {
          onChangeAddress(selected);
        }}
        Icon={<ContactIcon fill={colors.neutral_dark_4} />}
      />
    </>
  );
};

export default ContactSelectSheet;

const ContactDetailInputSheet: FunctionComponent<
  BaseSheetProps & {
    onChange: (text: string) => void;
    data: {label: string; value: string}[];
    Icon: ReactNode;
    title: string;
  }
> = ({closeSheet = () => null, sheetRef, onChange, data, Icon, title}) => {
  return (
    <AppSheetList
      sheetRef={sheetRef}
      closeSheet={closeSheet}
      data={data}
      title={title}
      keyExtractor={(item, index) => `${item}-${index}`}
      // eslint-disable-next-line react/no-unstable-nested-components
      ItemSeparatorComponent={() => <AppSeperator paddingHorizontal={16} />}
      renderItem={({item}) => (
        <AppListButton
          title={[
            <AppText
              key={0}
              type="body_m"
              color="neutral_dark_5"
              text={item.value}
            />,

            <AppText
              key={2}
              type="body_s"
              color="support_warning_3"
              text={` (${item.label})`}
            />,
          ]}
          LeftIcon={Icon}
          onPress={() => {
            onChange(item.value);
            closeSheet();
          }}
        />
      )}
    />
  );
};
