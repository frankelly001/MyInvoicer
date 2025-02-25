import {REQUEST_METHODS} from '../../../utils/constants/reqMethods';
import {HttpSuccessResponse} from '../../../types/ApiResponse';
import {UploadFile} from '../../../types/UploadFile';
import {baseApi as api} from '../baseApi';
import {uploadFileEndpoints} from './endpoints';
import {UploadFilePayloadApiArg} from './type';
import {convertFileToFormData} from './uploadFile';

const injectedRtkApi = api.injectEndpoints({
  endpoints: build => ({
    uploadFileApi: build.mutation<
      HttpSuccessResponse<UploadFile>,
      UploadFilePayloadApiArg
    >({
      query: arg => ({
        url: uploadFileEndpoints.CLOUDINARY_UPLOAD_IMAGE,
        method: REQUEST_METHODS.POST,
        body: convertFileToFormData(arg.uploadFile),
        FormData: true,
      }),
    }),
  }),
});
export {injectedRtkApi as uploadFileApi};
export const {useUploadFileApiMutation} = injectedRtkApi;
