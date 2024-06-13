'use client'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import React, { useState } from "react"
import { Input } from "@/components/ui/input";
  
  interface CategoryModalProps{
    children: React.ReactNode;
    onConFirm: () => void;
    name: string;
    setName: (name: string) =>  void;
    loading: boolean;
  }
  export const CategoryCreationModal = ({children, onConFirm, name, setName, loading}:CategoryModalProps) => {
  
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          {children}
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Set a Category name</AlertDialogTitle>
            <AlertDialogDescription className="space-y-8 mt-8 ">
          <label htmlFor="title">Category title</label>
          <Input
            type="text"
            id="title"
            placeholder="e.g. 'UI/UX Design', 'Blockchain'"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className=" text-black font-medium"
          />
          <p className=" text-sm text-gray-500">
            what is the trending course category?
          </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction disabled={!name || loading} onClick={onConFirm}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>

      </AlertDialog>
    )
  }
  