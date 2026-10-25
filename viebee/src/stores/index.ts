import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import workshopReducer from "./slices/workshopSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    workshop: workshopReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
