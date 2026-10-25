import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WorkshopItem, INITIAL_WORKSHOPS } from "@/src/@core/utils/seed-data";

interface WorkshopState {
  workshops: WorkshopItem[];
  selectedCategory: string;
  searchQuery: string;
  selectedWorkshop: WorkshopItem | null;
  loading: boolean;
}

const initialState: WorkshopState = {
  workshops: INITIAL_WORKSHOPS,
  selectedCategory: "all",
  searchQuery: "",
  selectedWorkshop: null,
  loading: false,
};

export const workshopSlice = createSlice({
  name: "workshop",
  initialState,
  reducers: {
    setWorkshops: (state, action: PayloadAction<WorkshopItem[]>) => {
      state.workshops = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSelectedWorkshop: (state, action: PayloadAction<WorkshopItem | null>) => {
      state.selectedWorkshop = action.payload;
    },
    addWorkshop: (state, action: PayloadAction<WorkshopItem>) => {
      state.workshops.unshift(action.payload);
    },
  },
});

export const {
  setWorkshops,
  setSelectedCategory,
  setSearchQuery,
  setSelectedWorkshop,
  addWorkshop,
} = workshopSlice.actions;

export default workshopSlice.reducer;
