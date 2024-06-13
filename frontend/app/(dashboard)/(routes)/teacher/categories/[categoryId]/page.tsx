"use client";
import axios from "axios";
import { BoxIcon, LayoutDashboard } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import IconBadge from "@/components/icon-badge";
import { useToast } from "@/components/ui/use-toast";
import Banner from "@/components/banner";
import CategoryNameForm from "./_components/category-name-Form";
import CategoryIconForm from "./_components/icon-form";
import CategoryAction from "./_components/CategoryAction";

const CategoryIdPage = ({ params }: { params: { categoryId: string } }) => {
    const router = useRouter();
    const {toast} = useToast();
    const [category, setCategory] = useState({
        name: "",
        icon: {
            public_id: "",
            url:""
        },
        isPublished: true
    })
    useEffect(() => {
        const getCategory = async () => {
          try {
            await axios
              .get(`/category/getCategory/${params.categoryId}`, {
                withCredentials: true,
              })
              .then((res) => {
                setCategory(res.data.category);
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
        getCategory();
      }, [params, toast, router]);
   const requireFields = [
       category.name,
       category.icon
   ]
   const completedFields = requireFields.filter(Boolean).length;
   const totalFields = requireFields.length;

   const completionText = `(${completedFields} / ${totalFields})`;
  return (
    <React.Fragment>
    {!category?.isPublished && (
      <Banner 
        label="This course is unpublished. It will not be visible to students"
      />
    )}
      <div className=" p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className=" text-2xl font-medium">Category setup</h1>
          <span className=" text-sm text-slate-700">
            Complete all fields {completionText}
          </span>
        </div>
        <CategoryAction
         disabled={totalFields === completedFields}
         categoryId={params.categoryId}
         isPublished={category?.isPublished}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
    
          <div className="">
            <div className="flex items-center gap-x-2">
              <IconBadge icon={BoxIcon} />
              <h2 className=" text-xl">Category Icon</h2>
            </div>
            <CategoryIconForm
              categoryId={params.categoryId}
              data={category}
              setData={setCategory}
            />
          </div>
     
        <div className="">
          <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboard} />
            <h1 className=" text-xl">Customize your category</h1>
          </div>
          <CategoryNameForm
            data={category}
            setData={setCategory}
            categoryId={params.categoryId}
          />
         
        </div>
      </div>
    </div>
  </React.Fragment>
  )
}

export default CategoryIdPage