import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserAccount, INITIAL_DEMO_USERS } from "@/src/@core/utils/seed-data";
import { storageHelper } from "@/src/@core/utils/storage";
import { VIEBEE_STORAGE_KEYS } from "@/src/@core/const";

interface AuthState {
  user: UserAccount;
  role: "TRAVELER" | "HOST" | "ADMIN";
}

const initialUser = typeof window !== "undefined"
  ? storageHelper.get<UserAccount>(VIEBEE_STORAGE_KEYS.CURRENT_USER, INITIAL_DEMO_USERS[0])
  : INITIAL_DEMO_USERS[0];

const initialState: AuthState = {
  user: initialUser,
  role: initialUser?.role || "TRAVELER",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserAccount>) => {
      state.user = action.payload;
      state.role = action.payload.role;
      storageHelper.set(VIEBEE_STORAGE_KEYS.CURRENT_USER, action.payload);
    },
    switchRole: (state, action: PayloadAction<"TRAVELER" | "HOST" | "ADMIN">) => {
      const match = INITIAL_DEMO_USERS.find((u) => u.role === action.payload) || INITIAL_DEMO_USERS[0];
      state.user = match;
      state.role = match.role;
      storageHelper.set(VIEBEE_STORAGE_KEYS.CURRENT_USER, match);
    },
  },
});

export const { setUser, switchRole } = authSlice.actions;
export default authSlice.reducer;
