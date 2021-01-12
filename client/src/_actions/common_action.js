import {
  IS_LOADING,
} from "./types";

export function setIsLoading(isLoading) {
  return {
    type: IS_LOADING,
    payload: isLoading
  }
}