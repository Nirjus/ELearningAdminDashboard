"use client";
import { Trash } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface courseActionProps {
  disabled: boolean;
  courseId: string;
  isPublished: boolean;
}

const CourseAction = ({
  disabled,
  courseId,
  isPublished,
}: courseActionProps) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const router = useRouter();
  const onPublish = async () => {
    try {
      setLoading(true);
      await axios
        .put(
          `/course/publish-course/${courseId}`,
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
          if (!isPublished) {
            dispatch({
              type: "CONFETTI_OPEN",
            });
          }
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
        .delete(`/course/delete-course/${courseId}`, { withCredentials: true })
        .then((res) => {
          setLoading(false);
          toast({
            title: "Success",
            description: res.data.message,
          });
          router.refresh();
          router.push(`/teacher/courses`);
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

export default CourseAction;
