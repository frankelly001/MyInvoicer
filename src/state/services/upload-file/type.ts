export type FileProps = {
  path: string;
  mime: string;
  name: string;
};

export type UploadFilePayloadApiArg = {
  uploadFile: FileProps;
};
