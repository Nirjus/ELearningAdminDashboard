'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import DataCard from '../_components/DataCard';
import Chart from '../_components/Chart';
import { useToast } from '@/components/ui/use-toast';

const UserEnrollment = ({params}:{params:{userId: string}}) => {
  const [analytic, setAnalytic] = useState<any>({}); 
  const router = useRouter();
  const {toast} = useToast();
  useEffect(() => {
   const getAnalytics = async () => {
    try {
       await axios.get(`/enroll/enroll-analytic/${params.userId}`,{
        withCredentials: true
       }).then((res) => {
         setAnalytic(res.data.analytics);
       }).catch((error: any) => {
         toast({
          title: "No Enrolled course found",
          description: error.response.data.message
         })
       })
    } catch (error) {
      console.log(error);
    }
   }
   getAnalytics()
  },[params, toast])

  return (
    <div className=' p-6'>
      <Button onClick={() => router.back()} className=' mb-4' variant={"outline"} size={"sm"}>
        <ArrowLeftIcon className=' w-4 h-4 mr-2' /> Back
      </Button>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
    <DataCard label='Total Revenue' value={analytic?.totalRevenue || 0} shouldFormat />
     <DataCard label='Total Courses' value={analytic?.totalSales || 0} />
    </div>
    <Chart data={analytic?.enrolledCourse} />
 </div>
  )
}

export default UserEnrollment