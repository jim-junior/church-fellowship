import axiosInstance from "../../axios-instance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getStreams = createAsyncThunk("/schoolSheet/streams", async () => {
	const streams = await axiosInstance.get("/streams");
	const { data } = streams;
	const { status, payload } = data;
	if (status) return payload;
});

export const getRegistrations = createAsyncThunk("/fellowship/registrations", async () => {
	const resp = await axiosInstance.get("/reg/unapproved");
	const { data } = resp;
	const { status, payload } = data;
	if (status) return payload;
});

export const getMembers = createAsyncThunk("/fellowship/members", async () => {
	const resp = await axiosInstance.get("/users");
	const { data } = resp;
	const { status, payload } = data;
	if (status) return payload;
});

export const MothersFellowShipSlices = createSlice({
	name: "FellowShipSlices",
	initialState: {
		streams: [],
		registrations: [],
		members: [],
		loading: {
			streams: false,
			registrations: false,
			members: false
		},
	},
	extraReducers: {
		[getStreams.pending]: (state) => {
			state.loading.streams = true;
		},
		[getStreams.fulfilled]: (state, action) => {
			state.loading.streams = false;
			state.streams = action.payload;
		},
		[getStreams.rejected]: (state) => {
			state.loading.streams = false;
		},
		[getRegistrations.pending]: (state) => {
			state.loading.registrations = true;
		},
		[getRegistrations.fulfilled]: (state, action) => {
			state.loading.registrations = false;
			state.registrations = action.payload;
		},
		[getRegistrations.rejected]: (state) => {
			state.loading.registrations = false;
		},
		[getMembers.pending]: (state) => {
			state.loading.members = true;
		},
		[getMembers.fulfilled]: (state, action) => {
			state.loading.members = false;
			state.members = action.payload;
		},
		[getMembers.rejected]: (state) => {
			state.loading.members = false;
		},
	},
});




export default MothersFellowShipSlices.reducer;
