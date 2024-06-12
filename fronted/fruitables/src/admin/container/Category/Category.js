import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { useState } from 'react';
import { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, deleteCategory, getCategory, updateCategory } from '../../../redux/action/category.action';

export default function FormDialog() {

    const [open, setOpen] = React.useState(false);
    const [data, setdata] = useState([]);
    const [update, setupdate] = useState(null);

    const categories = useSelector(state => state.category);
    console.log(categories);
    const dispatch = useDispatch();

    let categorySchema = object({
        name: string().required("please enter name"),
        description: string().required("please enter message").min(5, "please enter atleast 5 charecter in message."),
    });

    // const getdata = async () => {
    // dispatch(getCategory());
    // const response = await fetch('http://localhost:8000/api/v1/categories/list-categories');
    // const data = await response.json();
    // setdata(data.data);

    // const localData = JSON.parse(localStorage.getItem('category'));
    // if (localData) {
    //     setdata(localData)
    // }
    // }

    useEffect(() => {
        // getdata()
        dispatch(getCategory());
    }, []);

    // const handleAdd = async (data) => {
    // let rNo = Math.floor(Math.random() * 1000);
    // // console.log(rNo);
    // let localData = JSON.parse(localStorage.getItem('category'));
    // if (localData) {
    //     localData.push({ ...data, id: rNo });
    //     localStorage.setItem('category', JSON.stringify(localData));
    // } else {
    //     localStorage.setItem('category', JSON.stringify([{ ...data, id: rNo }]));
    // }

    // try {
    //     await fetch('http://localhost:8000/api/v1/categories/add-category', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(data)
    //     });
    // } catch (error) {
    //     console.log(error.message);
    // }
    // setTimeout(() => {
    //     dispatch({ type: 'ADD_CATEGORY', payload: data })
    // })
    // getdata();
    // }

    // const handleupdateData = async (data) => {
    //     console.log(data);
    //     try {
    //         await fetch("http://localhost:8000/api/v1/categories/update-category/" + data._id, {
    //             method: 'PUT',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(data)

    //         })
    //     } catch (error) {
    //         console.log(error);
    //     }
    //     // let localData = localStorage.setItem.JSON.stringify('category');
    //     // var index = localData.findindex((v) => v.id === data.id);

    //     // localData[index] = data;
    //     // localStorage.setItem('category', JSON.stringify(localData));
    //     getdata();
    // }

    const formik = useFormik({
        initialValues: {
            name: '',
            description: ''
        },
        validationSchema: categorySchema,
        onSubmit: (values, { resetForm }) => {
            // setdata(data);
            if (update) {
                dispatch(updateCategory(values))
                // handleupdateData(values);
            } else {
                dispatch(addCategory(values));
                // handleAdd(values);
            }
            handleClose();
            resetForm();
        },
    });

    const columns = [
        { field: 'name', headerName: 'Category', width: 130 },
        { field: 'description', headerName: 'Description', width: 130 },
        {
            field: 'edit', headerName: 'Edit', width: 130,
            renderCell: (params) => (
                <EditIcon onClick={() => handleUpdate(params.row)} />
            )
        },
        {
            field: 'delete', headerName: 'Delete', width: 130,
            renderCell: (params) => (
                <DeleteIcon onClick={() => handleDelete(params.row)
                } />
            ),
        }
    ];

    const { handleChange, handleBlur, handleSubmit, errors, values, touched, setValues } = formik;

    const handleUpdate = (data) => {
        dispatch(updateCategory(data));
        setOpen(true);
        setValues(data);
    };

    const handleDelete = async (data) => {
        dispatch(deleteCategory(data._id));
        // try {
        //     await fetch('http://localhost:8000/api/v1/categories/delete-category/' + data._id, {
        //         method: 'DELETE'
        //     });
        // } catch (error) {
        //     console.log(error.message);
        // }
        // let localData = JSON.parse(localStorage.getItem('category'));
        // localData = localData.filter((v) => v.id !== id);
        // localStorage.setItem('category', JSON.stringify(localData))
        // getdata()
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        formik.resetForm();
        setupdate(null);
    };

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen} >
                Add Category
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Add </DialogTitle>
                < form onSubmit={handleSubmit} >
                    <DialogContent>
                        <TextField
                            margin="dense"
                            id="name"
                            name="name"
                            label="Category"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            value={values.name}
                            onBlur={handleBlur}
                            error={errors.name && errors.name ? true : false}
                            helperText={errors.name && touched.name ? errors.name : ""}
                        />
                        <TextField
                            margin="dense"
                            id="description"
                            name="description"
                            label="description"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            value={values.description}
                            onBlur={handleBlur}
                            error={errors.description && errors.description ? true : false}
                            helperText={errors.description && touched.description ? errors.description : ""}
                        />
                        <DialogActions>
                            <Button onClick={handleClose}> Cancel </Button>
                            < Button type="submit" >{update ? "update" : "add"}</Button>
                        </DialogActions>
                    </DialogContent>
                </form>
            </Dialog>
            < div style={{ height: 400, width: '100%' }
            }>
                <DataGrid
                    rows={categories.category}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    getRowId={row => row._id}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                />
            </div>
        </React.Fragment>
    )
}