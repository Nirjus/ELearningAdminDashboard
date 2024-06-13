import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast';
import axios from 'axios';
import React, { useState } from 'react'

type Props = {}

const UpdatePassword = (props: Props) => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const {toast} = useToast();

    const handleSubmit = async (e: any) => {
    e.preventDefault()
    try {
      setLoading(false);
      await axios.put("/user/update-password", {
        oldPassword, newPassword
      }, {withCredentials: true}).then((res) => {
         toast({
          title:"Success",
          description: res.data.message
         })
         setOldPassword("");
         setNewPassword("");
      }).catch((error: any) => {
        toast({
          variant:"destructive",
          title:"Error",
          description: error.response.data.message
        })
      }).finally(() => setLoading(false))
    } catch (error) {
        setLoading(false);
        console.log(error)
    }
    }
  return (
    <div className=' h-[300px]'>
        <div className=' mt-8 w-[250px]'>
            <p className=' mb-4 font-medium text-[#000] text-center '>Update your password</p>
            <form action="" onSubmit={handleSubmit}>
            <div className=" mb-4 w-full">
            <Input
              value={oldPassword}
              type="password"
              className=" bg-gray-100"
              placeholder="Enter your old Password.."
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div className=" mb-4 w-full">
            <Input
              value={newPassword}
              type="password"
              className=" bg-gray-100"
              placeholder="Enter your new Password.."
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
      <div className=' w-full mt-10'>
        <Button className=' w-full' type={"submit"} disabled={loading || !oldPassword || !newPassword}>
            Update
        </Button>
      </div>
            </form>
        </div>
    </div>
  )
}

export default UpdatePassword