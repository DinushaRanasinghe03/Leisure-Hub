// atoms/isSearchOpenState.js
import { atom, selector } from "recoil";

export const selectDate = atom({
  key: "selectDate",
  default: new Date(),
});

export const selectShowTime = atom({
  key: "selectShowTime",
  default: null,
});

export const selectSeats = atom({
  key: "selectSeats",
  default: [],
});

export const seatsCount = atom({
  key: "seatsCount",
  default: null,
});

export const seatsChildCount = atom({
  key: "seatsChildCount",
  default: null,
});

export const userInfo = atom({
  key: "userInfo",
  default: [],
});

export const priceDetails = atom({
  key: "priceDetails",
  default: [],
});




