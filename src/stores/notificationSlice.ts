import { StateCreator } from "zustand";

type Notification = {
  text: string;
  error: boolean;
  show: boolean;
};

export type NotificationSliceType = {
  notification: Notification;
  showNotification: (payload: Pick<Notification, "text" | "error">) => void;
  closeNotification: () => void;
};

export const createNotificationSlice: StateCreator<NotificationSliceType> = (
  set
) => ({
  notification: {
    text: "",
    error: false,
    show: false,
  },
  showNotification: ({ text, error }) => {
    set((state) => ({
      notification: {
        ...state.notification,
        text,
        error,
        show: true,
      },
    }));
    setTimeout(() => {
      set((state) => ({
        notification: {
          ...state.notification,
          show: false,
        },
      }));
    }, 3000);
  },
  closeNotification: () => {
    set((state) => ({
      notification: {
        ...state.notification,
        show: false,
      },
    }));
  },
});
