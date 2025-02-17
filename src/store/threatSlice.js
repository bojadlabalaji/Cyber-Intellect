import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  liveFeeds: [],
  statistics: {
    totalThreats: 0,
    threatsByType: {},
    threatsByCountry: {},
  },
  filters: {
    threatType: 'all',
    country: 'all',
    timeRange: '24h',
  },
};

const threatSlice = createSlice({
  name: 'threats',
  initialState,
  reducers: {
    setLiveFeeds: (state, action) => {
      state.liveFeeds = action.payload;
    },
    updateStatistics: (state, action) => {
      state.statistics = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
});

export const { setLiveFeeds, updateStatistics, setFilters } = threatSlice.actions;
export default threatSlice.reducer;