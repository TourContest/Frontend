import { createAsyncThunk } from "@reduxjs/toolkit";
import { communityApi } from "src/api/community";
import type { SpotPage } from "src/reducer/types";

export const fetchLatestPosts = createAsyncThunk<SpotPage, { page: number; size: number }>(
  "community/fetchLatest",
  async ({ page, size }) => {
    return await communityApi.getLatest(page, size);
  }
);

export const fetchPopularPosts = createAsyncThunk<SpotPage, { page: number; size: number }>(
  "community/fetchPopular",
  async ({ page, size }) => {
    return await communityApi.getPopular(page, size);
  }
);
