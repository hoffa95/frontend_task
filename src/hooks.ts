import { createTypedHooks } from "easy-peasy";
import { StoreModel } from "./model";

const { 
  useStoreActions, 
  useStoreState, 
  useStoreDispatch
} = createTypedHooks<StoreModel>();
  
export { useStoreActions, useStoreDispatch, useStoreState };