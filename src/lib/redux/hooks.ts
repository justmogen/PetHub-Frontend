/**
 * Typed Redux Hooks
 * Pre-typed versions of useDispatch and useSelector
 */

import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: <T>(selector: (state: RootState) => T) => T =
  useSelector;

// Export the store types for use in other files
export type { RootState, AppDispatch };
