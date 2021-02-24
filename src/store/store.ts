import { configureStore } from "@reduxjs/toolkit";
import { gameSlice, tick } from "./gameSlice";

const TICKS_PER_SECOND = 8;

const store = configureStore({
  reducer: {
    game: gameSlice.reducer,
  },
});

let tickCounter = 0;
setInterval(() => {
  store.dispatch(tick(tickCounter));
  tickCounter = (tickCounter + 1) % TICKS_PER_SECOND;
}, 1000 / TICKS_PER_SECOND);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
