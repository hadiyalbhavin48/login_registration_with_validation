import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Home = () => {

    const [customerlist, listupdate] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        let username = sessionStorage.getItem("username");

        if (username === '' || username === null) {
            navigate("/login")
        }

        // let jwttoken = sessionStorage.getItem('jwttoken');
        let jwttoken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dnZWRJbkFzIjoiYWRtaW4iLCJpYXQiOjE0MjI3Nzk2Mzh9.gzSraSYS8EXBxLN_oWnFSRgCzcmJmMjLiuyu5CSpyHI';
        fetch("http://localhost:3000/customer", {
            headers: {
                'Authorization': 'bearer ' + jwttoken
            }
        }).then((res) => {
            return res.json();
        }).then((resp) => {
            console.log(resp, "resp");
            listupdate(resp);
        }).catch((err) => {
            console.log(err.messsage)
        });
    }, [])
    return (
        <div>
            <h1>Home Page</h1>
            <div className='header'>
                <Link to={"/"}>Home</Link>
                <Link to={"/login"} style={{ float: 'right' }}>LogOut</Link>
            </div>

            <table className="table table-bordered">
                <thead>
                    <tr>
                        <td>Code</td>
                        <td>Name</td>
                        <td>Email</td>
                        <td>Credit Limit</td>
                    </tr>
                </thead>
                <tbody>
                    {customerlist &&
                        customerlist.map(item => (
                            <tr key={item.id}>
                                <td>{item.code}</td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.creditLimit}</td>
                            </tr>

                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Home