import React from "react";

type Props = {
  progressCounter: number;
  selectedFileName: string
};

const LinearProgress = ({ progressCounter, selectedFileName }: Props) => {
  return (
   <div className=" md:w-[60%] w-[80%] p-2 pl-3 flex items-center justify-start gap-x-3 bg-white mb-3 border-2 border-[#8d8d905c] rounded-md">
   <div className=" w-[85%]">
   <p className=" mb-2 ml-1 text-xs font-semibold">{selectedFileName}</p>
     <div className="w-full bg-gray-200 rounded-full h-1.5 ">
      <div
        className="bg-blue-600 h-1.5 rounded-full "
        style={{ width: `${progressCounter}%` }}
      ></div>
    </div>
   </div>
<div className="w-10 h-10 flex justify-center items-center bg-blue-100 rounded-full">
<p className=" text-xs text-blue-600 font-bold">{progressCounter}%</p>

</div>
   </div>
  );
};

export default LinearProgress;
