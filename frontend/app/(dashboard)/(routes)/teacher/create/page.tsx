"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

type Props = {};

const CreatePage = (props: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [name, setName] = useState("");
  const onSubmitHandler = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios
        .post(
          "/course/onboarding",
          {
            name,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          setLoading(false);
          router.push(`/teacher/courses/${res.data.course?._id}`);
        })
        .catch((error: any) => {
          setLoading(false);
          toast({
            variant: "destructive",
            title: "Error",
            description: error.response?.data?.message,
          });
        });
    } catch (error: any) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className=" max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
      <div className="">
        <h1 className=" text-2xl">Name your course</h1>
        <p className=" text-sm text-slate-600">
          what would you like to name your course? dont worry, you can change
          this later
        </p>
        <form action="" onSubmit={onSubmitHandler} className=" space-y-8 mt-8">
          <label htmlFor="title">Course title</label>
          <Input
            type="text"
            id="title"
            placeholder="e.g. 'advance web development'"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <p className=" text-sm text-gray-500">
            what will you teach in this course?
          </p>
          <div className="flex items-center gap-x-2">
            <Link href={"/teacher/courses"}>
              <Button type="button" variant={"outline"}>
                cancel
              </Button>
            </Link>
            <Button type="submit" disabled={!name || loading}>
              continue
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePage;
