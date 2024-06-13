"use client";
import axios from "axios";
import { Pencil } from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import TextEditor from "@/components/editor";
import Preview from "@/components/preview";

type Props = {
  chapterId: string
  courseId: string;
  data: any;
  setData: (data: any) => void;
};

const ChapterContentForm = ({ courseId,chapterId, data, setData }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tempContent, setTempContent] = useState(data?.content || "");
  const { toast } = useToast();
  const router = useRouter();

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    setTempContent(data?.content || "");
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios
      .put(`/course/edit-chapter/${courseId}/chapter?chapterId=${chapterId}`, {content:tempContent}, {
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
        Chapter content
        <Button onClick={() => toggleEdit()} variant={"ghost"}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className=" h-4 w-4 mr-2" />
              Edit content
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <div className={cn(" text-sm mt-2", !data?.content && " text-slate-500 italic")}>
          {!data?.content ? "No chapter content" : <Preview value={data?.content}/> }
        </div>
      )}
      {isEditing && (
        <form action="" onSubmit={handleSubmit} className=" space-y-4 mt-4">
          <div className="">
            <TextEditor
              value={tempContent}
              onChange={setTempContent}
            />
          </div>
          <div className=" flex items-center gap-x-2">
            <Button type="submit" disabled={!tempContent || loading}>
              Save
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ChapterContentForm;
