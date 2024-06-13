'use client'
import React, { useEffect, useState } from 'react'
import { DataTable } from './_components/data-table'
import { columns } from './_components/columns'
import axios from 'axios'

type Props = {}

const CoursesPage = (props: Props) => {
    const [courses, setCourses] = useState([]);
    
    useEffect(() => {
      const getAllCourses = async () => {
       try {
            await axios.get("/course/getAll-courses/admin",{
              withCredentials: true
            }).then((res) => {
              setCourses(res.data.courses);
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
     <DataTable columns={columns} data={courses} />

    </div>
  )
}

export default CoursesPage