import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useParams } from 'react-router-dom';
import React, {useState, useEffect }from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
export const EditProduct = () => {
    const { id } = useParams()
    const [name, setName] = useState('')
    const [details, setDetails] = useState('')
    const [photo, setPhoto] = useState('')
    const navi = useNavigate()

    useEffect(() => {
        axios.get("http://localhost/sales-management-system/api-php/product/getItem.php=" + id)
            .then((res) => {
                setName(res.data.name)
                console.log(res.data);
                setDetails(res.data.details)
                setPhoto(res.data.photo)
            })
    }, [])

    const save = () => {
        const formdata = new FormData()
        formdata.append('name', name)
        formdata.append('details', details)
        formdata.append('photo', photo)
        formdata.append('id', id)
        axios.post("", formdata, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
            .then((res) => {
                console.log(res.data)
                setName('')
                setPhoto('')
                setDetails('')
                setPhoto(null)
                navi('/itemslist')
            })
    }
  return (
    <div className="wrapper">
    <Navbar/>
    <Sidebar/>
    <div className='content-wrapper'> 
    <div className="col-md-12">
{/* general form elements */}
<div className="card card-primary">
  <div className="card-header">
    <h3 className="card-title">Edit User</h3>
  </div>
  {/* /.card-header */}
  {/* form start */}
  {/* <p className="text-sucess"> { message }</p>                  */}
  <div className="container-fluid pt-4 px-4">
                <div className="row g-4">
                    <div className="col-sm-12 col-xl-12">
                        <div className="bg-light rounded h-100 p-4">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h2 className="mb-0">Add Item</h2>

                                <NavLink to={`/itemslist`}>
                                    <button className="btn btn-info btn-lg">Item List</button>
                                </NavLink>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}

                                />
                                <label htmlFor="floatingInput">Name</label>
                            </div>

                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    onChange={(e) => setDetails(e.target.value)}
                                    value={details}

                                />
                                <label htmlFor="floatingInput">Details</label>
                            </div>

                            <div className='col-md-6'>
                                <img className='h-50 w-50 mt-4' src={`http://localhost/sales-management-system/api-php/product/${photo}`} />
                                <input className="form-control form-control-lg mt-4" id="formFileLg" type="file" onChange={(e) => setPhoto(e.target.files[0])} />
                            </div>

                                <div>
                                    <button onClick={save} className="btn btn-primary mt-4 btn-lg">Submit</button>
                                </div>

                        </div>
                    </div>
                </div>
            </div>
</div>
{/* /.card */}
</div>
</div>
      <Footer/>
 
    </div>
  )
}
