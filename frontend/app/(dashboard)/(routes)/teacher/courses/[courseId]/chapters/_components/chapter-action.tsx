'use client'
import { Trash } from 'lucide-react';
import React, { useState } from 'react';
import { ConfirmModal } from '@/components/modals/confirm-modal';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface chapterActionProps{
    disabled: boolean;
    courseId: string;
    chapterId: string;
    isPublished: boolean;
}

const ChapterAction = ({disabled, courseId, chapterId, isPublished}: chapterActionProps) => {
   
    const [loading, setLoading] = useState(false);
    const {toast} = useToast();
    const router = useRouter();
    const onPublish = async () => {
        try {
            setLoading(true);
             await axios.put(`/course/publish-chapter/${courseId}/chapter?chapterId=${chapterId}`,{
                isPublished: !isPublished
             },{withCredentials: true})
             .then((res) => {
                setLoading(false);
                toast({
                    title:"Success",
                    description: res.data.message
                })
                router.refresh();
             }).catch((error: any) => {
                setLoading(false);
                toast({
                    variant:"destructive",
                    title:"Error",
                    description: error.response.data.message
                })
             })
        } catch (error) {
            setLoading(false);
            console.log(error)
        }
        }
    const onDelete = async () => {
    try {
        setLoading(true);
         await axios.put(`/course/delete-chapter/${courseId}/chapter?chapterId=${chapterId}`,{},{withCredentials: true})
         .then((res) => {
            setLoading(false);
            toast({
                title:"Success",
                description: res.data.message
            })
            router.refresh();
            router.push(`/teacher/courses/${courseId}`);
         }).catch((error: any) => {
            setLoading(false);
            toast({
                variant:"destructive",
                title:"Error",
                description: error.response.data.message
            })
         })
    } catch (error) {
        setLoading(false);
        console.log(error)
    }
    }
  return (
    <div className=' flex items-center gap-x-2'>
        <Button onClick={onPublish}
           disabled={!disabled || loading}
           variant={"outline"}
           size={"sm"}
        >
            {
                isPublished ? "Unpublished" : "Published"
            }
        </Button>
        <ConfirmModal onConFirm={onDelete}>
        <Button size={"sm"} disabled={loading}>
            <Trash className=' w-4 h-4' />
        </Button>
        </ConfirmModal>
    </div>
  )
}

export default ChapterAction