import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {

    const [username, usernameupdate] = useState('');
    const [password, passwordupdate] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        sessionStorage.clear();
    }, []);

    const ProceedLogin = (e) => {
        e.preventDefault();

        if (validate()) {
            // console.log('proceed');

            fetch("http://localhost:3000/user/" + username)  // username match username match thase to login thase jo nahi hoy to error avse
                .then((res) => {
                    return res.json();
                }).then((resp) => {
                    console.log(resp, "result");
                    if (Object.keys(resp).length === 0) {
                        toast.error('Login failed, invalid credentials');
                    } else {
                        if (resp.password === password) {   // resp no password and current password match thase to login thava dese
                            toast.success('Success');
                            sessionStorage.setItem("username", username)
                            navigate("/")
                        } else {
                            toast.error('Please Enter valid credentials');
                        }
                    }
                }).catch((err) => {
                    toast.error('Login Failed due to :' + err.message);
                });
        }
    }


    //  Validation

    const validate = () => {
        let result = true;
        if (username === '' || username === null) {
            result = false;
            toast.warning('Please Enter Username');
        }
        if (password === '' || password === null) {
            result = false;
            toast.warning('Please Enter Password');
        }
        return result;
    }
    return (
        <div>
            <h1>Login Page</h1>
            <div className="row">
                <div className="offset-lg-3 col-lg-6" style={{ marginTop: '100px' }}>
                    <form onSubmit={ProceedLogin} className="container">
                        <div className="card">
                            <div className="card-header">
                                <h2>User Login</h2>
                            </div>

                            <div className="card-body">
                                <div className="form-group">
                                    <label>User Name <span className="errmsg">*</span></label>
                                    <input
                                        value={username} onChange={e => usernameupdate(e.target.value)}
                                        className="form-control"></input>
                                </div>

                                <div className="form-group">
                                    <label>Password <span className="errmsg">*</span></label>
                                    <input
                                        value={password} onChange={e => passwordupdate(e.target.value)}
                                        type="password" className="form-control"></input>
                                </div>
                            </div>

                            <div className="card-footer">
                                <button type="submit" className="btn btn-primary me-2">Login</button>
                                <Link className="btn btn-success" to={'/register'}>New User</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login