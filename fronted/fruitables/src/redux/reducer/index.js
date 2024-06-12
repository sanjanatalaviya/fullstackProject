import { combineReducers } from "redux";
// import { counterReducer } from "./counter.reducer";
import { FacilityReducer } from "./facilities.reducer";
import { ProductesReducer } from "./productes.reducer";
import { ShopReducer } from "./shop.reducer";
import { ReviewReducer } from "./review.reducer";
import counterSlice from "../../slice/counter.slice";
import cartSlice from "../../slice/cart.slice";
import couponSlice from "../../slice/coupon.slice";
import { categoryReducer } from "./category.reducer";
import subcategorySlice from "../../slice/subcategory.slice";

export const rootReducer = combineReducers({
    counter_slice: counterSlice,
    facilities: FacilityReducer,
    productes: ProductesReducer,
    shop: ShopReducer,
    review: ReviewReducer,
    cart: cartSlice,
    coupon: couponSlice,
    category: categoryReducer,
    subcategories: subcategorySlice
})