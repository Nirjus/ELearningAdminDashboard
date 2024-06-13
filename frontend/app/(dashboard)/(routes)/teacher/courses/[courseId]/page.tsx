"use client";
import axios from "axios";
import { CircleDollarSign, Layers3, LayoutDashboard, ListChecks } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import IconBadge from "@/components/icon-badge";
import { useToast } from "@/components/ui/use-toast";
import Banner from "@/components/banner";
import TitleForm from "./_components/TitleForm";
import DescriptionForm from "./_components/DescriptionForm";
import ImageForm from "./_components/image-form";
import CategoryForm from "./_components/CateforyForms";
import PriceForm from "./_components/PriceForm";
import LevelForm from "./_components/CourseLevelForm";
import TagsForm from "./_components/TagsForm";
import ChapterForm from "./_components/chapter-form";
import CourseAction from "./_components/course-action";

const CourseIdPage = ({ params }: { params: { courseId: string } }) => {
  const { toast } = useToast();
  const router = useRouter();
  const [category, setCategory] = useState<any[]>([]);
  const [course, setCourse] = useState({
    name: "",
    description: "",
    banner: {},
    isPublished: true,
    time: "",
    price: undefined,
    courseLevel: "",
    tags: [],
    category: "",
    chapter: [
      {
        title:"",
        isPublished: false,
        content:"",
        output:"",
        video:{},
      }
    ],
  });
  useEffect(() => {
    const getCourse = async () => {
      try {
        await axios
          .get(`/course/getCourse/admin/${params.courseId}`, {
            withCredentials: true,
          })
          .then((res) => {
            setCourse(res.data.course);
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

  useEffect(() => {
    const getAllCategory = async () => {
      try {
        await axios.get("/category/getAll-category").then((res) => {
          setCategory(res.data.categories);
        });
      } catch (error: any) {
        console.log(error);
      }
    };
    getAllCategory();
  }, []);
   const anyChapterPublished = course.chapter.find((item) => item?.isPublished === true);
  const requiredField = [
    course.name,
    course.description,
    course.banner,
    course.courseLevel,
    course.price !== undefined,
    course.tags.length > 0,
    course.category,
    anyChapterPublished
  ];

  const totalFields = requiredField.length;

  const completedFields = requiredField.filter(Boolean).length;

  const completionText = `(${completedFields} / ${totalFields})`;
  return (
  <React.Fragment>
    {!course?.isPublished && (
      <Banner 
        label="This course is unpublished. It will not be visible to students"
      />
    )}
      <div className=" p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className=" text-2xl font-medium">Course setup</h1>
          <span className=" text-sm text-slate-700">
            Complete all fields {completionText}
          </span>
        </div>
        <CourseAction 
         disabled={totalFields === completedFields}
         courseId={params.courseId}
         isPublished={course?.isPublished}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div className="">
          <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboard} />
            <h1 className=" text-xl">Customize your course</h1>
          </div>
          <TitleForm
            data={course}
            setData={setCourse}
            courseId={params.courseId}
          />
          <DescriptionForm
            data={course}
            setData={setCourse}
            courseId={params.courseId}
          />
          <ImageForm
            data={course}
            setData={setCourse}
            courseId={params.courseId}
          />
          <CategoryForm
            data={course}
            options={category.map((catego: any) => ({
              label: catego.name,
              value: catego.name,
            }))}
            setData={setCourse}
            courseId={params.courseId}
          />
        </div>
        <div className="space-y-6">
          <div className="">
            <div className="flex items-center gap-x-2">
              <IconBadge icon={ListChecks} />
              <h2 className=" text-xl">Course chapters</h2>
            </div>
            <ChapterForm
              courseId={params.courseId}
              data={course}
              setData={setCourse}
            />
          </div>
          <div>
            <div className=" flex items-center gap-x-2 ">
              <IconBadge icon={CircleDollarSign} />
              <h2 className=" text-xl">Sell your course</h2>
            </div>
            <PriceForm
              courseId={params.courseId}
              data={course}
              setData={setCourse}
            />
          </div>
          <div>
          <div className=" flex items-center gap-x-2 ">
              <IconBadge icon={Layers3} />
              <h2 className=" text-xl">Course Levels and Tags</h2>
            </div>
            <LevelForm 
            courseId={params.courseId}
            data={course}
            setData={setCourse}
            />
           <TagsForm
            courseId={params.courseId}
            data={course}
            setData={setCourse}
            />
          </div>
        </div>
      </div>
    </div>
  </React.Fragment>
  );
};

export default CourseIdPage;
