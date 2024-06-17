import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { DataGrid } from '@mui/x-data-grid';
import { useFormik } from 'formik';
import { mixed, object, string } from 'yup';
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
  const [selectsub, setselectsub] = useState([]);
  const [categoriesdata, setcategoriesdata] = useState([]);
  const [subcategoriesdata, setsubcategoriesdata] = useState([]);
  // const [data, setData] = useState([]);

  const dispatch = useDispatch();

  const productes = useSelector(state => state.productes);
  console.log(productes);
  // const subcategories = useSelector(state => state.subcategories.subcategories);
  const categories = useSelector(state => state.category.category);

  useEffect(() => {
    // getProduct()
    dispatch(getProductes());
    categorycall();
    subcategorycall();
    // dispatch(getCategory())
    dispatch(getSubData());
  }, [dispatch]);

  const categorycall = async () => {
    const response = await fetch('http://localhost:8000/api/v1/categories/list-categories');
    const data = await response.json();
    setcategoriesdata(data.data)
  }

  const subcategorycall = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/v1/subcategories/list-subcategories");
      const data = await response.json();
      console.log(data);
      setsubcategoriesdata(data.data);
    } catch (error) {
      console.log(error);
    }
  }

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
    setupdate(data._id);
  }

  const columns = [
    {
      field: 'category_id', headerName: 'Category', width: 150,
      renderCell: (params) => {
        const categoryData = categoriesdata.find((v) => v._id === params.row.category_id);
        return categoryData ? categoryData.name : '';
      }
    },
    {
      field: 'subcategory_id', headerName: ' Subcategory Name', width: 160,
      valueGetter: (params) => {
        const subcategory = subcategoriesdata.find((v) => v._id === params.row.subcategory_id);
        return subcategory ? subcategory.name : "";
      }
    },
    { field: 'name', headerName: 'Name', width: 160 },
    { field: 'description', headerName: 'Description', width: 160 },
    { field: 'price', headerName: 'Price', width: 160 },
    {
      field: "image",
      headerName: "Image",
      width: 150,
      renderCell: (params) => {
        console.log(params.row.image);
        if (params.row.image && params.row.image.url) {
          return <img src={params.row.image.url
          } alt={params.row.name} width={50} />;
        } else {
          return null;
        }
      },
    },
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
    price: string().required("please enter price"),
    image: mixed()
      .required("Please select an image")
      .test("fileSize", "The file is too large", (value) => {
        return value && value.size <= 2 * 1024 * 1024; // 2MB
      })
      .test("fileType", "Unsupported File Format", (value) => {
        return (
          value && ["image/jpeg", "image/png", "image/gif"].includes(value.type)
        );
      }),
  });

  const formik = useFormik({
    initialValues: {
      category_id: '',
      subcategory_id: '',
      name: '',
      description: '',
      price: '',
      image: ''
    },
    validationSchema: productSchema,
    onSubmit: (values, { resetForm }) => {
      const fileValid = validateFile(values.image);

      if (fileValid) {
        if (update) {
          dispatch(editProductes({ ...values, _id: update }))
        } else {
          dispatch(addProductes(values))
          console.log(values);
        }
        resetForm()
        handleClose()
      }
    },
  });

  const { handleSubmit, handleChange, handleBlur, errors, values, touched, setFieldValue } = formik;

  const changeCategorySelect = (event) => {
    setFieldValue("category_id", event.target.value);
    handlecategoryChange(event.target.value);
    setFieldValue("subcategory_id", "");
  };

  // const changeSubcategorySelect = (event) => {
  //   const selectedSubcategoryId = event.target.value;
  //   setFieldValue("subcategory_id", selectedSubcategoryId);
  // };

  const handlecategoryChange = async (category_id) => {
    const respomse = await fetch(`http://localhost:8000/api/v1/subcategories/getsubByCategory/${category_id}`);
    const data = await respomse.json();
    setselectsub(data.data);
  }
  // const filteredSubcategories = subcategories.filter(subcategory => subcategory.category_id === values.category_id);
  // const filteredSubcategories = subcategories && subcategories.filter(subcategory => subcategory.category_id === values.category_id);

  const validateFile = (file) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/svg+xml'];
    const maxFileSize = 2 * 1024 * 1024; // 2MB

    if (!file) {
      return true;
    }
    if (!allowedTypes.includes(file.type)) {
      alert('File type not allowed. Please select a JPEG, PNG, or SVG file.');
      return false;
    }
    if (file.size > maxFileSize) {
      alert('File size exceeds the limit of 2MB.');
      return false;
    }
    return true;
  };

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
              <form onSubmit={handleSubmit} enctype="multipart/form-data" method="post">
                <DialogContent>
                  <FormControl fullWidth>
                    <InputLabel id="category_id-label">Select Categories</InputLabel>
                    <Select
                      labelId="category_id-label"
                      id="category_id"
                      value={values.category_id}
                      label="Category"
                      name="category_id"
                      onChange={changeCategorySelect}
                      input={<OutlinedInput label="Select Category" />}
                      error={errors.category_id && touched.category_id && <span style={{ color: "red" }}>{errors.category_id}</span>}
                    >
                      {categoriesdata.map((v) => (
                        <MenuItem key={v._id} value={v._id}>{v.name}</MenuItem>
                      ))}
                    </Select>
                    {errors.category_id && touched.category_id && <span style={{ color: 'red' }}>{errors.category_id}</span>}
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel id="subcategory_id-label">Select Subcategories</InputLabel>
                    <Select
                      labelId="subcategory_id-label"
                      id="subcategory_id"
                      value={values.subcategory_id}
                      label="Subcategory"
                      name="subcategory_id"
                      onChange={handleChange}
                      onBlur={handleBlur} input={<OutlinedInput label="Select subcategory" />}
                      disabled={!values.category_id}
                      error={errors.subcategory_id && touched.subcategory_id ? true : false}
                    >
                      {selectsub.map((v) => (
                        <MenuItem key={v._id} value={v._id}>{v.name}</MenuItem>
                      ))}
                    </Select>
                    {errors.subcategory_id && touched.subcategory_id && <span style={{ color: 'red' }}>{errors.subcategory_id}</span>}
                  </FormControl>
                  <br /><br />
                  <input
                    id="image"
                    name="image"
                    label="image"
                    type="file"
                    fullWidth
                    variant="standard"
                    onChange={(event) => {
                      setFieldValue("image", event.currentTarget.files[0]);
                    }}
                    onBlur={handleBlur}

                    sx={{ marginBottom: 2 }}
                  />
                  <br></br><br></br>
                  {errors.image && touched.image ? <span style={{ color: "red" }}>{errors.image}</span> : null}
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