import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { object, string } from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { AddFacility, deleteFacility, updateFacility } from '../../../redux/action/facilities.action';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Spinner from 'react-bootstrap/Spinner';

function Facilities(props) {
    const [open, setOpen] = React.useState(false);
    const [update, setupdate] = useState(false);

    const facilities = useSelector(state => state.facilities);
    console.log(facilities);

    const dispatch = useDispatch();

    let facilitiesSchema = object({
        name: string().required(),
        description: string().required()
    });

    const handleClickOpen = () => {
        setOpen(true);
        setupdate(false)
        formik.resetForm();
    };

    const handleClose = () => {
        setOpen(false);
    };

    const formik = useFormik({
        initialValues: {
            name: '',
            description: ''
        },
        validationSchema: facilitiesSchema,
        onSubmit: (values, { resetForm }) => {
            if (update) {
                dispatch(updateFacility(values));
            } else {
                const rNo = Math.floor(Math.random() * 1000);
                dispatch(AddFacility({ ...values, id: rNo }));
            }
            resetForm()
            handleClose()
        },
    });

    const handleDelete = (id) => {
        console.log(id);
        dispatch(deleteFacility(id))
    }

    const { handleSubmit, handleBlur, handleChange, values, errors, touched } = formik;

    const handleEdit = (data) => {
        console.log(data);
        formik.setValues(data);
        setOpen(true);
        setupdate(data);
    }

    const columns = [
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'description', headerName: 'Description', width: 130 },
        {
            field: 'action',
            headerName: 'Action',
            width: 130,
            renderCell: (params) => (
                <>
                    <IconButton aria-label="delete" onClick={() => handleDelete(params.row.id)}>
                        <DeleteIcon />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => handleEdit(params.row)}>
                        <EditIcon />
                    </IconButton>
                </>
            )
        }
    ];

    return (
        <>
            {facilities.isLoading ? <Spinner animation="border" variant="dark" /> :
                <>
                    <Button variant="outlined" onClick={handleClickOpen}>
                        Add Facilities
                    </Button>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                    >
                        <DialogTitle>Facilities</DialogTitle>
                        <form onSubmit={handleSubmit}>
                            <DialogContent>
                                <TextField
                                    margin="dense"
                                    id="name"
                                    name="name"
                                    label="Facilities Name"
                                    type="name"
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
                                    id="name"
                                    name="description"
                                    label="Facilities description"
                                    type="description"
                                    fullWidth
                                    variant="standard"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.description}
                                    error={errors.description && errors.description ? true : false}
                                    helperText={errors.description && touched.description ? errors.description : ''}
                                />
                                <DialogActions>
                                    <Button onClick={handleClose}>Cancel</Button>
                                    <Button type="submit">{update ? 'Update' : 'Add'}</Button>
                                </DialogActions>
                            </DialogContent>
                        </form>
                    </Dialog>
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={facilities.facilities}
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
                </>
            }
        </>
    );
}

export default Facilities;