export type toastTypeProps = 'SUCCESS' | 'ERROR' | 'WARNING' | 'INFO';

export type appToastViewProps = {
  message: string | undefined;
  title: string | undefined;
  type: toastTypeProps;
  onHide: () => void;
};
