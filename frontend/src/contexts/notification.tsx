import { Dispatch, SetStateAction, createContext, useState } from "react";

export const Context = createContext<
  | {
      notificationMessage: string;
      setNotificationMessage: Dispatch<SetStateAction<string>>;
    }
  | undefined
>(undefined);

export function Provider({ children }: { children: any }) {
  const [notification, setNotification] = useState("This is a notification");

  return (
    <Context.Provider
      value={{
        notificationMessage: notification,
        setNotificationMessage: setNotification,
      }}>
      {children}
    </Context.Provider>
  );
}
