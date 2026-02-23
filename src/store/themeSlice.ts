import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: localStorage.getItem("wytTheme") || "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state, action) => {
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
