import React, {FunctionComponent} from 'react';
import {
  EmailIcon,
  OptionsHorizontalIcon,
  TextMsgIcon,
  WhatsappIcon,
} from '../../../../../../assets/svg';
import {AppBottomSheet} from '../../../../../../components';
import {useColors} from '../../../../../../hooks/useColors';
import {BaseSheetProps} from '../../../../../../types/Sheet';

const SendSheet: FunctionComponent<{title: string} & BaseSheetProps> = ({
  closeSheet,
  sheetRef,
  title,
}) => {
  const colors = useColors();
  const sendOptionsBtns = [
    {
      name: 'Email',
      Icon: <EmailIcon width={20} height={20} fill={colors.neutral_dark_5} />,
    },
    {
      name: 'Text Message',
      Icon: (
        <TextMsgIcon width={20} height={20} stroke={colors.neutral_dark_5} />
      ),
    },
    {
      name: 'WhatsApp',
      Icon: (
        <WhatsappIcon width={20} height={20} fill={colors.neutral_dark_5} />
      ),
    },
    {
      name: 'More Apps',
      Icon: (
        <OptionsHorizontalIcon
          width={20}
          height={20}
          fill={colors.neutral_dark_5}
        />
      ),
      // onPress: onShare,
    },
  ];
  return (
    <AppBottomSheet
      sheetRef={sheetRef}
      closeSheet={closeSheet}
      title={title}
      optionsBtns={sendOptionsBtns}
    />
  );
};

export default SendSheet;
