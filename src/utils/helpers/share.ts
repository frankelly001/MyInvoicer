import Share, {ShareOptions} from 'react-native-share';

export const onShare = (shareOptions: ShareOptions) => Share.open(shareOptions);
