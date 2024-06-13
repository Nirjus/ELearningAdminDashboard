"use client";
import axios from "axios";
import { Pencil, PlusCircle, Video } from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import LinearProgress from "@/components/Linear-progressbar";
import VideoUploader from "@/components/video-uploader";

type Props = {
  courseId: string;
  chapterId: string;
  data: any;
  setData: (data: any) => void;
};

const VideoForm = ({ courseId,chapterId, data, setData }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [video, setVideo] = useState<any>("");
  const [videoDuration, setVideoDuration] = useState("");
  const [progressBar, setProgressBar] = useState(0);
  const [onChangeFile, setOnChangeFile] = useState(false);

  const { toast } = useToast();
  const router = useRouter();

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    setOnChangeFile(false);
    setVideo("");
  };
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", video);
       formData.append("duration", videoDuration);
      await axios
      .put(`/course/edit-chapter/${courseId}/chapter?chapterId=${chapterId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
          onUploadProgress: (event) => {
            if (event.total) {
              setProgressBar(Math.round((100 * event.loaded) / event.total));
            }
          },
        })
        .then((res) => {
          setData(res.data.chapter);
          toast({
            title: "Success",
            description: res.data.message,
          });
          setLoading(false);
          toggleEdit();
          router.refresh();
          setProgressBar(0);
        })
        .catch((error: any) => {
          setLoading(false);
          setProgressBar(0);
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
  console.log(videoDuration)
  return (
    <div className=" mt-6 border bg-slate-100 rounded-md p-4">
      <div className="flex font-medium items-center justify-between">
        Chapter video
        <Button onClick={() => toggleEdit()} variant={"ghost"}>
          {isEditing && <>Cancel</>}
          {!isEditing && !data?.video?.url && (
            <>
              <PlusCircle className=" h-4 w-4 mr-2" />
              Add an image
            </>
          )}
          {!isEditing && data?.video?.url && (
            <>
              <Pencil className=" h-4 w-4 mr-2" />
              Edit banner
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!data?.video?.url ? (
          <div className=" flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <Video className=" h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className=" w-full p-2 mt-2">
            
            <video controls src={data?.video?.url} className=" aspect-video w-full rounded-md"></video>
          </div>
        ))}
      {isEditing && (
        <div className=" h-full w-full">
          <VideoUploader
            setFile={setVideo}
            file={video}
            onChangeFile={onChangeFile}
            setOnChangeFile={setOnChangeFile}
            setVideoDuration={setVideoDuration}
          />
          <div className="mt-2 md:flex items-center gap-4 pl-2">
            {onChangeFile && video ? (
              <>
                <LinearProgress
                  selectedFileName={video?.name || "File name here"}
                  progressCounter={progressBar}
                />
                <Button
                  disabled={loading || !video}
                  onClick={handleSubmit}
                  type="submit"
                >
                  Save
                </Button>
              </>
            ) : (
              <p className=" text-xs text-muted-foreground">
                16:9 aspect ratio recommended
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoForm;
