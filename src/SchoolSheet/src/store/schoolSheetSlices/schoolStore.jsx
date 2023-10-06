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

export const getTestimonies = createAsyncThunk("/fellowship/testimonies", async () => {
	const resp = await axiosInstance.get("/testimonies/get");
	const { data } = resp;
	const { status, payload } = data;
	if (status) return payload;
});

export const getPrayerRequests = createAsyncThunk("/fellowship/prayerRequests", async () => {
	const resp = await axiosInstance.get("/prayer-requets/get");
	const { data } = resp;
	const { status, payload } = data;
	if (status) return payload;
});

export const getNews = createAsyncThunk("/fellowship/news", async () => {
	const resp = await axiosInstance.get("/news");
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
		testimonies: [],
		prayerRequests: [],
		news: [],
		loading: {
			streams: false,
			registrations: false,
			members: false,
			testimonies: false,
			prayerRequests: false,
			news: false,
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
		[getTestimonies.pending]: (state) => {
			state.loading.testimonies = true;
		},
		[getTestimonies.fulfilled]: (state, action) => {
			state.loading.testimonies = false;
			state.testimonies = action.payload;
		},
		[getTestimonies.rejected]: (state) => {
			state.loading.testimonies = false;
		},
		[getPrayerRequests.pending]: (state) => {
			state.loading.prayerRequests = true;
		},
		[getPrayerRequests.fulfilled]: (state, action) => {
			state.loading.prayerRequests = false;
			state.prayerRequests = action.payload;
		},
		[getPrayerRequests.rejected]: (state) => {
			state.loading.prayerRequests = false;
		},
		[getNews.pending]: (state) => {
			state.loading.news = true;
		},
		[getNews.fulfilled]: (state, action) => {
			state.loading.news = false;
			state.news = action.payload;
		},
		[getNews.rejected]: (state) => {
			state.loading.news = false;
		},
	},
});




export default MothersFellowShipSlices.reducer;
