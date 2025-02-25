import {CreateEstimate, UpdateEstimate} from '../../../types/Estimates';
import {EstimateStatusTypes} from '../../../utils/constants/status';

export type CreateEstimatePayloadApiArg = {
  createEstimate: Omit<CreateEstimate, 'amountDeposited'>;
};
export type UpdateEstimatePayloadApiArg = {
  updateEstimate: Omit<UpdateEstimate, 'amountDeposited'>;
};
export type CommonEstimatePayloadApiArg = {
  estimateId: string;
};
export type DeleteMultipleEstimatePayloadApiArg = {
  arrayOfEstimateId: string[];
};
export type GetEstimateByStatusPayloadApiArg = {
  page?: number;
  recordStatus: EstimateStatusTypes;
};
