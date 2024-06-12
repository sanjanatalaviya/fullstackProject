import React, { useContext } from 'react';
import Header from '../user/component/Header/Header';
import { Route, Routes } from 'react-router-dom';
import Home from '../user/container/Home/Home';
import Shop from '../user/container/Shop/Shop';
import Shopdetails from '../user/container/ShopDetails/Shopdetails';
import Cart from '../user/container/Cart/Cart';
import Checkout from '../user/container/Checkout/Checkout';
import Testimonial from '../user/container/Testimonial/Testimonial';
import Page from '../user/container/Page/Page';
import Contact from '../user/container/Contact/Contact';
import Footer from '../user/component/Footer/Footer';
import PrivateRoutes from './PrivateRoutes';
import Review from '../user/container/Review/Review'
import { ThemeContext } from '../context/ThemeContext';

function UserRoutes(props) {
    const themecontext = useContext(ThemeContext);
    console.log(themecontext);

    return (
        <div className={themecontext.theme}>
            <>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route element={<PrivateRoutes />}>
                        <Route path="/shop" element={<Shop />} />
                        <Route path='/shop/:id' element={<Shopdetails />} />
                        <Route path='/cart' element={<Cart />} />
                        <Route path='/checkout' element={<Checkout />} />
                    </Route>
                    <Route path='/testimonial' element={<Testimonial />} />
                    <Route path='/page' element={<Page />} />
                    <Route path='/contact' element={<Contact />} />
                    <Route path='/review' element={<Review />} />
                </Routes>
                <Footer />
            </>
        </div>
    );
}

export default UserRoutes;