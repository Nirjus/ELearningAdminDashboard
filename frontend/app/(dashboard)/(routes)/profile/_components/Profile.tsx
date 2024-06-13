import { CircleUserRound, ShieldCheck } from "lucide-react";
import Image from "next/image";
import React from "react";

type Props = {
  user: any;
};

const Profile = ({ user }: Props) => {
  return (
    <div className="h-[300px]">
      <div className=" w-full flex justify-center items-center">
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
      </div>
      <div className=" m-4">
        <p className=" text-[25px] font-extrabold text-center">
          {" "}
          <span className=" font-semibold">Hi</span> {user?.name} 👋
        </p>
        <div className=" flex my-2 items-center justify-center gap-2 border-2 border-dashed p-2 rounded-[5px] border-[#8d78f3]">
          <p className=" font-bold text-[20px] text-[#7140f9]">{user?.role}</p>
          <ShieldCheck color="#7140f9" />
        </div>
        <p className=" text-[#666] text-center">
          <span className=" font-bold">Email:</span> {user?.email}
        </p>
        <p className=" p-2 my-2 bg-gray-300 rounded-xl rounded-tl-none text-center text-sm text-gray-900">
        Dedicated admin ensuring <br /> seamless eLearning experiences
        </p>
      </div>
      
    </div>
  );
};

export default Profile;
