import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = () => {

    const [id, idchange] = useState("");
    const [name, namechange] = useState("");
    const [password, passwordchange] = useState("");
    const [email, emailchange] = useState("");
    const [phone, phonechange] = useState("");
    const [country, countrychange] = useState("india");
    const [address, addresschange] = useState("");
    const [gender, genderchange] = useState("female");  // default value female

    const navigate = useNavigate();

    // Custome Validation 

    const IsValidate = () => {
        let isproceed = true;
        let errormessage = 'Please enter the value in ';

        if (id === null || id === '')   // id = null or emty hoy tyre 
        {
            isproceed = false;
            errormessage += ' Username';
        }

        if (name === null || name === '') {
            isproceed = false;
            errormessage += ' Fullname';
        }
        if (password === null || password === '') {
            isproceed = false;
            errormessage += ' Password';
        }
        if (email === null || email === '') {
            isproceed = false;
            errormessage += ' Email';
        }

        if (!isproceed)   // id null and emty hoy tyre a condition true thase
        {
            toast.warning(errormessage);
        } else {  // data hase tyre ama avse and email id check karse  first a to z and @pachi email avu pade
            if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {

            } else { // email upar ni condition mujab nahi hoy to error message show thase
                isproceed = false;
                toast.warning('Please enter the valid email')
            }
        }
        return isproceed;
    }

    const handlesubmit = (e) => {
        e.preventDefault();
        let regobj = { id, name, password, email, phone, country, address, gender };   // same like id:id,name:name
        console.log(regobj, "obj");

        if (IsValidate()) {

            fetch("http://localhost:3000/user", {
                method: "POST",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(regobj)
            }).then((res) => {
                toast.success("Registered successfully.")
                navigate('/login');
            }).catch((err) => {
                toast.error('Failed :' + err.message);
            })

        }
    }
    return (
        <div>
            <h1>User Registeration</h1>
            <div className="offset-lg-3 col-lg-6">
                <form className="container" onSubmit={handlesubmit}>
                    <div className="card">
                        <div className="card-header">
                            <h1>User Registeration</h1>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>User Name <span className="errmsg">*</span></label>
                                        <input

                                            value={id}
                                            onChange={e => idchange(e.target.value)}
                                            className="form-control"></input>
                                    </div>
                                </div>

                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Password <span className="errmsg">*</span></label>
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={e => passwordchange(e.target.value)}
                                            className="form-control"></input>
                                    </div>
                                </div>

                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Full Name <span className="errmsg">*</span></label>
                                        <input
                                            value={name}
                                            onChange={e => namechange(e.target.value)}
                                            className="form-control"></input>
                                    </div>
                                </div>

                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Email <span className="errmsg">*</span></label>
                                        <input
                                            value={email}
                                            onChange={e => emailchange(e.target.value)}
                                            className="form-control"></input>
                                    </div>
                                </div>

                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Phone <span className="errmsg"></span></label>
                                        <input
                                            value={phone}
                                            onChange={e => phonechange(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>

                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Country <span className="errmsg">*</span></label>
                                        <select
                                            value={country} onChange={e => countrychange(e.target.value)}
                                            className="form-control">
                                            <option value="india">India</option>
                                            <option value="usa">USA</option>
                                            <option value="singapore">Singapore</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Address</label>
                                        <textarea
                                            value={address} onChange={e => addresschange(e.target.value)}
                                            className="form-control"></textarea>
                                    </div>
                                </div>

                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Gender</label>
                                        <br></br>
                                        <input
                                            type="radio"
                                            checked={gender === 'male'} onChange={e => genderchange(e.target.value)}
                                            name="gender" value="male" className="app-check"></input>
                                        <label>Male</label>
                                        <input

                                            type="radio"
                                            checked={gender === 'female'} onChange={e => genderchange(e.target.value)}
                                            name="gender" value="female" className="app-check"></input>
                                        <label>Female</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary">Register</button>
                            {/* <Link to={'/login'} className="btn btn-danger">Close</Link> */}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register