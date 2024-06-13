'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { CategoryDataTable } from './_components/data-table-category'
import { CAtegorycolumns } from './_components/category-columns'

type Props = {}

const CategoryPage = (props: Props) => {
    const [categories, setCategories] = useState([]);
    
    useEffect(() => {
      const getAllCourses = async () => {
       try {
            await axios.get("/category/getAll-category/admin",{
              withCredentials: true
            }).then((res) => {
                setCategories(res.data.categories);
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
    <div>
          <div className=' p-6'>
     <CategoryDataTable columns={CAtegorycolumns} data={categories} />

    </div>
    </div>
  )
}

export default CategoryPage