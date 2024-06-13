"use client";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Grip, Pencil } from "lucide-react";
import React, { useEffect, useState } from "react";

interface ChapterlistProps {
  data: any;
  onReorder : any;
  onEdit : any;
}

const ChapterList = ({ data, onReorder, onEdit }: ChapterlistProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [chapter, setChapter] = useState([]);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
   const [startIndex, setStartIndex] = useState<number | null>(null);
 
  useEffect(() => {
    setIsMounted(true);
  }, []);
  useEffect(() => {
    setChapter(data);
  },[data])
  if (!isMounted) {
    return null;
  }

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
   setStartIndex(index);
  };

  const handleDragOver = (
    e: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    e.preventDefault();

    if (draggedIndex === null) return;
    const updatedChapter = [...chapter];
    const [draggedItem] = updatedChapter.splice(draggedIndex, 1);
    updatedChapter.splice(index, 0, draggedItem);

    setDraggedIndex(index);
    setChapter(updatedChapter);
  };

  const handleDrop = () => {
    setChapter(chapter);
    setDraggedIndex(null);
  };
  const handleDragEnd = (index: number) => {
    setDraggedIndex(null);
    if(startIndex || index){
    onReorder(startIndex, index);
    }
  };
  return (
    <div className=" w-full">
      {chapter?.map((item: any, index: number) => (
        <div
          key={item?._id}
          className={cn(
            " flex items-center gap-x-2 bg-slate-200 border-slate-200 border text-slate-700 rounded-md mb-5 text-sm cursor-grab transition-all duration-300 ease-in-out",
            item?.isPublished &&
              " bg-sky-100 border-sky-200 text-sky-700",
              draggedIndex === index && "opacity-0"
          )}
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragEnd={() => handleDragEnd(index)}
          onDragOver={(e) => handleDragOver(e, index)}
          onDrop={handleDrop}
        >
          <div
            className={cn(
              " px-2 py-3 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition-all duration-300 ease-in-out",
              item?.isPublished && "border-r-sky-200 hover:bg-sky-200"
            )}
          >
            <Grip className=" h-5 w-5" />
          </div>
          {item?.title}
          <div className=" ml-auto pr-2 flex items-center gap-x-2">
            {
              item?.isFree && (
                <Badge>Free</Badge>
              )
            }
            <Badge
              className={cn(
                " bg-slate-500",
                item?.isPublished && "bg-sky-700"
              )}
            >
              {item?.isPublished ? "Published" : "Draft"}
            </Badge>
            <Pencil
              className=" w-4 h-4 cursor-pointer hover:opacity-75 transition"
              onClick={() => onEdit(item?._id)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChapterList;
