import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { date, object, string } from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useFormik } from 'formik';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import { addCouponData, deleteCouponData, editCouponData, getCouponData } from '../../../slice/coupon.slice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

export default function FormDialog() {
    const [open, setOpen] = React.useState(false);
    const [update, setupdate] = React.useState(false);

    const dispatch = useDispatch();
    const coupondata = useSelector(state => state.coupon);
    console.log(coupondata);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        dispatch(getCouponData())
    }, [])

    let couponSchema = object({
        couponcode: string().required("please enter coupon code."),
        per: string().required("please enter discount percentage."),
        expDate: date().required(),
    });

    const formik = useFormik({
        initialValues: {
            couponcode: '',
            per: '',
            expDate: ''
        },
        validationSchema: couponSchema,
        onSubmit: (values, { resetForm }) => {
            if (update) {
                dispatch(editCouponData(values));
            } else {
                dispatch(addCouponData({ ...values, createdOn: new Date().toLocaleDateString() }))
            }
            handleClose();
            resetForm();
        },
    });

    const handleUpdate = (data) => {
        handleClickOpen();
        formik.setValues(data);
        setupdate(true);
    }

    const handleDelete = (id) => {
        dispatch(deleteCouponData(id))
    }

    const columns = [
        { field: 'couponcode', headerName: 'Coupon', width: 130 },
        { field: 'per', headerName: 'Percentage', width: 130 },
        { field: 'expDate', headerName: 'expiry Date', width: 130 },
        {
            field: 'edit', headerName: 'Edit', width: 130,
            renderCell: (params) => (
                <EditIcon onClick={() => handleUpdate(params.row)} />
            )
        },
        {
            field: 'delete', headerName: 'Delete', width: 130,
            renderCell: (params) => (
                <DeleteOutline onClick={() => handleDelete(params.row.id)
                } />
            ),
        }
    ];

    const { handleChange, handleBlur, handleSubmit, errors, values, touched } = formik;

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                Open Coupon
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Coupon</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            id="couponcode"
                            name="couponcode"
                            label="coupon"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            value={values.couponcode}
                            onBlur={handleBlur}
                            error={errors.couponcode && errors.couponcode ? true : false}
                            helperText={errors.couponcode && touched.couponcode ? errors.couponcode : ""}
                        />
                        <TextField
                            margin="dense"
                            id="per"
                            name="per"
                            label="percentage"
                            type="number"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            value={values.per}
                            onBlur={handleBlur}
                            error={errors.per && errors.per ? true : false}
                            helperText={errors.per && touched.per ? errors.per : ""}
                        />
                        <TextField
                            margin="dense"
                            id="expDate"
                            name="expDate"
                            type="date"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            value={values.expDate}
                            onBlur={handleBlur}
                            error={errors.expDate && errors.expDate ? true : false}
                            helexpDateText={errors.expDate && touched.expDate ? errors.expDate : ""}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">{update ? 'Update' : 'Add'}</Button>
                    </DialogActions>
                </form>
            </Dialog>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={coupondata.coupon}
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
        </React.Fragment >
    );
}
