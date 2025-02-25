export type CommonNotificationPayloadApiArg = {
  notificationId: string;
};
export type DeleteMultipleNotificationPayloadApiArg = {
  arrayOfNotificationId: string[];
};

export type GetAllNotificationPayloadApiArg = {
  page?: number;
  filter?: 'read' | 'unread';
  documentCount?: number;
};
