import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addreview, deleteReview, editReview, getreview } from '../../../redux/action/review.action';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';

function Review(props) {
    const { id } = useParams();
    console.log(id);

    const [update, setupdate] = useState();

    const dispatch = useDispatch();

    const review = useSelector(state => state.review)
    console.log(review);

    const columns = [
        { field: 'name', headerName: 'Name', width: 70 },
        { field: 'email', headerName: 'Email', width: 130 },
        { field: 'review', headerName: 'Review', width: 130 },
        {
            field: 'action',
            headerName: 'Action',
            width: 130,
            renderCell: (params) => (
                <>
                    <IconButton aria-label="delete" onClick={() => handledelete(params.row.id)}>
                        <DeleteOutlineIcon />
                    </IconButton>
                    <IconButton aria-label="edit" onClick={() => handleEdit(params.row)}>
                        <EditIcon />
                    </IconButton>
                </>
            )
        }
    ];

    const handledelete = (id) => {
        dispatch(deleteReview(id));
    }

    const handleEdit = (data) => {
        formik.setValues(data);
        setupdate(data);
    }

    const ReviewSchema = object({
        name: string().required("please enter valid fruits name."),
        email: string().required("please enter valid email."),
        review: string().required("please enter valid review.")
    })

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            review: ''
        },
        validationSchema: ReviewSchema,
        onSubmit: (values, { resetForm }) => {
            if (update) {
                dispatch(editReview(values))
            } else {
                dispatch(addreview(values));
            }
            resetForm()
        },
    });

    const { handleSubmit, handleBlur, handleChange, values, errors, touched } = formik;

    useEffect(() => {
        dispatch(getreview());
    }, []);

    return (
        <div>
            {review.error ? <p>{review.error}</p> :
                <div className="container-fluid py-5 mt-5">
                    <div className="container py-5">
                        <div className="row g-4 mb-5">
                            <div className="row g-4">
                                <form action="#" onSubmit={handleSubmit}>
                                    <h4 className="mb-5 fw-bold">Leave a Reply</h4>
                                    <div className="row g-4">
                                        <div className="col-lg-6">
                                            <div className="border-bottom rounded">
                                                <input type="text"
                                                    className="form-control border-0 me-4"
                                                    placeholder="Your Name *"
                                                    id='name'
                                                    name='name'
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.name}
                                                    error={errors.name && errors.name ? true : false}
                                                />
                                                <span style={{ color: 'red' }}>{errors.name && touched.name ? errors.name : ''}</span>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="border-bottom rounded">
                                                <input type="email"
                                                    className="form-control border-0"
                                                    placeholder="Your Email *"
                                                    name='email'
                                                    id='email'
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.email}
                                                    error={errors.email && errors.email ? true : false}
                                                />
                                                <span style={{ color: 'red' }}>{errors.email && touched.email ? errors.email : ''}</span>
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="border-bottom rounded my-4">
                                                <textarea
                                                    className="form-control border-0"
                                                    id='review'
                                                    name='review'
                                                    cols={30}
                                                    rows={8}
                                                    placeholder="Your Review *"
                                                    spellCheck="false"
                                                    defaultValue={""}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.review}
                                                    error={errors.review && errors.review ? true : false}
                                                />
                                            </div>
                                            <span style={{ color: 'red' }}>{errors.review && touched.review ? errors.review : ''}</span>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="d-flex justify-content-between py-3 mb-5">
                                                <div className="d-flex align-items-center">
                                                    <p className="mb-0 me-3">Please rate:</p>
                                                    <div className="d-flex align-items-center" style={{ fontSize: 12 }}>
                                                        <i className="fa fa-star text-muted" />
                                                        <i className="fa fa-star" />
                                                        <i className="fa fa-star" />
                                                        <i className="fa fa-star" />
                                                        <i className="fa fa-star" />
                                                    </div>
                                                </div>
                                                <button href="#"
                                                    className="btn border border-secondary text-primary rounded-pill px-4 py-3"
                                                    type='submit'
                                                > {update ? 'Update' : 'Post Comment'}</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                <div style={{ height: 400, width: '100%' }}>
                                    <DataGrid
                                        rows={review.review}
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
                            </div>
                        </div>
                    </div>
                </div>
            }

        </div>
    );
}

export default Review;