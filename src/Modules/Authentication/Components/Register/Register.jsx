import axios from 'axios';
import React from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useForm } from 'react-hook-form';
import { USERS_URL } from '../../../../constant/Api';
import { email_valid, password_valid } from '../../../../constant/Validation';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Register() {

/*
Username: GML123
email:tshirtleonardo2023@gmail.com
password:Ax50@tvn7
code:e4ad
*/ 


  const nav=useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch, // Make sure watch is destructured if you're using it for validation
  } = useForm();


  const appendFormdata = (data) => {
    const formData = new FormData();
    formData.append("userName", data.userName);
    formData.append("country", data.country); 
    formData.append("password", data.password);  
    formData.append("profileImage", data.profileImage[0]);
    formData.append("email", data.email);  
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("confirmPassword", data.confirmPassword);
    return formData;
  }
  

  const submitRgs = async (data) => {
    let recipyData=appendFormdata(data)
    try {
      let res = await axios.post(USERS_URL.register, recipyData);
      console.log(res);
      nav("/Verfiy_register")
      toast.success(Response.data.message)
    } catch (error) {
      console.log(error);
      // toast.error(error.Response.data.message)
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(submitRgs)}>
        <div className="title mb-3">
          <h3>Register</h3>
          <p>Welcome back! Please enter your details</p>
        </div>
        <div className="row">
          <div className="col-12 col-lg-6">
            <InputGroup className="my-2">
              <InputGroup.Text id="basic-addon1"><i className="fa-solid fa-envelope"></i></InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="UserName"
                aria-label="text"
                aria-describedby="basic-addon1"
                {...register("userName", {
                  required: "userName is required",
                  maxLength: {
                    value: 8,
                    message: "The userName may not be greater than 8 characters.",
                  },
                  pattern: {
                    value: /^[a-zA-Z]+\d*$/,
                    message: "The userName must contain characters and end with numbers without spaces.",
                  },
                })}
              />
              {errors.userName && <p>{errors.userName.message}</p>}
            </InputGroup>

            <InputGroup className="my-2">
              <InputGroup.Text id="basic-addon2"><i className="fa-solid fa-envelope"></i></InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Country"
                aria-label="text"
                aria-describedby="basic-addon2"
                {...register("country", {
                  required: "Country is required",
                })}
              />
              {errors.country && <p>{errors.country.message}</p>}
            </InputGroup>

            <InputGroup className="my-2">
              <InputGroup.Text id="basic-addon3"><i className="fa-solid fa-envelope"></i></InputGroup.Text>
              <Form.Control
                type="password"
                placeholder="Password"
                aria-label="password"
                aria-describedby="basic-addon3"
                {...register("password", password_valid)}
              />
              {errors.password && <p>{errors.password.message}</p>}
            </InputGroup>
          </div>

          <div className="col-12 col-lg-6">
            <InputGroup className="my-2">
              <InputGroup.Text id="basic-addon4"><i className="fa-solid fa-envelope"></i></InputGroup.Text>
              <Form.Control
                type="email"
                placeholder="Enter Your E-mail"
                aria-label="email"
                aria-describedby="basic-addon4"
                {...register("email", email_valid)}
              />
              {errors.email && <p>{errors.email.message}</p>}
            </InputGroup>

            <InputGroup className="my-2">
              <InputGroup.Text id="basic-addon5"><i className="fa-solid fa-envelope"></i></InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="PhoneNumber"
                aria-label="number"
                aria-describedby="basic-addon5"
                {...register("phoneNumber", {
                  required: "Phone number is required",
                })}
              />
              {errors.phoneNumber && <p>{errors.phoneNumber.message}</p>}
            </InputGroup>

            <InputGroup className="my-2">
              <InputGroup.Text id="basic-addon6"><i className="fa-solid fa-envelope"></i></InputGroup.Text>
              <Form.Control
                type="password"
                placeholder="ConfirmedPassword"
                aria-label="ConfirmedPassword"
                aria-describedby="basic-addon6"
                {...register("confirmPassword", {
                  required: "Confirm password is required",
                  validate: (value) => value === watch("password") || "Passwords don't match",
                })}
              />
              {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
            </InputGroup>
          </div>
          <div className="m-auto">
      <Form.Group controlId="formFile" className="my-4" style={{position: 'relative'}}>
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
        Drag & Drop or <span style={{textDecoration: 'underline'}}>Choose an Item Image to Upload</span>
        <Form.Control type="file" {...register("profileImage", {
          required: "Image is required"
        })} style={{
          opacity: 0,
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          cursor: 'pointer'
        }} />
      </Form.Label>
      {errors.recipeImage && <p className='text-danger'>{errors.recipeImage.message}</p>}
    </Form.Group>
    </div>
        </div>
        <button type="submit" className="btn btn-success d-block w-100 my-3">Register</button>
      </form>
    </>
  );
}
