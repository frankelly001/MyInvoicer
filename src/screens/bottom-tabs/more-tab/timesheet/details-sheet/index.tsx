import {useNavigation} from '@react-navigation/native';
import React, {FunctionComponent, ReactNode} from 'react';
import {View} from 'react-native';
import {FileBoldIcon, ProfileIcon} from '../../../../../assets/svg';
import {
  AppBottomSheet,
  AppButton,
  AppText,
  DashedView,
  ProfileCard,
} from '../../../../../components';
import {COLOR_TYPES} from '../../../../../config/const';
import {useColors} from '../../../../../hooks/useColors';
import {routesNames} from '../../../../../navigation/routes';
import {GeneralNavProp} from '../../../../../navigation/types';
import {BaseSheetProps} from '../../../../../types/Sheet';
import {TimeSheet} from '../../../../../types/TimeSheet';
import {
  EMPTY_STRING,
  NOT_AVAILABLE,
} from '../../../../../utils/constants/fieldDefaultValues';
import {statusStyles} from '../../../../../utils/constants/status';
import {
  convertFormatTimeToHr,
  convertToReadableTimeFormat,
} from '../../../../../utils/helpers';
import {timeDetailsSheetStyles} from './styles';

const TimeDetailsSheet: FunctionComponent<
  {
    data: TimeSheet;
    onPressEdit?: () => void;
  } & BaseSheetProps
> = ({data, closeSheet = () => null, sheetRef, onPressEdit}) => {
  const styles = timeDetailsSheetStyles;
  const colors = useColors();
  const details: {
    price?: string | undefined;
    label: string;
    color?: COLOR_TYPES;
  }[] = [
    {price: convertToReadableTimeFormat(data?.time), label: 'Time'},
    {
      price: data?.timesheetStatus,
      label: 'Status',
      color: statusStyles?.[data?.timesheetStatus]?.color2,
    },
  ];
  const navigation = useNavigation<GeneralNavProp>();

  const billDetails: {
    type: 'to' | 'on';
    name: string;
    value: string;
    Icon: ReactNode;
    onPress: () => void;
  }[] = [
    {
      type: 'to',
      name: data?.billTo?.name,
      value: data?.billTo?.email,
      Icon: <ProfileIcon fill={colors?.highlight_2} />,
      onPress: () =>
        navigation.navigate(routesNames.CUSTOMER_DETAILS, {
          customerId: data?.billTo?.id,
          customerName: data?.billTo?.name,
        }),
    },
    ...(data?.invoiceId
      ? [
          {
            type: 'on' as const,
            name: 'Billed',
            value: 'Status',
            Icon: <FileBoldIcon />,
            onPress: () =>
              navigation.navigate(routesNames.PREVIEW_INVOICE, {
                invoiceId: data?.invoiceId,
              }),
          },
        ]
      : []),
  ];

  return (
    <AppBottomSheet
      title={data?.title}
      sheetRef={sheetRef}
      closeSheet={closeSheet}
      FooterComponent={
        <View style={styles.footerContanier}>
          <AppButton
            text="Edit"
            buttonColor="transparent"
            borderColor="highlight_5"
            textColor="highlight_5"
            style={styles.submitBtn}
            onPress={onPressEdit}
          />
          <AppButton
            text="Add to Bill"
            style={styles.submitBtn}
            onPress={() => {
              closeSheet();
              navigation.navigate(routesNames.CREATE_INVOICE, {
                billTo: {
                  address: data?.billTo?.address ?? EMPTY_STRING,
                  email: data?.billTo?.email ?? EMPTY_STRING,
                  fullname: data?.billTo?.name ?? EMPTY_STRING,
                  phone: data?.billTo?.phone ?? EMPTY_STRING,
                },
                currency: data?.currency,
                timesheetId: data?.id,
                items: [
                  {
                    description: data?.note ?? EMPTY_STRING,
                    productName: data?.title ?? EMPTY_STRING,
                    price: data?.rate,
                    unit: 'hour',
                    quantity: `${convertFormatTimeToHr(data?.time)}`,
                    total: `${
                      Number(data?.rate) * convertFormatTimeToHr(data?.time)
                    }`,
                  },
                ],
              });
            }}
          />
        </View>
      }>
      <View style={styles.container}>
        <View style={styles.detailsContainer}>
          {details.map(item => (
            <DashedView
              key={item.label}
              value={item.price ?? NOT_AVAILABLE}
              label={item.label}
              valueColor={item?.color}
            />
          ))}
        </View>
        <DashedView value={'20-10-2023'} label={'Date'} />
        {billDetails.map((item, i) => (
          <View key={i} style={styles.billInfoContainer}>
            <AppText text={`Billed ${item.type}`} type="heading_h5" />
            <ProfileCard
              fullname={item.name}
              email={item.value}
              imageSize={50}
              IconContent={item.Icon}
              onPress={() => {
                item.onPress();
                closeSheet();
              }}
            />
          </View>
        ))}
      </View>
    </AppBottomSheet>
  );
};

export default TimeDetailsSheet;
