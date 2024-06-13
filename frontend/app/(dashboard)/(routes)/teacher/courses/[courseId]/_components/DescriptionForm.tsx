"use client";
import axios from "axios";
import { Pencil } from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  courseId: string;
  data: any;
  setData: (data: any) => void;
};

const DescriptionForm = ({ courseId, data, setData }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tempDescription, setTempDescription] = useState(data?.description || "");
  const { toast } = useToast();
  const router = useRouter();

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    setTempDescription(data?.description || "");
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios
        .put(`/course/edit-course/${courseId}`,{description:tempDescription}, {
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
        Course description
        <Button onClick={() => toggleEdit()} variant={"ghost"}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className=" h-4 w-4 mr-2" />
              Edit description
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p className={cn(" text-sm mt-2", !data?.description && " text-slate-500 italic")}>
          {data?.description || "No description"}
        </p>
      )}
      {isEditing && (
        <form action="" onSubmit={handleSubmit} className=" space-y-4 mt-4">
          <div className="">
            <Textarea
              placeholder="e.g 'This course is about...'"
              value={tempDescription}
              onChange={(e) => setTempDescription(e.target.value)}
            />
          </div>
          <div className=" flex items-center gap-x-2">
            <Button type="submit" disabled={!tempDescription || loading}>
              Save
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default DescriptionForm;
