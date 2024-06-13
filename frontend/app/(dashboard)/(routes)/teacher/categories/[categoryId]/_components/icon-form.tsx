"use client";
import axios from "axios";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import LinearProgress from "@/components/Linear-progressbar";
import IconUpload from "./icon-upload";

type Props = {
  categoryId: string;
  data: any;
  setData: (data: any) => void;
};

const CategoryIconForm = ({ categoryId, data, setData }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<any>("");
  const [progressBar, setProgressBar] = useState(0);
  const [onChangeFile, setOnChangeFile] = useState(false);

  const { toast } = useToast();
  const router = useRouter();

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    setOnChangeFile(false);
    setImage("");
  };
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", image);

      await axios
        .put(`/category/update/${categoryId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
          onUploadProgress: (event) => {
            if (event.total) {
              setProgressBar(Math.round((100 * event.loaded) / event.total));
            }
          },
        })
        .then((res) => {
          setData(res.data.category);
          toast({
            title: "Success",
            description: res.data.message,
          });
          toggleEdit();
          router.refresh();
          setProgressBar(0);
        })
        .catch((error: any) => {
          setProgressBar(0);
          toast({
            title: "Error",
            variant: "destructive",
            description: error.response.data.message,
          });
        }).finally(() => setLoading(false));
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className=" mt-6 border bg-slate-100 rounded-md p-4">
      <div className="flex font-medium items-center justify-between">
        Category Icon
        <Button onClick={() => toggleEdit()} variant={"ghost"}>
          {isEditing && <>Cancel</>}
          {!isEditing && !data?.icon?.url && (
            <>
              <PlusCircle className=" h-4 w-4 mr-2" />
              Add an image
            </>
          )}
          {!isEditing && data?.icon?.url && (
            <>
              <Pencil className=" h-4 w-4 mr-2" />
              Edit banner
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!data?.icon?.url ? (
          <div className=" flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <ImageIcon className=" h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className=" relative aspect-video mt-2">
            <Image
              alt="upload"
              fill
              className=" object-contain rounded-md absolute"
              src={data?.icon?.url}
            />
          </div>
        ))}
      {isEditing && (
        <div className=" h-full w-full">
          <IconUpload
            setFile={setImage}
            file={image}
            onChangeFile={onChangeFile}
            setOnChangeFile={setOnChangeFile}
          />
          <div className="mt-4 md:flex items-center gap-4">
            {onChangeFile && image ? (
              <>
                <LinearProgress
                  selectedFileName={image?.name || "File name here"}
                  progressCounter={progressBar}
                />
                <Button
                  disabled={loading || !image}
                  onClick={handleSubmit}
                  type="submit"
                >
                  Save
                </Button>
              </>
            ) : (
              <p className=" text-xs text-muted-foreground">
                16:9 aspect ratio recommended
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryIconForm;
