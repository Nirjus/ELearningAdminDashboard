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
  options: { label: string; value: string }[];
};

const CategoryForm = ({ courseId, data, setData, options }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tempCategory, setTempCategory] = useState(data?.category || "");
  const { toast } = useToast();
  const router = useRouter();

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    setTempCategory(data?.category || "");
  };
 
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios
        .put(`/course/edit-course/${courseId}`, {category: tempCategory}, {
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
        Course category
        <Button onClick={() => toggleEdit()} variant={"ghost"}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className=" h-4 w-4 mr-2" />
              Edit category
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p
          className={cn(
            " text-sm mt-2",
            !data?.category && " text-slate-500 italic"
          )}
        >
          {data?.category || "No category"}
        </p>
      )}
      {isEditing && (
        <form action="" onSubmit={handleSubmit} className=" space-y-4 mt-4">
          <div className="">
            <Select onValueChange={(e) => setTempCategory(e)} value={tempCategory}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem value={option.label} key={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className=" flex items-center gap-x-2">
            <Button type="submit" disabled={!tempCategory || loading}>
              Save
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CategoryForm;
