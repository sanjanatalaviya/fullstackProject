import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { ThemeContext } from '../../../context/ThemeContext';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { PrimaryButton } from '../../component/UI/Button/Button.styled';
// import { NavLink } from 'react-router-dom';
import { Box, Menu, MenuItem } from '@mui/material';
import Button from '../../component/UI/Button/Button';
import { getFacilities } from '../../../redux/action/facilities.action';

function Header(props) {
    const cart = useSelector(state => state.cart);
    console.log(cart);

    let cartQty = cart.cart.reduce((acc, curr) => acc + curr.qty, 0);
    // console.log(cartQty);

    const themecontext = useContext(ThemeContext);
    console.log(themecontext);

    const handleTheme = () => {
        themecontext.toggleTheme(themecontext.theme);
    }

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getFacilities());
        // dispatch((()));
    }, []);

    const categories = useSelector(state => state.category.category);
    const subcategories = useSelector(state => state.subcategories.subcategories)
    console.log(categories, subcategories);

    const [categoryAnchorEl, setCategoryAnchorEl] = useState(null);
    const [subcategoryAnchorEl, setSubcategoryAnchorEl] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);

    const handleClose = () => {
        setCategoryAnchorEl(null);
        setSubcategoryAnchorEl(null);
    };
    const handleCategoryClick = (event, category) => {
        setSelectedCategory(category);
        setCategoryAnchorEl(event.currentTarget);
        setSubcategoryAnchorEl(null);
        setSelectedSubcategory(null);
    };

    const handleSubcategoryClick = (event, subcategory) => {
        setSelectedSubcategory(subcategory);
        setSubcategoryAnchorEl(event.currentTarget);
    };
    return (
        <div>
            {/* Navbar start */}
            <div className={`container-fluid fixed-top ${themecontext.theme}`}>
                <div className="container topbar bg-primary d-none d-lg-block">
                    <div className="d-flex justify-content-between">
                        <div className="top-info ps-2">
                            <small className="me-3"><i className="fas fa-map-marker-alt me-2 text-secondary" /> <a href="#" className="text-white">123 Street, New York</a></small>
                            <small className="me-3"><i className="fas fa-envelope me-2 text-secondary" /><a href="#" className="text-white">Email@Example.com</a></small>
                        </div>
                        <div className="top-link pe-2">
                            <a href="#" className="text-white"><small className="text-white mx-2">Privacy Policy</small>/</a>
                            <a href="#" className="text-white"><small className="text-white mx-2">Terms of Use</small>/</a>
                            <a href="#" className="text-white"><small className="text-white ms-2">Sales and Refunds</small></a>
                            <button
                                onClick={handleTheme}
                                style={{
                                    backgroundColor: '#81c408',
                                    border: 'none',
                                    padding: '5px',
                                    borderRadius: '5px'
                                }}
                            >
                                {themecontext.theme === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
                            </button>
                        </div>
                    </div>
                </div>
                <div className="container px-0">
                    <nav className={`navbar navbar-light navbar-expand-xl ${themecontext.theme}`}>
                        <a href="index.html" className="navbar-brand"><h1 className="text-primary display-6">Fruitables</h1></a>
                        <button className="navbar-toggler py-2 px-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                            <span className="fa fa-bars text-primary" />
                        </button>
                        <div className={`collapse navbar-collapse ${themecontext.theme}`} id="navbarCollapse">
                            <div className="navbar-nav mx-auto">
                                <NavLink to="/" className="nav-item nav-link active">Home</NavLink>
                                <NavLink to='/shop' className="nav-item nav-link">Shop</NavLink>
                                <NavLink to='/shopdetails' className="nav-item nav-link ">Shop Detail</NavLink>
                                <div className="nav-item dropdown">
                                    <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Pages</a>
                                    <div className="dropdown-menu m-0 bg-secondary rounded-0">
                                        <NavLink to='/cart' className="dropdown-item">Cart</NavLink>
                                        <NavLink to='/checkout' className="dropdown-item">Chackout</NavLink>
                                        <NavLink to='/testimonial' className="dropdown-item">Testimonial</NavLink>
                                        <NavLink to='/page' className="dropdown-item">404 Page</NavLink>
                                        <NavLink to='/review' className='dropdown-item'>Review</NavLink>
                                    </div>
                                </div>
                                <NavLink to='/contact' className="nav-item nav-link">Contact</NavLink>
                            </div>
                            <div className="d-flex m-3 me-0">
                                <button className="btn-search btn border border-secondary btn-md-square rounded-circle bg-white me-4" data-bs-toggle="modal" data-bs-target="#searchModal"><i className="fas fa-search text-primary" /></button>
                                <NavLink to={'/cart'} className="position-relative me-4 my-auto">
                                    <i className="fa fa-shopping-bag fa-2x" />
                                    <span className="position-absolute bg-secondary rounded-circle d-flex align-items-center justify-content-center text-dark px-1" style={{ top: '-5px', left: 15, height: 20, minWidth: 20 }}>
                                        {cartQty}
                                    </span>
                                </NavLink>
                                <a href="#" className="my-auto">
                                    <i className="fas fa-user fa-2x" />
                                </a>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
            {/* Navbar End */}
            {/* Modal Search Start */}
            <div className="modal fade" id="searchModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-fullscreen">
                    <div className="modal-content rounded-0">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Search by keyword</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body d-flex align-items-center">
                            <div className="input-group w-75 mx-auto d-flex">
                                <input type="search" className="form-control p-3" placeholder="keywords" aria-describedby="search-icon-1" />
                                <span id="search-icon-1" className="input-group-text p-3"><i className="fa fa-search" /></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal Search End */}
            <br /><br /><br /><br /><br/><br/><br/><br/>
            <div>
                <Box sx={{ display: 'flex', padding: 2 }}>
                    {categories.map(category => (
                        <Box key={category.id} sx={{ margin: '0 10px' }}>
                            <Button
                                aria-controls="category-menu"
                                aria-haspopup="true"
                                onClick={(e) => handleCategoryClick(e, category)}
                            >
                                {category.name}
                            </Button>
                            <Menu
                                id="category-menu"
                                anchorEl={categoryAnchorEl}
                                open={selectedCategory === category && Boolean(categoryAnchorEl)}
                                onClose={handleClose}
                            >
                                {subcategories
                                    .filter(subcategory => subcategory.categoryId === category.id)
                                    .map(subcategory => (
                                        <MenuItem
                                            key={subcategory.id}
                                            onClick={(e) => handleSubcategoryClick(e, subcategory)}
                                        >
                                            {subcategory.name}
                                        </MenuItem>
                                    ))}
                            </Menu>
                            {selectedCategory === category && (
                                <Menu
                                    id="subcategory-menu"
                                    anchorEl={subcategoryAnchorEl}
                                    open={Boolean(subcategoryAnchorEl)}
                                    onClose={handleClose}
                                >
                                    {/* {products
                                        .filter(product => product.subcategoryId === selectedSubcategory?.id)
                                        .map(product => (
                                            <MenuItem key={product.id} onClick={handleClose}>
                                                {product.name}
                                            </MenuItem>
                                        ))} */}
                                </Menu>
                            )}
                        </Box>
                    ))}
                </Box>
            </div >
        </div>
    );
}

export default Header;