import { configureStore, createSlice, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage

// ----------------------
// Existing Form Slice
// ----------------------
const formSlice = createSlice({
  name: "form",
  initialState: {
    billingAddress: null,  
    shippingAddress: null,   
    businessInfo: {},
    businessAddress: {},
   
    accountCreation: {}, 
    businessAddressValidated: false,
    billingAddressValidated: false,
    shippingAddressValidated: false,
  },
  reducers: {
    // safer: merge payload into businessAddress
    setFormData: (state, action) => {
      state.businessAddress = {
        ...state.businessAddress,
        ...action.payload,
      };
    },
     // -----------------------
    // Billing address reducers 
    // -----------------------
    setBillingAddress(state, action) {
      state.billingAddress = action.payload;
    },
    clearBillingAddress(state) {
      state.billingAddress = null;
    },
  
    // -----------------------
    // Shipping address reducers 
    // -----------------------
    setShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
    },
    clearShippingAddress(state) {
      state.shippingAddress = null;
    },

    // explicit setter if you want to replace the whole businessAddress
    setBusinessAddress: (state, action) => {
      state.businessAddress = action.payload;
    },
    setBusinessAddressValidated(state, action) {
      state.businessAddressValidated = action.payload; // boolean
    },
    clearBusinessAddress(state) {
      state.businessAddress = {};
    },

 
     // -----------------------
    // Business information reducers (NEW)
    // -----------------------
    // merge partial or full business info into store
    setBusinessInfo: (state, action) => {
      state.businessInfo = {
        ...(state.businessInfo || {}),
        ...action.payload,
      };
    },
    // replace businessInfo entirely
    replaceBusinessInfo: (state, action) => {
      state.businessInfo = action.payload;
    },
    // clear businessInfo
    clearBusinessInfo: (state) => {
      state.businessInfo = {};
    },

    // NEW: set account creation values (partial or full object)
    setAccountCreation: (state, action) => {
      state.accountCreation = {
        ...(state.accountCreation || {}),
        ...action.payload,
      };
    },
     // NEW: replace account creation completely
    replaceAccountCreation: (state, action) => {
      state.accountCreation = action.payload;
    },

    // NEW: clear account creation (e.g. after success)
    clearAccountCreation: (state) => {
      state.accountCreation = {};
    },

    resetForm: (state) => {
      state.businessAddress = {};
    },
  },
});

// ----------------------
// New Cart (Order Summary) Slice
// ----------------------
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    paymentFrequency: "MONTHLY",
    subscriptionTerm: "12 Months",
    promoCode: "",
    autoRenewalDate: "",
  },
  reducers: {
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
    },
    updateCartItem: (state, action) => {
      const { id, accessPoints } = action.payload;
      const index = state.cartItems.findIndex(item => item.id === id);
      if (index !== -1) {
        state.cartItems[index].accessPoints = accessPoints;
      }
    },
    removeCartItem: (state, action) => {
      state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
    },
    setPaymentFrequency: (state, action) => {
      state.paymentFrequency = action.payload;
    },
    setSubscriptionTerm: (state, action) => {
      state.subscriptionTerm = action.payload;
    },
    setPromoCode: (state, action) => {
      state.promoCode = action.payload;
    },
    setAutoRenewalDate: (state, action) => {
      state.autoRenewalDate = action.payload;
    },
    resetCart: () => ({
      cartItems: [],
      paymentFrequency: "MONTHLY",
      subscriptionTerm: "12 Months",
      promoCode: "",
      autoRenewalDate:""
    }),
  },
});

// Export actions
export const { 
  setFormData, 
  setBusinessAddress, 
  clearBusinessAddress,

  setBillingAddress, 
  clearBillingAddress,

  setShippingAddress,        
  clearShippingAddress, 

  setBillingAddressValidated,    
  setShippingAddressValidated,
  setBusinessAddressValidated,   
  
   // business info actions
  setBusinessInfo,
  replaceBusinessInfo,
  clearBusinessInfo,
 
  setAccountCreation,
  replaceAccountCreation, 
  clearAccountCreation, 
  resetForm 
} = formSlice.actions;

export const {
  setCartItems,
  updateCartItem,
  removeCartItem,
  setPaymentFrequency,
  setSubscriptionTerm,
  setPromoCode,
  setAutoRenewalDate,
  resetCart,
} = cartSlice.actions;

// ----------------------
// Combine Reducers
// ----------------------
const rootReducer = combineReducers({
  form: formSlice.reducer,
  cart: cartSlice.reducer,
});

// ----------------------
// Persist Config
// ----------------------
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", "form"], // persist only cart (or include "form" too if you want)
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// ----------------------
// Configure Store
// ----------------------
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required by redux-persist
    }),
});

export const persistor = persistStore(store);
