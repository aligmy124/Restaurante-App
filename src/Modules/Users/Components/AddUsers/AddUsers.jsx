import axios from 'axios'
import React, { useState , useEffect } from 'react'
import { Form, InputGroup } from 'react-bootstrap'
import { USERS_URL } from '../../../../constant/Api'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify'
export default function AddUsers() {
    //token
    const token=localStorage.getItem("token")
  const nav=useNavigate()
    let{
        register, 
        handleSubmit,
        formState:{errors},
        }=useForm()

  //function get
  const[categoryList,setcategoryList]=useState([])
  const getUsersList= async ()=>{
  try {
    let res=await axios.get(USERS_URL.getUsers,{headers:{
      Authorization:`Bearer ${token}`
    }})
    setcategoryList(res.data.data)
    console.log(res.data.data)
  } catch (error) {
    console.log(error)
  }
}

const appendFormdata = (data) => {
  const formData = new FormData();
  formData.append("userName", data.userName);  
  formData.append("email", data.email);  
  formData.append("profileImage", data.profileImage[0]);  // تأكد من استخدام الاسم الصحيح
  formData.append("phoneNumber", data.phoneNumber);  
  formData.append("country", data.country);
  formData.append("password", data.password);
  formData.append("confirmPassword", data.confirmPassword);
  return formData;
}


// create
const createUser=async(data)=>{
  let recipyData=appendFormdata(data)
  try {
      let res=await axios.post(USERS_URL.create,recipyData,
      {headers:{
          Authorization:`Bearer ${token}`
      }})
      console.log(res)
      console.log(data)
      nav("/dashboard/UsersList")
      toast.success("Add successfully")
  } catch (error) {
      console.log(error)
      toast.error("Add not successfully")
      
  }
}






useEffect(()=>{
  getUsersList()
  },[])
  
  return (
<>
  <div className="title mx-2 my-2 px-3 px-md-5 d-flex flex-column flex-md-row justify-content-between align-items-center" style={{ backgroundColor: "rgba(240, 255, 239, 1)" }}>
    <div className="title-info text-center text-md-start">
      <h2 style={{ color: "rgba(31, 38, 62, 1)", fontSize: "24px", fontWeight: "600" }}>
        Fill the <span className='text-success'>Users</span> !
      </h2>
      <p style={{ maxWidth: "440px", color: "rgba(31, 38, 62, 1)", fontSize: "16px" }}>
        you can now fill the meals easily using the table and form, click here and fill it with the table!
      </p>
    </div>
    <div className="btn mt-3 mt-md-0">
      <button className='btn btn-success'>Fill Users <i className="fa-solid fa-arrow-right"></i></button>
    </div>
  </div>

  <form className='container my-4 w-75' onSubmit={handleSubmit(createUser)}>
    <div className="row">
      <div className="col-12 mb-2">
        <InputGroup>
          <Form.Control
            style={{ backgroundColor: "#f8f9fa", height: "48px" }}
            type='text'
            placeholder="userName"
            aria-label="userName"
            aria-describedby="basic-addon1"
            {...register("userName", { required: "userName is required" })}
          />
        </InputGroup>
        {errors.userName && <p className='text-danger'>{errors.userName.message}</p>}
      </div>

      <div className="col-12 mb-2">
        <InputGroup>
          <Form.Control
            style={{ backgroundColor: "#f8f9fa", height: "48px" }}
            type='email'
            placeholder="email"
            aria-label="email"
            aria-describedby="basic-addon3"
            {...register("email", { required: "email is required" })}
          />
        </InputGroup>
        {errors.email && <p className='text-danger'>{errors.email.message}</p>}
      </div>

      <div className="col-12 mb-2">
        <InputGroup>
          <Form.Control
            style={{ backgroundColor: "#f8f9fa", height: "48px" }}
            type='text'
            placeholder="country"
            aria-label="country"
            aria-describedby="basic-addon3"
            {...register("country", { required: "country is required" })}
          />
        </InputGroup>
        {errors.country && <p className='text-danger'>{errors.country.message}</p>}
      </div>

      <div className="col-12 mb-2">
        <InputGroup>
          <Form.Control
            style={{ backgroundColor: "#f8f9fa", height: "48px" }}
            type='text'
            placeholder="phoneNumber"
            aria-label="phoneNumber"
            aria-describedby="basic-addon4"
            {...register("phoneNumber", { required: "phoneNumber is required" })}
          />
        </InputGroup>
        {errors.phoneNumber && <p className='text-danger'>{errors.phoneNumber.message}</p>}
      </div>

      <div className="col-12 mb-2">
        <InputGroup>
          <Form.Control
            style={{ backgroundColor: "#f8f9fa", height: "48px" }}
            type='password'
            placeholder="password"
            aria-label="password"
            aria-describedby="basic-addon5"
            {...register("password", { required: "password is required" })}
          />
        </InputGroup>
        {errors.password && <p className='text-danger'>{errors.password.message}</p>}
      </div>

      <div className="col-12 mb-2">
        <InputGroup>
          <Form.Control
            style={{ backgroundColor: "#f8f9fa", height: "48px" }}
            type='password'
            placeholder="confirmPassword"
            aria-label="confirmPassword"
            aria-describedby="basic-addon4"
            {...register("confirmPassword", { required: "confirmPassword is required" })}
          />
        </InputGroup>
        {errors.confirmPassword && <p className='text-danger'>{errors.confirmPassword.message}</p>}
      </div>

      <div className="col-12 my-4">
        <Form.Group controlId="formFile" className="position-relative">
          <Form.Label style={{
            display: 'block',
            padding: '10px',
            border: '2px dashed rgba(0, 128, 0, 0.5)',
            backgroundColor: 'rgba(240, 255, 239, 1)',
            borderRadius: '5px',
            textAlign: 'center',
            cursor: 'pointer',
            color: '#28a745',
            fontSize: '18px'
          }}>
            Drag & Drop or <span style={{ textDecoration: 'underline' }}>Choose a Item Image to Upload</span>
            <Form.Control type="file" {...register("profileImage", { required: "Image is required" })} style={{
              opacity: 0,
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              cursor: 'pointer'
            }} />
          </Form.Label>
          {errors.profileImage && <p className='text-danger'>{errors.profileImage.message}</p>}
        </Form.Group>
      </div>

      <div className="d-flex flex-column flex-md-row justify-content-md-end mt-4">
        <button onClick={() => nav("/dashboard/UsersList")} type="button" className="btn btn-outline-success me-3">Cancel</button>
        <button type="submit" className="btn btn-success">Save</button>
      </div>
    </div>
  </form>
</>

  )
}