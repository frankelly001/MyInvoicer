export type OtpProps = {
  pin?: string;
  pinCount?: any | undefined;
  onCodeFilled?: (text: string) => void;
  ref?: any;
  hidden?: boolean;
  bg?: any;
  clearInputs?: boolean;
  autoFocusOnLoad?: boolean;
  onCodeChanged: (e: any) => void;
};
