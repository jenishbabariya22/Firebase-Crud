import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function View() {
  const [record, setrecord] = useState([])
  const viewrecord = async () => {
    try {
      let {data} = await axios.get("https://reactjs-8b9ba-default-rtdb.firebaseio.com/users.json")
      let result =[]
      for(let i in data){
        result.unshift({
          ...data[i],id : i
        })
      }
      setrecord(result)
    } catch (error) {
      console.log(error);
      return false
    }
  }

  const remove =async(id)=>{
    try {
      let {data}= await axios.delete(`https://reactjs-8b9ba-default-rtdb.firebaseio.com/users/${id}.json`)
      viewrecord()
    } catch (error) {
      console.log(error);
      return false
    }
  }

  useEffect(() => {
    viewrecord()
  }, [])
  return (
    <div>
      <div className="container">
        <Link to={"/add"}>Add</Link>
        <div className="row">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">Email</th>
                <th scope="col">Password</th>
              </tr>
            </thead>
            <tbody>
              {
               record && record.map((val,i) =>
                  <tr>
                    <td>{i+1}</td>
                    <td>{val.email}</td>
                    <td>{val.password}</td>
                    <td>
                      <button onClick={()=>remove(val.id)}>Delete</button>
                     <Link to={`/edit/${val.id}`}> <button >Edit</button></Link>
                      </td>
                  </tr>
                )
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default View
