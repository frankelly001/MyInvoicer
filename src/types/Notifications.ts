export interface Notification {
  isRead: boolean;
  createdAt: string;
  _id: string;
  account: string;
  title: string;
  message: string;
  __v: number;
  id: string;
  iconUrl: string;
  type: 'estimate' | 'invoice' | 'order' | 'receipt' | 'customer' | 'timesheet';
  objectId: string;
}

export interface MarkAsReadOrUnRead {
  notificationId: string;
  type: string;
}
