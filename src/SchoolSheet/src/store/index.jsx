import { configureStore } from "@reduxjs/toolkit";
import FellowShipReducer from "./schoolSheetSlices/schoolStore";

const store = configureStore({
	reducer: { fellowShipStore: FellowShipReducer },
});
export default store;
