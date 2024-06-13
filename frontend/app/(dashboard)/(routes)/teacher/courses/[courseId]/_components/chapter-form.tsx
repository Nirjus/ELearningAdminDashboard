"use client";
import axios from "axios";
import { Loader2, PlusCircle } from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import ChapterList from "./ChapterList";

type Props = {
  courseId: string;
  data: any;
  setData: (data: any) => void;
};

const ChapterForm = ({ courseId, data, setData }: Props) => {
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tempTitle, setTempTitle] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  const toggleCreating = () => {
    setIsCreating(!isCreating);
    setTempTitle("");
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios
        .post(`/course/add-chapter/${courseId}`,{title: tempTitle}, {
          withCredentials: true,
        })
        .then((res) => {
          setData(res.data.course);
          toast({
            title: "Success",
            description: res.data.message,
          });
          toggleCreating();
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
  const onReorder = async ( index:number, newPosition: number) => {
    
    try {
      setLoading(true);
      await axios
        .put(`/course/reorder/${courseId}`,{
          index,
          newPosition
        }, {
          withCredentials: true,
        })
        .then((res) => {
          setData(res.data.course);
          setLoading(false);
          toast({
            title: "Success",
            description: res.data.message,
          });
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
  const onEdit = (id: string) => {
    router.push(`/teacher/courses/${courseId}/chapters/${id}`);
  }
  return (
    <div className=" relative mt-6 border bg-slate-100 rounded-md p-4">
      {
        loading && (
          <div className=" absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-md flex justify-center items-center">
            <Loader2 className=" animate-spin h-6 w-6 text-sky-700" />
          </div>
        )
      }
      <div className="flex font-medium items-center justify-between">
        Course chapters
        <Button onClick={() => toggleCreating()} variant={"ghost"}>
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className=" h-4 w-4 mr-2" />
              Add a chapter
            </>
          )}
        </Button>
      </div>
      
      {isCreating && (
        <form action="" onSubmit={handleSubmit} className=" space-y-4 mt-4">
          <div className="">
            <Input
            type="text"
              placeholder="e.g 'Introduction to cource...'"
              value={tempTitle}
              onChange={(e) => setTempTitle(e.target.value)}
            />
          </div>
            <Button type="submit" disabled={!tempTitle || loading}>
              Create
            </Button>
        </form>
      )}
      {
        !isCreating && (
          <div className={cn(" text-sm mt-2", data?.chapter?.length === 0 && " text-slate-500 italic")}>
          {data?.chapter?.length === 0 && "No chapters"}
         <ChapterList 
         data={data?.chapter}
         onReorder={onReorder}
         onEdit={onEdit}
         />
          </div>
        )
      }
      {
        !isCreating && data?.chapter?.length !== 0 && (
          <p className=" text-xs text-muted-foreground">Drag and drop to reorder the chapters</p>
        )
      }
    </div>
  );
};

export default ChapterForm;
