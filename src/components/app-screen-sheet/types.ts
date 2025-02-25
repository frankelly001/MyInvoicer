import {ReactNode} from 'react';
import {BaseSheetProps} from '../../types/Sheet';

export type AppScreenSheetProps = {
  title: string;
  children: ReactNode;
} & BaseSheetProps;
