"use client";
import axios from "axios";
import { PlusCircle, X } from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

type Props = {
  courseId: string;
  data: any;
  setData: (data: any) => void;
};

const TagsForm = ({ courseId, data, setData }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tempTags, setTempTags] = useState("");
  const { toast } = useToast();
  const router = useRouter();
  const toggleEdit = () => {
    setIsEditing(!isEditing);
    setTempTags("");
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios
        .put(`/course/edit-course/${courseId}`, {tags:tempTags}, {
          withCredentials: true,
        })
        .then((res) => {
          setData(res.data.course);
          toast({
            title: "Success",
            description: res.data.message,
          });
          toggleEdit();
          setLoading(false);
          router.refresh();
        })
        .catch((error: any) => {
          setLoading(false);
          toast({
            title: "Error",
            variant: "destructive",
            description: error.response.data.message,
          });
        });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const deleteTags = async (index: number) => {
    try {
       await axios.put(`/course/delete-tags/${courseId}`,{index},{
        withCredentials: true
       }).then((res) => {
        setData(res.data.course);
        router.refresh();
       }).catch((error: any) => {
        toast({
          title: "Error",
          variant: "destructive",
          description: error.response.data.message,
        });
       })
    } catch (error: any) {
      console.log(error)
    }
  }
  return (
    <div className=" mt-6 border bg-slate-100 rounded-md p-4">
      <div className="flex font-medium items-center justify-between">
        Course tags
        <Button onClick={() => toggleEdit()} variant={"ghost"}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className=" h-4 w-4 mr-2" />
              add tags
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <>
        {
          data?.tags?.length !== 0 ? (
         <div className=" mt-2 flex items-center flex-wrap gap-3">
             {
              data?.tags?.map((tag: string, index: number) => (
               <div key={index} className=" flex items-center gap-x-2 justify-between p-1 bg-slate-300/60 border border-slate-400/80 rounded-full">
                 <p className=" text-sm pl-[2px]">
                  {tag}
                </p>
                <X size={18} className=" cursor-pointer hover:bg-slate-50 rounded-full" onClick={() => deleteTags(index)}/>
               </div>
               ))
             }
         </div>
          ):(
            <p className={cn(" text-sm mt-2 text-slate-500 italic")}>
            No tags
          </p>   
          )
        }
        </>
         
      )}
      {isEditing && (
        <form action="" onSubmit={handleSubmit} className=" space-y-4 mt-4">
          <div className="">
            <Input
              placeholder="e.g 'Machine Learning', 'Data Science'"
              type="text"
              value={tempTags}
              onChange={(e) => setTempTags(e.target.value)}
            />
          </div>
          <div className=" flex items-center gap-x-2">
            <Button type="submit" disabled={!tempTags || loading}>
              Save
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default TagsForm;
