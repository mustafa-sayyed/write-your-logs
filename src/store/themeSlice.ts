import config from "@/config/config";
import { createSlice } from "@reduxjs/toolkit";

type Theme = "light" | "dark";

interface ThemeState {
  theme: Theme;
}

const initialState: ThemeState = {
  theme: (localStorage.getItem(config.themeStorageKey) as Theme) || "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      if (state.theme === "dark") {
        state.theme = "light";
        localStorage.setItem(config.themeStorageKey, "light");
        document.documentElement.classList.remove("dark");
      } else {
        state.theme = "dark";
        localStorage.setItem(config.themeStorageKey, "dark");
        document.documentElement.classList.add("dark");
      }
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
