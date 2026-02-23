import { createSlice } from "@reduxjs/toolkit";

type Theme = "light" | "dark";

interface ThemeState {
  theme: Theme;
}

const initialState: ThemeState = {
  theme: (localStorage.getItem("wytTheme") as Theme) || "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      if (state.theme === "dark") {
        state.theme = "light";
        localStorage.setItem("wytTheme", "light");
        document.documentElement.classList.remove("dark");
      } else {
        state.theme = "dark";
        localStorage.setItem("wytTheme", "dark");
        document.documentElement.classList.add("dark");
      }
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
