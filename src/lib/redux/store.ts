/**
 * Redux Store Configuration
 * Professional setup with RTK Query integration and middleware
 */

import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "../api/baseApi";
import { getEnvironmentConfig } from "../api/config";

// Create the store
export const store = configureStore({
  reducer: {
    // RTK Query API slice
    [api.reducerPath]: api.reducer,

    // Add other slices here as needed
    // auth: authSlice.reducer,
    // ui: uiSlice.reducer,
  },

  middleware: (getDefaultMiddleware) => {
    const config = getEnvironmentConfig();

    return (
      getDefaultMiddleware({
        serializableCheck: {
          // Ignore these action types from serializability checks
          ignoredActions: [
            // RTK Query actions
            "api/executeQuery/pending",
            "api/executeQuery/fulfilled",
            "api/executeQuery/rejected",
            "api/executeMutation/pending",
            "api/executeMutation/fulfilled",
            "api/executeMutation/rejected",
          ],
          // Ignore these field paths in all actions
          ignoredActionsPaths: ["meta.baseQueryMeta"],
          // Ignore these paths in the state
          ignoredPaths: ["api.queries", "api.mutations"],
        },
        immutableCheck: {
          // Ignore these paths in immutability checks
          ignoredPaths: ["api.queries", "api.mutations"],
        },
      })
        // Add RTK Query middleware
        .concat(api.middleware)
        // Add additional middleware in development
        .concat(config.isDevelopment ? [] : [])
    );
  },

  // Enable Redux DevTools in development
  devTools: getEnvironmentConfig().isDevelopment,

  // Preloaded state for SSR/hydration if needed
  preloadedState: undefined,
});

// Enable refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Export store instance
export default store;
