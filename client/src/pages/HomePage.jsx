import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";

function HomePage() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8000")
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
  }, []);

  if (loading) {
    return <h1>This website have been loading</h1>;
  }

  if (error) {
    return <h1>This website have {error}</h1>;
  }

  return (
    <div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col" className="me-3 ms-3">ID</th>
            <th scope="col" className="me-3 ms-3">Name</th>
            <th scope="col" className="me-3 ms-3">Email</th>
            <th scope="col" className="me-3 ms-3" >Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((student, index) => (
            <tr key={index}>
              <th scope="row" className="me-3 ms-3">{student.STUDENT_ID}</th>
              <td className="ms-3 me-3">{student.STUDENT_NAME}</td>
              <td className="ms-3 me-3">{student.STUDENT_EMAIL}</td>
              <tr colspan='2'>
                <td><button className="btn btn-outline-info">Update</button></td>
                <td><button className="btn btn-outline-warning">Delete</button></td>
              </tr>
            </tr>
           
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HomePage;
