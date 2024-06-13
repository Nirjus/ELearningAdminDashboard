"use client";
import axios from "axios";
import { Pencil } from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";

type Props = {
  courseId: string;
  chapterId: string;
  data: any;
  setData: (data: any) => void;
};

const ChapterAccessForm = ({ courseId, chapterId, data, setData }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tempIsFree, setTempIsFree] = useState(!!data?.isFree);
  const { toast } = useToast();
  const router = useRouter();
  const toggleEdit = () => {
    setIsEditing(!isEditing);
    setTempIsFree(!!data?.isFree);
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios
        .put(`/course/edit-chapter/${courseId}/chapter?chapterId=${chapterId}`, {isFree:tempIsFree}, {
          withCredentials: true,
        })
        .then((res) => {
          setData(res.data.chapter);
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
  return (
    <div className=" mt-6 border bg-slate-100 rounded-md p-4">
      <div className="flex font-medium items-center justify-between">
        Chapter access
        <Button onClick={() => toggleEdit()} variant={"ghost"}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className=" h-4 w-4 mr-2" />
              Edit access
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
         <p className={cn(" text-sm mt-2", !data?.isFree && "text-slate-500 italic")}>
         {data?.isFree ? (
          <>This chapter is free for preview.</>
         ):(
          <>This is not free chapter</>
         )}
       </p>
      )}
      {isEditing && (
        <form action="" onSubmit={handleSubmit} className=" space-y-4 mt-4">
          <div className=" flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
           <Checkbox checked={tempIsFree} onCheckedChange={() => setTempIsFree(!tempIsFree)} />
           <div className={cn("space-y-1 leading-none text-sm ", !tempIsFree && "text-muted-foreground")}>
             Check this box if you want to make this chapter free for preview
           </div>
          </div>
          <div className=" flex items-center gap-x-2">
            <Button type="submit" disabled={loading}>
              Save
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ChapterAccessForm;
