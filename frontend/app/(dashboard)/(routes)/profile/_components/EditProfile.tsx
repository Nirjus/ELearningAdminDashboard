import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { Camera, CircleUserRound } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

type Props = {
  user: any;
};

const EditProfile = ({ user }: Props) => {
  const [image, setImage] = useState({url:"", file:""});
  const {token} = useSelector((state:any) => state.user);
  const [name, setName] = useState(user?.name);
  const [loading, setLoading] = useState(false);
  const {toast} = useToast();
  const dispatch = useDispatch();
  const updateHandler = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("file", image.file);
      await axios.put(`/user/update`, 
        formData
      ,{withCredentials: true}).then((res) => {
          toast({
            title:"Success",
            description: res.data.message
          })  
          dispatch({
            type:"LOAD_USER",
            payload:{
                user: res.data.user,
                token: token
            }
          })
     }).catch((error: any) => {
      toast({
        variant:"destructive",
        title: "Error",
        description:error.response.data.message
      })
     }).finally(() => setLoading(false))
    } catch (error: any) {
      console.log(error);
    }
  };
  
  const imageHandler = async () => {
    const inputFile = document.createElement("input");
    inputFile.type = "file";
    inputFile.addEventListener("change", (e:any) => {
      const file = e.target.files[0];
        const imageUrl = URL.createObjectURL(file);
        setImage({url: imageUrl, file: file});
       
    });
    inputFile.click();
  }
  return (
    <div className=" h-[300px] ">
     <div className=" w-full flex justify-center items-center">
     <div className="w-[100px] relative">
        {image.url ? (
          <Image
            alt="profile-pic"
            src={image.url}
            width={500}
            height={500}
            className=" w-[100px] h-[100px] rounded-full object-cover border border-cyan-400"
          />
        ) : (
          <>
            {user?.avatar?.url ? (
              <Image
                alt="profile-pic"
                src={user?.avatar?.url}
                width={500}
                height={500}
                className=" w-[100px] h-[100px] rounded-full object-cover border border-cyan-400"
              />
            ) : (
              <div className=" w-[100px] h-[100px] rounded-full justify-center flex items-center bg-[#ad3ff1]">
                <CircleUserRound size={100} color={"#fff"} />
              </div>
            )}
          </>
        )}
        <div className=" bg-white rounded-full absolute bottom-2 right-0 cursor-pointer" onClick={() => imageHandler()}>
            <Camera size={20} />
        </div>
      </div>
     </div>
      <form onSubmit={updateHandler}>
        <div className=" mt-4 w-[250px]">
          <div className=" mb-4 w-full">
            <Input
              value={name}
              className=" bg-gray-100"
              placeholder="Enter your name.."
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className=" mb-4 w-full">
            <Input value={user?.email} readOnly className=" bg-gray-100" />
          </div>
          <Button className=" w-full" disabled={!name || loading} type="submit">
            Update
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
