import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

function Edit() {
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const { id } = useParams()

    const submit = async () => {
        try {
            let {data} = await axios.put(`https://reactjs-8b9ba-default-rtdb.firebaseio.com/users/${id}.json`, {
                email: email,
                password: password
            })
            setemail("")
            setpassword("")
          
        } catch (error) {
            console.log(error);
            return false
        }

    }

    useEffect(()=>{
      axios.get(`https://reactjs-8b9ba-default-rtdb.firebaseio.com/users/${id}.json`)
      .then((res)=>{
        let single = res.data;
        setemail(single.email)
        setpassword(single.password)
      }).catch((error)=>{
        console.log(error);
        return false
      })
    },[])

    return (
        <div>
            <div className="container">
                <Link to={"/"}>Add</Link>
                <div className="row">
                    <form style={{ background: "lightgreen", padding: "20px", margin: "20px" }}>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input value={email} onChange={(e) => setemail(e.target.value)} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input value={password} onChange={(e) => setpassword(e.target.value)} type="password" className="form-control" id="exampleInputPassword1" />
                        </div>
                        <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                            <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                        </div>
                        <button type="button" onClick={submit} className="btn btn-primary">Edit</button>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default Edit
