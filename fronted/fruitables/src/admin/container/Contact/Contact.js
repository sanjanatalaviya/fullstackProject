import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { DataGrid } from '@mui/x-data-grid';
import { useFormik } from 'formik';
import { number, object, string } from 'yup';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { ContactContext } from '../../../context/ContactContext';

function Contact(props) {
    const [open, setOpen] = React.useState(false);
    const [update, setupdate] = useState();

    const contact = useContext(ContactContext);
    console.log(contact);

    useEffect(() => {
        contact.getContacts()
    }, [])

    const handleClickOpen = () => {
        setOpen(true);
        setupdate(false);
        formik.resetForm();
    };

    const handleClose = () => {
        setOpen(false);
    };

    const columns = [
        { field: 'address', headerName: 'address', width: 130 },
        { field: 'email', headerName: 'email', width: 130 },
        { field: 'phone', headerName: 'phone', width: 130 },
        {
            field: 'action',
            headerName: 'Action',
            width: 130,
            renderCell: (params) => (
                <>
                    <IconButton aria-label="delete" onClick={() => handleDelete(params.row.id)}>
                        <DeleteOutlineIcon />
                    </IconButton>
                    <IconButton aria-label="edit" onClick={() => handleEdit(params.row)}>
                        <EditIcon />
                    </IconButton>
                </>
            )
        }
    ];

    const handleEdit = (data) => {
        formik.setValues(data);
        contact.updateContacts(data);
        setOpen(true);
        // setupdate(data);
    }

    const handleDelete = (id,data) => {
        contact.deleteContacts(data,id);
    }

    const contactSchema = object({
        address: string().required("Please Enter Valid Address."),
        email: string().email().required("Please Enter Valid Email."),
        phone: number().min(10, "Please Enter Valid 10 Number's.").required("Please Enter Valid Phone.")
    })

    const formik = useFormik({
        initialValues: {
            address: '',
            email: '',
            phone: ''
        },
        validationSchema: contactSchema,
        onSubmit: (values, { resetForm }) => {
            if (update) {
                contact.updateContacts(values, update.id);
            } else {
                contact.addContacts(values);
            }
            resetForm()
            handleClose()
        },
    });

    const { handleSubmit, handleBlur, handleChange, values, errors, touched } = formik;

    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add Contact
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Contact</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            id="address"
                            name="address"
                            label="Enter Address"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.address}
                            error={errors.address && errors.address ? true : false}
                            helperText={errors.address && touched.address ? errors.address : ''}
                        />
                        <TextField
                            margin="dense"
                            id="email"
                            name="email"
                            label="Enter Email"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            error={errors.email && errors.email ? true : false}
                            helperText={errors.email && touched.email ? errors.email : ''}
                        />
                        <TextField
                            margin="dense"
                            id="phone"
                            name="phone"
                            label="Enter Phone"
                            type="number"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.phone}
                            error={errors.phone && errors.phone ? true : false}
                            helperText={errors.phone && touched.phone ? errors.phone : ''}
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
                    rows={contact.contact}
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
    );
}

export default Contact;