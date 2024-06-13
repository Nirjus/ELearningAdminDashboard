"use client";
import { Trash } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface courseActionProps {
  disabled: boolean;
  categoryId: string;
  isPublished: boolean;
}

const CategoryAction = ({
  disabled,
  categoryId,
  isPublished,
}: courseActionProps) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const onPublish = async () => {
    try {
      setLoading(true);
      await axios
        .put(
          `/category/publish-category/${categoryId}`,
          {
            isPublished: !isPublished,
          },
          { withCredentials: true }
        )
        .then((res) => {
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
            variant: "destructive",
            title: "Error",
            description: error.response.data.message,
          });
        });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const onDelete = async () => {
    try {
      setLoading(true);
      await axios
        .delete(`/category/delete/${categoryId}`, { withCredentials: true })
        .then((res) => {
          setLoading(false);
          toast({
            title: "Success",
            description: res.data.message,
          });
          router.refresh();
          router.push(`/teacher/categories`);
        })
        .catch((error: any) => {
          setLoading(false);
          toast({
            variant: "destructive",
            title: "Error",
            description: error.response.data.message,
          });
        });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <div className=" flex items-center gap-x-2">
      <Button
        onClick={onPublish}
        disabled={!disabled || loading}
        variant={"outline"}
        size={"sm"}
      >
        {isPublished ? "Unpublished" : "Published"}
      </Button>
      <ConfirmModal onConFirm={onDelete}>
        <Button size={"sm"} disabled={loading}>
          <Trash className=" w-4 h-4" />
        </Button>
      </ConfirmModal>
    </div>
  );
};

export default CategoryAction;
