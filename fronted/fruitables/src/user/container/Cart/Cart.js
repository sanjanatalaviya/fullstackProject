import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getProductes } from '../../../redux/action/productes.action';
import { decerementCart, deleteCart, incerementCart } from '../../../slice/cart.slice';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { getCouponData } from '../../../slice/coupon.slice';
import Button from '../../component/UI/Button/Button';

function Cart(props) {
    const dispatch = useDispatch();
    const [discount, setdiscount] = useState(0);
    // const [totalamount, settotalamount] = useState(0);
    const [shippingCharge, setShippingCharge] = useState(0);

    const cart = useSelector(state => state.cart);
    const productes = useSelector(state => state.productes);
    const coupons = useSelector(state => state.coupon);
    console.log(coupons);

    useEffect(() => {
        dispatch(getProductes())
        dispatch(getCouponData())
    }, [])

    let couponSchema = object({
        coupon: string().required("Please Enter Coupon Code.")
    });

    const cartData = cart.cart.map((v) => {
        console.log(v);
        let data = productes.productes.find((x) => x.id === v.pid);
        console.log(data);
        return { ...data, Qty: v.qty }
    })

    const subtotal = cartData.reduce((a, b) => a + b.price * b.Qty, 0);

    const totalcount = (subtotal * discount) / 100;
    // const shipping = 100;
    let finalTotal = 0;
    finalTotal = subtotal - totalcount;  //+ shipping

    const handleCoupon = (data) => {
        let flag = 0;
        let per = 0;
        // let shippingamount = 0;
        coupons.coupon.map((v) => {
            if (v.couponcode === data.coupon) {
                let currdate = new Date();
                let expiry = new Date(v.expDate);
                if (currdate <= expiry) {
                    flag = 1;
                    per = v.per;
                    setdiscount(v.per)
                } else {
                    flag = 2;
                }
            }
        })
        if (flag === 0) {
            formik.setFieldError("coupon", "Invalid Coupon Code.")
        } else if (flag === 1) {
            formik.setFieldError("coupon", `coupon applied successfully. you get ${per}% discount.`)
        } else if (flag === 2) {
            formik.setFieldError("coupon", "coupon is expired.")
        }
        if (subtotal >= 500) {
            setShippingCharge(100);
        } else {
            setShippingCharge(0);
        }
    };
    // if (subtotal > 500) {
    //     shippingamount = 100;
    //     settotalamount(shippingamount)
    // }

    const formik = useFormik({
        initialValues: {
            coupon: ''
        },
        validationSchema: couponSchema,
        onSubmit: (values) => {
            handleCoupon(values)
        },
    });

    const { handleChange, handleBlur, handleSubmit, errors, values, touched } = formik;

    const handleIncrement = (id) => {
        dispatch(incerementCart(id));
    }

    const handleDecrement = (id) => {
        dispatch(decerementCart(id));
    }

    const handleDelete = (id) => {
        dispatch(deleteCart(id))
    }

    return (
        <div>
            {/* Single Page Header start */}
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">Cart</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item"><a href="#">Pages</a></li>
                    <li className="breadcrumb-item active text-white">Cart</li>
                </ol>
            </div>
            {/* Single Page Header End */}
            {/* Cart Page Start */}
            <div className="container-fluid py-5">
                <div className="container py-5">
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Products</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Total</th>
                                    <th scope="col">Handle</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartData.map((v) => (
                                    <tr>
                                        <th scope="row">
                                            <div className="d-flex align-items-center">
                                                <img src={v.image} className="img-fluid me-5 rounded-square" style={{ width: 80, height: 80 }} alt />
                                            </div>
                                        </th>
                                        <td>
                                            <p className="mb-0 mt-4">{v.name}</p>
                                        </td>
                                        <td>
                                            <p className="mb-0 mt-4">${v.price}</p>
                                        </td>
                                        <td>
                                            <div className="input-group quantity mt-4" style={{ width: 100 }}>
                                                <div className="input-group-btn">
                                                    <button className="btn btn-sm btn-minus rounded-circle bg-light border" onClick={() => handleDecrement(v.id)} >
                                                        <i className="fa fa-minus" />
                                                    </button>
                                                </div>
                                                <span className="form-control form-control-sm text-center border-0" >
                                                    {v.Qty}
                                                </span>
                                                <div className="input-group-btn">
                                                    <button className="btn btn-sm btn-plus rounded-circle bg-light border" onClick={() => handleIncrement(v.id)}>
                                                        <i className="fa fa-plus" />
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <p className="mb-0 mt-4">${(v.price * v.Qty)}</p>
                                        </td>
                                        <td>
                                            <button className="btn btn-md rounded-circle bg-light border mt-4" onClick={() => handleDelete(v.id)}>
                                                <i className="fa fa-times text-danger" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-5">
                        <form onSubmit={handleSubmit}>
                            <input
                                name='coupon'
                                type="text"
                                className="border-0 border-bottom rounded me-5 py-3 mb-4"
                                placeholder="Coupon Code"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.coupon}
                            />
                            {errors.coupon && touched.coupon ? <span style={{ color: 'red' }}>{errors.coupon}</span> : ''}
                            <Button
                                className="btn border-secondary rounded-pill px-4 py-3 text-primary"
                                btnType="secondary"
                                btnDisabled={true}
                                type="submit">
                                Apply Coupon
                            </Button>
                        </form>
                    </div>
                    <div className="row g-4 justify-content-end">
                        <div className="col-8" />
                        <div className="col-sm-8 col-md-7 col-lg-6 col-xl-4">
                            <div className="bg-light rounded">
                                <div className="p-4">
                                    <h1 className="display-6 mb-4">Cart <span className="fw-normal">Total</span></h1>
                                    <div className="d-flex justify-content-between mb-4">
                                        <h5 className="mb-0 me-4">Subtotal:</h5>
                                        <p className="mb-0">${(subtotal).toFixed(2)}</p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        {
                                            discount > 0 &&
                                            <>
                                                <h5 className="mb-0 me-4">Discount:{discount}%</h5>
                                                <div className>
                                                    <p className="mb-0">Discount: ${totalcount.toFixed(2)}</p>
                                                </div>
                                            </>
                                        }
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <h5 className="mb-0 me-4">shipping</h5>
                                        <div className>
                                            <p className="mb-0">shipping: $
                                                {/* {totalamount} */}
                                                {shippingCharge > 0 && <p>Shipping Charge: ${shippingCharge}</p>}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="mb-0 text-end">Shipping to Ukraine.</p>
                                </div>
                                <div className="py-4 mb-4 border-top border-bottom d-flex justify-content-between">
                                    <h5 className="mb-0 ps-4 me-4">Total</h5>
                                    <p className="mb-0 pe-4">${finalTotal}</p>
                                </div>
                                <Button btnType="primary">Proceed Checkout </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Cart Page End */}
        </div >
    );
}

export default Cart;