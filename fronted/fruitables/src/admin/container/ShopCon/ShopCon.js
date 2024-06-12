import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { DataGrid } from '@mui/x-data-grid';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';
import { ADD_SHOPCON, GET_SHOPCON } from '../../../context/ActionTypes';
import { baseURL } from '../../../utils/baseURL';

export default function ShopCon() {
    const [open, setOpen] = React.useState(false);

    const dispatch = useDispatch();

    const shopcondata = useSelector(state => state.shopcon);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        dispatch({ type: GET_SHOPCON })
        // axios.get(baseURL + "shop")
        axios.get(baseURL + "shop")
            .then((response) => {
                setTimeout(() => {
                    dispatch({ type: GET_SHOPCON, payload: response.data })
                }, 1000)
            })
        // dispatch({ type: "GET_SHOPCON" })
        // try {
        //     axios.post(baseURL + "shop")
        //         .then((response) => {
        //             setTimeout(() => {
        //                 dispatch({ type: GET_SHOPCON, payload: response.data })
        //             }, 1000)
        //         })
        // } catch (error) {
        //     console.log(error.message);
        // }
    }, []);

    const shopSchema = object({
        name: string().required("please enter valid fruits name."),
        price: string().required("please enter valid price of fruit.")
    })

    const formik = useFormik({
        initialValues: {
            name: '',
            price: ''
        },
        validationSchema: shopSchema,
        onSubmit: (values, { resetForm }) => {
            // axios.post(baseURL + "shop")
            axios.post(baseURL + "shop")
                .then((response) => {
                    setTimeout(() => {
                        dispatch({ type: ADD_SHOPCON, payload: response.values })
                    }, 1000)
                })
            // dispatch({ type: "ADD_SHOPCON" })
            resetForm()
            handleClose()
        },
    });

    const { handleSubmit, handleBlur, handleChange, values, errors, touched } = formik;

    const columns = [
        { field: 'name', headerName: 'Fruit', width: 130 },
        { field: 'price', headerName: 'Price', width: 130 },
        {
            field: 'action',
            headerName: 'Action',
            width: 130,
            renderCell: (params) => (
                <>
                    <IconButton aria-label="delete"
                    // onClick={() => handleDelete(params.row.id)}
                    >
                        <DeleteOutlineIcon />
                    </IconButton>
                    <IconButton aria-label="edit"
                    // onClick={() => handleEdit(params.row)}
                    >
                        <EditIcon />
                    </IconButton>
                </>
            )
        }
    ];
    const rows = [];
    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                Open Shop Form
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Subscribe</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            id="name"
                            name="name"
                            label="Fruits Name"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                            error={errors.name && errors.name ? true : false}
                            helperText={errors.name && touched.name ? errors.name : ''}
                        />
                        <TextField
                            margin="dense"
                            id="price"
                            name="price"
                            label="Price"
                            type="number"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.price}
                            error={errors.price && errors.price ? true : false}
                            helperText={errors.price && touched.price ? errors.price : ''}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">Add</Button>
                    </DialogActions>
                </form>
            </Dialog>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    // shopcondata.shopcon
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                />
            </div>
        </React.Fragment>
    );
}