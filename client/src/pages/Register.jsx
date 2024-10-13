import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [values, setValues] = useState({
    avatar: "",
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/customer", values)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form method="post" onSubmit={handleSubmit}>
          <h2 className="text-center">Register</h2>
          <div className="mb-4 d-flex justify-content-center">
            <img id="selectedAvatar" src="https://mdbootstrap.com/img/Photos/Others/placeholder-avatar.jpg"
              className="rounded-circle" style={{width: '200px', height: '200px',  objectFit: 'cover'}} alt="example placeholder" />
          </div>
          <div class="d-flex justify-content-center">
            <div data-mdb-ripple-init class="btn btn-primary btn-rounded">
              <label class="form-label text-white m-1" for="customFile2">Choose file</label>
              <input type="file" class="form-control d-none" id="customFile2" onchange="displaySelectedImage(event, 'selectedAvatar')" />
            </div>
          </div>
      <div className="mb-2">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          placeholder="Enter name..."
          className="form-control"
          onChange={(e) => setValues({ ...values, name: e.target.value })}
        ></input>
      </div>
      <div className="mb-2">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="Enter name..."
          className="form-control"
          onChange={(e) => setValues({ ...values, email: e.target.value })}
        ></input>
      </div>
      <div className="mb-2">
        <label htmlFor="email">Password</label>
        <input
          type="password"
          placeholder="Enter password..."
          className="form-control"
          onChange={(e) =>
            setValues({ ...values, password: e.target.value })
          }
        ></input>
      </div>
      <button className="btn btn-success">Submit</button>
    </form>
      </div >
    </div >
  );
}

export default Register;
