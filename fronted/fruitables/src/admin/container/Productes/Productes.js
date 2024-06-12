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
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { addProductes, deleteProductes, editProductes, getProductes } from '../../../redux/action/productes.action';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import { useEffect } from 'react';
import { getCategory } from '../../../redux/action/category.action';
import { getSubData } from '../../../slice/subcategory.slice';
import { FormControl, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';

function Productes(props) {
  const [open, setOpen] = React.useState(false);
  const [update, setupdate] = useState(false);
  const [data, setData] = useState([]);

  const dispatch = useDispatch();

  const productes = useSelector(state => state.productes);
  const subcategories = useSelector(state => state.subcategories.subcategories);
  const categories = useSelector(state => state.category.category);

  useEffect(() => {
    // getProduct()
    dispatch(getProductes())
    dispatch(getCategory())
    dispatch(getSubData())
  }, [dispatch])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handelDelete = (id) => {
    dispatch(deleteProductes(id))
  }

  const handelEdit = (data) => {
    formik.setValues(data);
    setOpen(true);
    setupdate(true)
  }

  const columns = [
    {
      field: 'category_id', headerName: 'Category', width: 150,
      renderCell: (params) => {
        const categoryData = categories.find(v => v._id === params.row.category_id);
        return categoryData ? categoryData.name : '';
      }
    },
    {
      field: 'subcategory_id', headerName: ' Subcategory Name', width: 160,
      valueGetter: (params) => {
        const subcategory = subcategories.find((v) => v._id === params.row.subcategory_id);
        return subcategory ? subcategory.name : "";
      }
    },
    { field: 'name', headerName: 'Name', width: 160 },
    { field: 'description', headerName: 'Description', width: 160 },
    { field: 'price', headerName: 'Price', width: 160 },
    {
      field: 'action',
      headerName: 'Action',
      width: 160,
      renderCell: (params) => (
        <>
          <IconButton aria-label="edit" onClick={() => handelEdit(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete" onClick={() => handelDelete(params.row._id)}>
            <DeleteOutlineIcon />
          </IconButton>
        </>
      )
    },
  ];

  let productSchema = object({
    category_id: string().required("Please select category"),
    subcategory_id: string().required("please select subcategory"),
    name: string().required("please enter name"),
    description: string().required("please enter description"),
    price: string().required("please enter price")
  });

  const formik = useFormik({
    initialValues: {
      category_id: '',
      subcategory_id: '',
      name: '',
      description: '',
      price: ''
    },
    validationSchema: productSchema,
    onSubmit: (values, { resetForm }) => {
      if (update) {
        dispatch(editProductes(values))
      } else {
        dispatch(addProductes(values))
      }
      resetForm()
      handleClose()
    },
  });

  const { handleSubmit, handleChange, handleBlur, errors, values, touched, setFieldValue } = formik;

  const changeCategorySelect = (event) => {
    const selectedCategoryId = event.target.value;
    setFieldValue("category_id", selectedCategoryId);
    setFieldValue("subcategory_id", "");
  };

  const changeSubcategorySelect = (event) => {
    setFieldValue("subcategory_id", event.target.value);
  };

  const filteredSubcategories = subcategories.filter(subcategory => subcategory.category_id === values.category_id);

  return (
    <>
      {
        // products.isLoading ? <Spinner>Loading....</Spinner> :
        //     products.error ? <p>{products.error}</p> :
        <>
          <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>Add Product</Button>
            <Dialog
              open={open}
              onClose={handleClose}
            >
              <DialogTitle>Add Product</DialogTitle>
              <form onSubmit={handleSubmit}>
                <DialogContent>
                  <FormControl fullWidth>
                    <InputLabel id="category-select-label">Select Categories</InputLabel>
                    <Select
                      labelId="category-select-label"
                      id="category-select"
                      value={values.category_id}
                      label="Category"
                      name="category_id"
                      onChange={changeCategorySelect}
                      onBlur={handleBlur}
                      input={<OutlinedInput label="Select Category" />}
                      error={errors.category_id && touched.category_id ? true : false}
                    >
                      {categories.map((v) => (
                        <MenuItem key={v._id} value={v._id}>{v.name}</MenuItem>
                      ))}
                    </Select>
                    {errors.category_id && touched.category_id && <span style={{ color: 'red' }}>{errors.category_id}</span>}
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel id="subcategory-select-label">Select Subcategories</InputLabel>
                    <Select
                      labelId="subcategory-select-label"
                      id="subcategory-select"
                      value={values.subcategory_id}
                      label="Subcategory"
                      name="subcategory_id"
                      onChange={changeSubcategorySelect}
                      onBlur={handleBlur} input={<OutlinedInput label="Select subcategory" />}
                      disabled={!values.category_id}
                      error={errors.subcategory_id && touched.subcategory_id ? true : false}
                    >
                      {filteredSubcategories.map((v) => (
                        <MenuItem key={v._id} value={v._id}>{v.name}</MenuItem>
                      ))}
                    </Select>
                    {errors.subcategory_id && touched.subcategory_id && <span style={{ color: 'red' }}>{errors.subcategory_id}</span>}
                  </FormControl>
                  <TextField
                    margin="dense"
                    id="name"
                    name="name"
                    label="name"
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
                    id="description"
                    name="description"
                    label="description"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                    error={errors.description && errors.description ? true : false}
                    helperText={errors.description && touched.description ? errors.description : ''}
                  />
                  <TextField
                    margin="dense"
                    id="price"
                    name="price"
                    label="price"
                    type="number"
                    fullWidth
                    variant="standard"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.price}
                    error={errors.price && errors.price ? true : false}
                    helperText={errors.price && touched.price ? errors.price : ''}
                  />
                  <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">{update ? 'update' : 'Add'}</Button>
                  </DialogActions>
                </DialogContent>
              </form>
            </Dialog>
          </React.Fragment>
          <br /><br />
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={productes.productes}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              getRowId={(row) => row._id}
              pageSizeOptions={[5, 10]}
              checkboxSelection
            />
          </div>
        </>
      }
    </>
  );
}

export default Productes;