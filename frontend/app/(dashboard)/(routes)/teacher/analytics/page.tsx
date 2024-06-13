'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import DataCard from './_components/DataCard'
import Chart from './_components/Chart'

type Props = {}

const Analytics = (props: Props) => {
 const [analytic, setAnalytic] = useState<any>({}); 
  useEffect(() => {
   const getAnalytics = async () => {
    try {
       await axios.get("/enroll/total-analytic",{
        withCredentials: true
       }).then((res) => {
         setAnalytic(res.data.analytics);
       })
    } catch (error) {
      console.log(error);
    }
   }
   getAnalytics()
  },[])
  
  return (
    <div className=' p-6'>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
       <DataCard label='Total Revenue' value={analytic?.totalRevenue || 0} shouldFormat />
        <DataCard label='Total Sales' value={analytic?.totalSales || 0} />
       </div>
       <Chart data={analytic?.enrolledCourse} />
    </div>
  )
}

export default Analytics