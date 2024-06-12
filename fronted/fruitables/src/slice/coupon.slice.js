import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseURL } from '../utils/baseURL';

export const getCouponData = createAsyncThunk('coupon/getCouponData',
    async () => {
        try {
            const response = await axios.get(baseURL + 'coupon')
            console.log(response.data);
            return response.data
        } catch (error) {
            console.log(error);
            return error
        }
    });

export const addCouponData = createAsyncThunk('coupon/addCouponData',
    async (data) => {
        try {
            const response = await axios.post(baseURL + 'coupon', data)
            console.log(response.data);
            return response.data
        } catch (error) {
            console.log(error);
            return error.message
        }
    });

export const deleteCouponData = createAsyncThunk('coupon/deleteCouponData',
    async (id) => {
        try {
            await axios.delete(baseURL + 'coupon/' + id)
            return id
        } catch (error) {
            console.log(error);
            return error.message
        }
    })

export const editCouponData = createAsyncThunk('coupon/editCouponData',
    async (data) => {
        try {
            const response = await axios.put(baseURL + 'coupon/' + data.id, data)
            console.log(response.data);
            return response.data.id
        } catch (error) {
            console.log(error);
            return error.message
        }
    })

const initialState = {
    isLoading: false,
    coupon: [],
    error: null
}

const couponSlice = createSlice({
    name: 'coupon',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCouponData.pending, (state, action) => {
            console.log(action.payload);
            state.isLoading = true
        })
        builder.addCase(getCouponData.fulfilled, (state, action) => {
            console.log(action.payload);
            state.isLoading = false
            state.coupon = action.payload
        })
        builder.addCase(getCouponData.rejected, (state, action) => {
            console.log(action.payload);
            state.isLoading = false
            state.error = action.payload
        })
        builder.addCase(addCouponData.fulfilled, (state, action) => {
            state.coupon.push(action.payload)
            // state.coupon = state.coupon.concat(action.payload);
            console.log(action.payload);
            state.isLoading = false
        })
        builder.addCase(deleteCouponData.fulfilled, (state, action) => {
            state.coupon = state.coupon.filter((v) => v.id !== action.payload)
            // console.log(action.payload.);
        })
        builder.addCase(editCouponData.fulfilled, (state, action) => {
            state.coupon = state.coupon.map((v) => {
                if (v.id === action.payload.id) {
                    return action.payload;
                } else {
                    return v;
                }
            })
            state.isLoading = false
        })
    }
});

// export const { } = couponSlice.actions;
export default couponSlice.reducer;