"use client";
import axios from "axios";
import { Pencil } from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/format";

type Props = {
  courseId: string;
  data: any;
  setData: (data: any) => void;
};

const PriceForm = ({ courseId, data, setData }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tempPrice, setTempPrice] = useState(data?.price || "");
  const { toast } = useToast();
  const router = useRouter();

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    setTempPrice(data?.price || "");
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios
        .put(`/course/edit-course/${courseId}`, {price:tempPrice}, {
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
        Course price
        <Button onClick={() => toggleEdit()} variant={"ghost"}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className=" h-4 w-4 mr-2" />
              Edit price
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
         <p className={cn(" text-sm mt-2", data?.price === undefined && " text-slate-500 italic")}>
         {data?.price !== undefined ?
         formatPrice(data?.price) : "No price"}
       </p>
      )}
      {isEditing && (
        <form action="" onSubmit={handleSubmit} className=" space-y-4 mt-4">
          <div className="">
            <Input
              placeholder="Set a price for your course"
              step={"0.01"}
              type="number"
              value={tempPrice}
              onChange={(e) => setTempPrice(e.target.value)}
            />
          </div>
          <div className=" flex items-center gap-x-2">
            <Button type="submit" disabled={!tempPrice || loading}>
              Save
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default PriceForm;
