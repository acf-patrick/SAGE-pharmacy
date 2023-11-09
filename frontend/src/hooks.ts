import { useContext } from "react";
import { NotificationContext } from "./contexts";

export function useNotification() {
  const ctx = useContext(NotificationContext);
  return {
    notification: ctx ? ctx.notificationMessage : "",
    pushNotification: (notification: string) => {
      if (ctx?.setNotificationMessage) {
        ctx.setNotificationMessage(notification);
      }
    },
  };
}
