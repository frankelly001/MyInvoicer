import {CreateBusiness, UpdateBusiness} from '../../../types/Business';

export type CreateBusinessPayloadApiArg = {
  createBusiness: CreateBusiness | Omit<UpdateBusiness, 'businessId'>;
};

type InvoiceSettingsPayloadApiArg = {
  invoiceTermsAndConditions: string;
  invoiceNotes: string;
};

type EstimateSettingsPayloadApiArg = {
  estimateTermsAndConditions: string;
  estimateNotes: string;
};

type OrderSettingsPayloadApiArg = {
  orderTermsAndConditions: string;
  orderNotes: string;
};

type ReceiptSettingsPayloadApiArg = {
  receiptNotes: string;
};

export type UpdateBusinessSettings =
  | InvoiceSettingsPayloadApiArg
  | EstimateSettingsPayloadApiArg
  | OrderSettingsPayloadApiArg
  | ReceiptSettingsPayloadApiArg;

export type UpdateBusinessPayloadApiArg =
  | {
      updateBusiness: UpdateBusiness;
      updateBusinessSettings?: undefined;
    }
  | {
      updateBusiness?: undefined;
      updateBusinessSettings: UpdateBusinessSettings & {businessId: string};
    };
export type DeactivateBusinessPayloadApiArg = {
  deactivateBusiness: {businessId: string; reason: string};
};

export type GetAllBusinessesPayloadApiArg = {
  page?: number;
  documentCount?: number;
};

export type GetAllBusinessByIdPayloadApiArg = {
  businessId: string;
};
