import { configureStore } from "@reduxjs/toolkit";
import vehiclesReducer from "./reducers/vehicleSlice";
import binsReducer from "./reducers/binSlice";
import driversReducer from "./reducers/driverSlice";
import companiesReducer from "./reducers/companySlice";
import authReducer from "./reducers/authSlice";
import notiReducer from "./reducers/notiSlice";
import waypointsReducer from "./reducers/waypointSlice";
import tasksReducer from "./reducers/taskSlice";

const store = configureStore({
  reducer: {
    vehiclesReducer,
    binsReducer,
    driversReducer,
    companiesReducer,
    authReducer,
    notiReducer,
    waypointsReducer,
    tasksReducer,
  },
});

export default store;
