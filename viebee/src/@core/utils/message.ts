import { App } from "antd";
import type { MessageInstance } from "antd/es/message/interface";
import type { ArgsProps, NotificationInstance } from "antd/es/notification/interface";

let message: MessageInstance;
let notification: NotificationInstance;

export const setMessageInstance = (msg: MessageInstance, notif: NotificationInstance) => {
  message = msg;
  notification = notif;
};

export const useMessageInit = () => {
  const { message: msg, notification: notif } = App.useApp();
  setMessageInstance(msg, notif);
};

const showMessageError = (content: string = "Có lỗi xảy ra") => message?.error(content);
const showMessageSuccess = (content: string = "Thao tác thành công") => message?.success(content);

const showNotificationError = (description?: string | React.ReactNode, options?: ArgsProps) => {
  return notification?.error({
    ...options,
    title: options?.title ?? "Thao tác không thành công",
    description: description ?? "Đã có lỗi xảy ra trong quá trình xử lý.",
    placement: options?.placement ?? "topRight",
  });
};

const showNotificationSuccess = (description?: string | React.ReactNode, options?: ArgsProps) => {
  return notification?.success({
    ...options,
    title: options?.title ?? "VieBee Thông Báo",
    description: description ?? "Thao tác đã được ghi nhận.",
    placement: options?.placement ?? "topRight",
  });
};

export { showMessageError, showMessageSuccess, showNotificationError, showNotificationSuccess };
