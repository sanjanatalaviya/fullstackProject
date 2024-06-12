import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Productes from '../admin/container/Productes/Productes';
import Layout from '../admin/components/Layout/Layout';
import Category from '../admin/container/Category/Category';
import Counter from '../admin/container/Counter/Counter';
import Facilities from '../admin/container/Facilities/Facilities';
import Coupon from '../admin/container/Coupon/Coupon'
import ShopCon from '../admin/container/ShopCon/ShopCon';
import Contact from '../admin/container/Contact/Contact';
import Subcategory from '../admin/container/Subcategory/Subcategory';

function AdminRoutes(props) {
    return (
        <Layout >
            <Routes>
                <Route exact path='/productes' element={<Productes />} />
                <Route exact path='/category' element={<Category />} />
                <Route exact path='/counter' element={<Counter />} />
                <Route exact path='/facilities' element={<Facilities />} />
                <Route exact path='/coupon' element={<Coupon />} />
                <Route exact path='/shopcon' element={<ShopCon />} />
                <Route exact path='/contact' element={<Contact />} />
                <Route exact path='/subcategory' element={<Subcategory />} />
            </Routes>
        </Layout>
    );
}

export default AdminRoutes;