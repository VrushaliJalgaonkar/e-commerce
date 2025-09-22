import { createSlice, createAsyncThunk, isPending } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}`;
const USER_TOKEN = `Bearer ${localStorage.getItem("userToken")}`

// async thunk to fetch admin products
export const fetchAdminProducts = createAsyncThunk("adminProducts/fetchAdminProducts", async () => {
    const response = await axios.get(`${API_URL}/api/admin/products`, {
        headers: {
            Authorization: USER_TOKEN,
        }
    });
    return response.data;
});

// async function to create new product
export const createProduct = createAsyncThunk("adminProducts/createProduct", async (productData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/api/admin/products`, productData, {
        headers: {
          Authorization: USER_TOKEN,
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Create failed" });
    }
  });
  

// async thunk to update an existing product
export const updateProduct = createAsyncThunk(
    "adminProducts/updateProduct",
    async ({ id, productData }, { rejectWithValue }) => {
      try {
        const response = await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/api/admin/products/${id}`,
          productData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
          }
        );
  
        // Only return the updated product
        return response.data.product;
      } catch (error) {
        return rejectWithValue(error.response?.data || { message: "Update failed" });
      }
    }
  );
  
  

// async thunk to delete product
export const deleteProduct = createAsyncThunk("adminProducts/deleteProduct",
    async (id) => {
        await axios.delete(`${API_URL}/api/products/${id}`, {
            headers: {
                Authorization: USER_TOKEN,
            }
        });
        return id;
    });

const adminProductSlice = createSlice({
    name: "adminProducts",
    initialState: {
        products: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAdminProducts.pending, (state, action) => {
                state.loading = false;
            })
            .addCase(fetchAdminProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchAdminProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Create product
            .addCase(createProduct.fulfilled, (state, action) => {
                state.products.push(action.payload);
            })
            // Update product
            .addCase(updateProduct.fulfilled, (state, action) => {
                const index = state.products.findIndex(
                    (product) => product._id === action.payload._id
                );
                if (index !== -1) {
                    state.products[index] = action.payload;
                }
            })
            // Delete product
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.products = state.products.filter(
                    (product) => product._id !== action.payload
                );
            });
    },
});

export default adminProductSlice.reducer;