"use client";
import { ArrowLeft, Grip, PlusCircle, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import axios from "axios";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  setPage: (page: number) => void;
  courseId: string;
  chapterId: string;
  data: any;
  setData: (data: any) => void;
};

const QuizForm = ({ setPage, courseId, chapterId, data, setData }: Props) => {
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [tempTitle, setTempTitle] = useState("");
  const [indexValue, setIndexValue] = useState<number>(-1);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [optionArray, setOptionArray] = useState<[string, string, string, string]>(["", "", "", ""]);
  const { toast } = useToast();
  const router = useRouter();
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios
        .put(
          `/course/add-quiz/${courseId}/chapter?chapterId=${chapterId}`,
          { question: tempTitle, options: optionArray, answerIndex: indexValue },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          setData(res.data.chapter);
          toast({
            title: "Success",
            description: res.data.message,
          });
          setTempTitle("");
          setOptionArray(["","","",""]);
          setIndexValue(-1);
          toggleEdit();
          router.refresh();
        })
        .catch((error: any) => {
          toast({
            title: "Error",
            variant: "destructive",
            description: error.response.data.message,
          });
        }).finally(() => setLoading(false))
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const deleteQuiz = async (index: number) => {
    try {
        setLoading(true);
        await axios
        .put(
          `/course/remove-quiz/${courseId}/chapter?chapterId=${chapterId}`,
          { index },
          {
            withCredentials: true,
          }
        ).then((res) => {
            setData(res.data.chapter);
            toast({
                title:"Success",
                description: res.data.message
            })
            router.refresh();
        }).catch((error: any) => {
            toast({
                variant:'destructive',
                title:"Error",
                description: error.response.data.message
            })
        }).finally(() => {
            setLoading(false);
        })
    } catch (error) {
        setLoading(false);
        console.log(error);
    }
  }
  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (
    e: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    e.preventDefault();

    if (draggedIndex === null) return;
    const updatedChapter: [string, string, string, string] = [...optionArray];
    const [draggedItem] = updatedChapter.splice(draggedIndex, 1);
    updatedChapter.splice(index, 0, draggedItem);
     // Update the option index if it is affected by the reordering
     let newIndex = indexValue;
     if (indexValue === draggedIndex) {
       newIndex = index;
     } else if (indexValue > draggedIndex && indexValue <= index) {
       newIndex = indexValue - 1;
     } else if (indexValue < draggedIndex && indexValue >= index) {
       newIndex = indexValue + 1;
     }
    setDraggedIndex(index);
    setOptionArray(updatedChapter);
    setIndexValue(newIndex);
  };
  const handleDrop = () => {
    setOptionArray(optionArray);
    setDraggedIndex(null);
  };
  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  return (
    <div className=" mt-[75px]">
         <div>
          <Button variant={"outline"} size={"sm"} onClick={() => setPage(1)}>
            <ArrowLeft className=" w-4 h-4 mr-2" />
            Back
          </Button>
        </div>
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className=" space-y-4">
        <div className=" mt-6 border bg-slate-100 rounded-md p-4">
          <div className="flex font-medium items-center justify-between">
            Write question
          </div>
          <form action="" onSubmit={handleSubmit} className=" space-y-4 mt-4">
            <div className="">
              <Textarea
                placeholder="what is the capital of the India?"
                value={tempTitle}
                onChange={(e) => setTempTitle(e.target.value)}
              />
            </div>
            <div>
              <div className=" flex items-center justify-between px-2">
                <p className=" font-normal">Set options</p>
                <Button
                  variant={"ghost"}
                  type="button"
                  size={"sm"}
                  onClick={() => toggleEdit()}
                >
                  {isEditing ? (
                    <>Cancel</>
                  ) : (
                    <>
                      <PlusCircle className=" w-4 h-4 mr-2" /> Add Option
                    </>
                  )}
                </Button>
              </div>
              {isEditing && (
                <div>
                  {optionArray.map((item, index) => (
                    <div
                      key={index}
                      className={cn(
                        "w-full my-2 border bg-slate-200 rounded-md p-2 flex items-center gap-x-2 border-[#8b8b8b4f] transition-all duration-300 ease-in-out",
                        draggedIndex === index && "opacity-0"
                      )}
                      draggable
                      onDragStart={() => handleDragStart(index)}
                      onDragEnd={handleDragEnd}
                      onDragOver={(e) => handleDragOver(e, index)}
                      onDrop={handleDrop}
                    >
                      <Grip className=" cursor-grab w-4 h-4 mr-2 text-muted-foreground " />
                      <textarea
                        rows={1}
                        value={item}
                        placeholder={`option ${index + 1}`}
                        onChange={(e) => {
                          const newArray: [string, string, string, string] = [
                            ...optionArray,
                          ];
                          newArray[index] = e.target.value;
                          setOptionArray(newArray);
                        }}
                        className=" w-full  rounded-sm bg-transparent outline-none"
                      />
                      <Checkbox value={index} checked={index === indexValue} onCheckedChange={() => setIndexValue(index)}  className=" mx-2"/>
                    </div>
                  ))}
                  <p className=" mt-4 text-xs text-muted-foreground">
                    Drag and drop to reorder your options
                  </p>
                </div>
              )}
            </div>
            <div className=" flex items-center gap-x-2">
              <Button type="submit" disabled={!tempTitle || loading || optionArray.some(item => item === "") || indexValue === -1}>
                Save
              </Button>
            </div>
          </form>
        </div>
      </div>
      <div className=" space-y-4">
        <div>
          <div className=" mt-6 border bg-slate-100 rounded-md p-4">
            <div className="flex font-medium items-center justify-between">
              Quiz list
            </div>
           <div className=" mt-5">
            {
                data?.quiz.length !== 0 ? (
                    <>
                    {
                data?.quiz.map((item: any, index: number) => (
                    <div key={item?._id} className=" mt-3 bg-slate-200 p-1 border flex items-center justify-between border-gray-400 rounded-md">
                       <p className=" text-sm pl-2 break-words">{item?.question}</p>
                       <Button variant={"ghost"} size={"sm"} onClick={() => deleteQuiz(index)}>
                       <Trash className=" w-4 h-4 " />
                       </Button>
                    </div>
                ))
            }
                    </>
                ):(
                    <p className=" mt-5 text-sm font-medium italic text-muted-foreground">No quiz have</p>
                )
            }
           </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default QuizForm;
