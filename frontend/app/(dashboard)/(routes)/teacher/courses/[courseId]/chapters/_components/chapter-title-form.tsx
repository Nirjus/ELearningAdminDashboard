"use client";
import axios from "axios";
import { Pencil } from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

type Props = {
  courseId: string;
  chapterId: string;
  data: any;
  setData: (data: any) => void;
};

const ChapterTitleForm = ({ courseId, chapterId, data, setData }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tempTitle, setTempTitle] = useState(data?.title || "");
  const { toast } = useToast();
  const router = useRouter();
  const toggleEdit = () => {
    setIsEditing(!isEditing);
    setTempTitle(data?.title || "");
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios
        .put(`/course/edit-chapter/${courseId}/chapter?chapterId=${chapterId}`, {title:tempTitle}, {
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
        Chapter title
        <Button onClick={() => toggleEdit()} variant={"ghost"}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className=" h-4 w-4 mr-2" />
              Edit title
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
         <p className={cn(" text-sm mt-2", !data?.title && " text-slate-500 italic")}>
         {data?.title || "No title"}
       </p>
      )}
      {isEditing && (
        <form action="" onSubmit={handleSubmit} className=" space-y-4 mt-4">
          <div className="">
            <Input
              placeholder="e.g 'Introduction to course'"
              type="text"
              value={tempTitle}
              onChange={(e) => setTempTitle(e.target.value)}
            />
          </div>
          <div className=" flex items-center gap-x-2">
            <Button type="submit" disabled={!tempTitle || loading}>
              Save
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ChapterTitleForm;
