import {HttpSuccessResponse} from '../../../types/ApiResponse';
import {UploadFile} from '../../../types/UploadFile';
import {httpService} from '../httpService';
import {FileProps} from './type';

export const convertFileToFormData = ({
  path,
  mime,
  name,
}: FileProps): FormData => {
  const formData = new FormData();
  formData.append('file', {
    uri: path,
    type: mime,
    name,
  });
  return formData;
};
export const uploadFile = async (
  props: FileProps,
): Promise<HttpSuccessResponse<UploadFile>> => {
  const formData = convertFileToFormData(props);
  return await httpService().post('/cloudinary-upload-image', formData);
};
