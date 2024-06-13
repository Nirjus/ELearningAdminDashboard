"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AlertTriangle, ArrowLeft, Eye, LayoutDashboard, NotebookPen, PlusCircle, Video } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import IconBadge from "@/components/icon-badge";
import Banner from "@/components/banner";
import ChapterTitleForm from "../_components/chapter-title-form";
import ChapterContentForm from "../_components/chapter-content-form";
import ChapterAccessForm from "../_components/chapter-access-form";
import VideoForm from "../_components/video-form";
import ChapterOutputForm from "../_components/chapter-output-form";
import ChapterAction from "../_components/chapter-action";
import { Button } from "@/components/ui/button";
import QuizForm from "../_components/quiz-Form";

const ChapterIDpage = ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const [chapter, setChapter] = useState<any>({});
  const [page, setPage] = useState(1);
  const router = useRouter();
  const { toast } = useToast();
  useEffect(() => {
    const getCourse = async () => {
      try {
        await axios
          .get(
            `/course/getChapter/${params.courseId}/chapter?chapterId=${params.chapterId}`,
            {
              withCredentials: true,
            }
          )
          .then((res) => {
            setChapter(res.data.chapter);
          })
          .catch((error) => {
            router.back();
            toast({
              variant: "destructive",
              title: "Error",
              description: error.response.data.message,
            });
          });
      } catch (error: any) {
        console.log(error);
      }
    };
    getCourse();
  }, [params, toast, router]);
  const requiredField = [
    chapter.title,
    chapter.output,
    chapter.content,
    chapter.video,
  ];
  const totalFields = requiredField.length;
  const completedFields = requiredField.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;
   
  return (
    <React.Fragment>
      {
        !chapter?.isPublished && (
          <Banner variant={"warning"} label="This chapter is unpublished. It will not be visible in the course" />
        )
      }
<div className=" p-6">
      <div className="flex items-center justify-center">
        <div className="w-full">
          <div className=" flex items-center gap-x-4 mb-6">
          <div
            className=" flex items-center cursor-pointer w-fit text-sm hover:opacity-75 transition"
            onClick={() => router.back()}
          >
            <ArrowLeft className=" h-4 w-4 mr-2" />
            Back to course setup
          </div>
          <Button size={"sm"} onClick={() => setPage(2)}>
            <PlusCircle  className=" h-4 w-4 mr-2" />
            Add quiz
          </Button>
          </div>
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col gap-y-2">
              <h1 className=" text-2xl font-medium">Chapter Creation</h1>
              <span>Complete all fields {completionText}</span>
            </div>
            <ChapterAction 
            disabled={totalFields === completedFields}
            courseId={params.courseId}
            chapterId={params.chapterId}
            isPublished={chapter?.isPublished}
            />
          </div>
        </div>
      </div>
    {
      page === 1 && (
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div className="space-y-4">
          <div>
            <div className=" flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className=" text-xl">Customize your chapter</h2>
            </div>
            <ChapterTitleForm
              courseId={params.courseId}
              chapterId={params.chapterId}
              data={chapter}
              setData={setChapter}
            />
            <ChapterContentForm 
             courseId={params.courseId}
             chapterId={params.chapterId}
             data={chapter}
             setData={setChapter}
            />
          </div>
          <div>
            <div className="flex items-center gap-x-2">
                <IconBadge icon={NotebookPen} />
                <h2 className=" text-xl">
                    Give output of content
                </h2>
            </div>
            <ChapterOutputForm
             courseId={params.courseId}
             chapterId={params.chapterId}
             data={chapter}
             setData={setChapter}
            />
          </div>
        </div>
        <div className=" space-y-4">
        <div>
            <div className="flex items-center gap-x-2">
                   <IconBadge icon={Video} />
                   <h2 className=" text-xl">
                    Add a video
                   </h2>
            </div>
            <VideoForm 
             courseId={params.courseId}
             chapterId={params.chapterId}
             data={chapter}
             setData={setChapter}
            />
          </div>
          <div>
            <div className="flex items-center gap-x-2">
                <IconBadge icon={Eye} />
                <h2 className=" text-xl">
                    Access settings <span className=" text-sm text-muted-foreground">(optional)</span>
                </h2>
            </div>
            <ChapterAccessForm 
              courseId={params.courseId}
              chapterId={params.chapterId}
              data={chapter}
              setData={setChapter}
            />
          </div>
          </div>
      </div>
      )
    }
    {
      page === 2 && (
        <QuizForm setPage={setPage} 
        courseId={params.courseId}
        chapterId={params.chapterId}
        data={chapter}
        setData={setChapter}
        />
      )
    }
    </div>
    </React.Fragment>
  );
};

export default ChapterIDpage;
