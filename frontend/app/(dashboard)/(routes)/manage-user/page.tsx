'use client'
import React, { useEffect, useState } from 'react'
import { DataTable } from './_components/data-table'
import { columns } from './_components/columns'
import axios from 'axios'

type Props = {}

const ManageUser = (props: Props) => {
  const [users, setUsers] = useState([]);
    
  useEffect(() => {
    const getAllCourses = async () => {
     try {
          await axios.get("/member/getAll-member",{
            withCredentials: true
          }).then((res) => {
            setUsers(res.data.usersWithMembers);
          }).catch((error) => {
            console.log(error.response.data.message);
          })
     } catch (error) {
      console.log(error);
     }
    }
    getAllCourses();
  },[])
  return (
    <div className=' p-6'>
     <DataTable columns={columns} data={users} />
    </div>
  )
}

export default ManageUser