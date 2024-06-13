import { CloudUpload } from "lucide-react";
import Image from "next/image";
import React from "react";

type Props = {
  setFile: (file: any) => void;
  file: any;
  onChangeFile: boolean;
  setOnChangeFile: (onChangeFile: boolean) => void;
};

const IconUpload = ({
  setFile,
  file,
  onChangeFile,
  setOnChangeFile,
}: Props) => {

  const onChangeHandler = (event: any) => {
    const file = event.target.files[0];
    setFile(file);
    setOnChangeFile(true);
  };
  const handleDragOver = (e:React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
  }
  const handleDragLeave = (e:React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
  }
  const handleDrop = (e:React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
     const file = e.dataTransfer.files[0];
     setFile(file);
    setOnChangeFile(true);
  }
  return (
    <div className=" w-full h-full ">
      <label
        htmlFor="input-file"
        className=" bg-slate-50 border-2 border-[#8b8b8b46] rounded-md w-full h-full flex flex-col justify-center items-center "
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept="image/*"
          onChange={onChangeHandler}
          id="input-file"
          className=" hidden"
        />
        {onChangeFile && file ? (
          <div className=" w-full relative aspect-video ">
                <Image
                alt="uploaded-file"
                src={URL.createObjectURL(file)}
                fill
                className=" absolute rounded-md object-contain "
              />
          </div>
        ) : (
          <div className=" w-full h-60 flex flex-col items-center justify-center">
            <div className=" cursor-pointer bg-slate-400 p-3 rounded-full ">
              <CloudUpload className=" w-12 h-12" color={"white"} />
            </div>
            <p className=" cursor-pointer mt-2 text-center text-sky-600 font-semibold text-sm">
              Drag and drop or click here <br /> to upload icon png
            </p>
            <span className=" mt-3 italic text-center text-sm text-slate-500">
              Upload flaticons 
            </span>
          </div>
        )}
      </label>
    </div>
  );
};

export default IconUpload;
