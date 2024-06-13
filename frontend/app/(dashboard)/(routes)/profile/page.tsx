"use client";
import { cn } from "@/lib/utils";
import {
  FilePenLine,
  LockKeyhole,
  LogOut,
  User,
} from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditProfile from "./_components/EditProfile";
import Profile from "./_components/Profile";
import { Button } from "@/components/ui/button";
import UpdatePassword from "./_components/UpdatePassword";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

type Props = {};

const userOptions = [
  {
    icon: User,
    label: "Profile",
    option: 0,
    iconColor: "text-gray-700",
    bgColor: "bg-gray-500/10",
  },
  {
    icon: FilePenLine,
    label: "Edit Profile",
    option: 1,
    iconColor: "text-gray-700",
    bgColor: "bg-gray-500/10",
  },
  {
    icon: LockKeyhole,
    label: "Update password",
    option: 2,
    iconColor: "text-gray-700",
    bgColor: "bg-gray-500/10",
  },
];

const ProfilePage = (props: Props) => {
  const { user } = useSelector((state: any) => state.user);
  const [option, setOption] = useState(0);
  const router = useRouter();
  const dispatch = useDispatch();
  const {toast} = useToast();
  const logoutHandler = async () => {
    await axios.get("/user/logout",{
        withCredentials: true
    }).then((res) => {
        dispatch({
            type:"LOAD_USER",
            payload:{
                user: undefined,
                token: ""
            }
        })
        router.replace("/sign-in");
        toast({
            title: "Success",
            description: res.data.message
        })
    })
  }
  return (
    <div className=" w-full h-full flex justify-center items-center">
      <div className=" p-4 shadow-md border-2 border-gray-100 rounded-[10px] 800px:w-[50%] 600px:w-[70%] w-[80%] flex flex-col justify-center items-center">
        {option === 0 && <Profile user={user} />}
        {option === 1 && <EditProfile user={user} />}
        {option === 2 && <UpdatePassword />}
        <div className=" mt-4 p-2 w-full h-[100px] flex items-center justify-center gap-10">
          {userOptions.map((item) => (
            <div
              key={item?.option}
              className={cn(
                "w-[80px] h-[100px] cursor-pointer rounded-md flex flex-col justify-center items-center border-2 hover:bg-gray-500/30 border-gray-500/30",
                item.bgColor,
                option === item?.option && "bg-gray-500/30"
              )}
              onClick={() => setOption(item?.option)}
            >
              <item.icon className={`${item.iconColor} m-2`} />
              <p className={`${item.iconColor} text-sm text-center`}>
                {item?.label}
              </p>
            </div>
          ))}
        </div>
        <div className=" w-full mt-4 px-4 ">
        <Button variant={"destructive"} className=" gap-2" onClick={() => logoutHandler()}>
            <LogOut /> logout
        </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
