import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Data types returned by the API, aligned with the backend models

export interface Product {
  productId: string;
  name: string;
  price: number;
  rating?: number;
  stockQuantity: number;
}

export interface SalesSummary {
  salesSummaryId: string;
  totalValue: number;
  changePercentage?: number;
  date: string;
}

export interface PurchaseSummary {
  purchaseSummaryId: string;
  totalPurchased: number;
  changePercentage?: number;
  date: string;
}

export interface ExpenseSummary {
  expenseSummarId: string;
  totalExpenses: number;
  date: string;
}

export interface ExpenseByCategorySummary {
  expenseByCategorySummaryId: string;
  category: string;
  amount: string;
  date: string;
}

export interface DashboardMetrics {
  popularProducts: Product[];
  salesSummary: SalesSummary[];
  purchaseSummary: PurchaseSummary[];
  expenseSummary: ExpenseSummary[];
  expenseByCategorySummary: ExpenseByCategorySummary[];
}

/**
 * API configuration using Redux Toolkit Query.
 * This setup defines and manages endpoints for retrieving,
 * updating, and caching data efficiently.
 */
export const api = createApi({
  // Base configuration for API requests
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  // Unique name for the API slice, used for managing state in Redux
  reducerPath: "api",
  // Tag types used for caching and invalidating/updating data
  tagTypes: ["DashboadMetrics"],
  // API endpoints to perform CRUD operations (e.g., GET, POST)
  endpoints: (build) => ({
    getDashboardMetrics: build.query<DashboardMetrics, void>({
      query: () => "/dashboard",
      providesTags: ["DashboadMetrics"],
    }),
  }),
});

// Hooks for frontend components to interact with the backend
export const { useGetDashboardMetricsQuery } = api;
