"use client";
import axios from "axios";
import { Pencil } from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  courseId: string;
  data: any;
  setData: (data: any) => void;
};

const LevelForm = ({ courseId, data, setData }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tempLevel, setTempLevel] = useState(data?.courseLevel || "");
  const { toast } = useToast();
  const router = useRouter();
  const options = ["easy", "medium", "hard"];
  const toggleEdit = () => {
    setIsEditing(!isEditing);
    setTempLevel(data?.courseLevel || "");
  };
 
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios
        .put(`/course/edit-course/${courseId}`, {courseLevel: tempLevel}, {
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
  return (
    <div className=" mt-6 border bg-slate-100 rounded-md p-4">
      <div className="flex font-medium items-center justify-between">
        Course level
        <Button onClick={() => toggleEdit()} variant={"ghost"}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className=" h-4 w-4 mr-2" />
              Edit level
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p
          className={cn(
            " text-sm mt-2",
            !data?.courseLevel && " text-slate-500 italic"
          )}
        >
          {data?.courseLevel || "No level"}
        </p>
      )}
      {isEditing && (
        <form action="" onSubmit={handleSubmit} className=" space-y-4 mt-4">
          <div className="">
            <Select onValueChange={(e) => setTempLevel(e)} value={tempLevel}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select course level" />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem value={option} key={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className=" flex items-center gap-x-2">
            <Button type="submit" disabled={!tempLevel || loading}>
              Save
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default LevelForm;
