// atoms/isSearchOpenState.js
import { atom, selector } from "recoil";

export const selectDate = atom({
  key: "selectDate",
  default: new Date(),
});

export const selectShowTime = atom({
  key: "selectShowTime",
  default: [],
});

export const selectSeats = atom({
  key: "selectSeats",
  default: [],
});

export const seatsCount = atom({
  key: "seatsCount",
  default: 0,
});

export const seatsChildCount = atom({
  key: "seatsChildCount",
  default: 0,
});

export const userInfo = atom({
  key: "userInfo",
  default: [],
});

export const priceDetails = atom({
  key: "priceDetails",
  default: [],
});

export const moviesSchedules = atom({
  key: "moviesSchedules",
  default: [],
});