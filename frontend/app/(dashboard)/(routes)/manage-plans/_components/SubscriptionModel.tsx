"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Trash, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { Badge } from "@/components/ui/badge";
import { ConfirmModal } from "@/components/modals/confirm-modal";

type Props = {
  item: any;
  update: boolean;
  toogleEdit: any;
  toogleLoad: any;
};

const SubscriptionModel = ({ item, update, toogleEdit, toogleLoad }: Props) => {
  const [price, setPrice] = useState<number>(item?.price || null);
  const [digit, type] = item?.validity?.split(" ");
  const [dateDigit, setDateDigit] = useState(digit || "");
  const [dateType, setDateType] = useState(type || "");
  const [dateValue, setDateValue] = useState("");
  const [benefit, setBenifit] = useState("");
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();

  const memberShipName = (dateType: string) => {
    if (dateType === "week") {
      return "Weekly plan / Basic";
    } else if (dateType === "day") return "Daily plan / essential";
    else if (dateType === "month") return "Monthly plan / grow";
    else if (dateType === "year") return "Annual plan / premium";
    else {
      return "Best plan ";
    }
  };
  useEffect(() => {
    if (dateDigit && dateType) {
      const value = `${dateDigit} ${dateType}`;
      setDateValue(value);
    }
  }, [dateDigit, dateType]);
  const createSubscription = async () => {
    try {
      setLoading(true);
      await axios
        .post(
          "/subscription/create",
          {
            price,
            validity: dateValue,
            benifit: benefit,
          },
          { withCredentials: true }
        )
        .then((res) => {
          toast({
            title: "Success",
            description: res.data.message,
          });
          toogleLoad();
          toogleEdit();
        })
        .catch((error) => {
          toast({
            variant: "destructive",
            title: "Error",
            description: error.response.data.message,
          });
        })
        .finally(() => setLoading(false));
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const updateSubscription = async () => {
    try {
      setLoading(true);
      await axios
        .put(
          `/subscription/update/${item?._id}`,
          {
            price,
            validity: dateValue,
            benifit: benefit,
          },
          { withCredentials: true }
        )
        .then((res) => {
          toast({
            title: "Success",
            description: res.data.message,
          });
          setBenifit("")
          toogleEdit();
        })
        .catch((error) => {
          toast({
            variant: "destructive",
            title: "Error",
            description: error.response.data.message,
          });
        })
        .finally(() => setLoading(false));
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const onDelete = async (index: number) => {
    try {
      setLoading(true);
      await axios
        .put(
          `/subscription/remove-benifit/${item?._id}`,
          {
            index,
          },
          { withCredentials: true }
        )
        .then((res) => {
          toast({
            title: "Success",
            description: res.data.message,
          });
          toogleEdit();
        })
        .catch((error: any) => {
          toast({
            title: "Error",
            variant: "destructive",
            description: error.response.data.message,
          });
        })
        .finally(() => setLoading(false));
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const deleteSubscription = async () => {
    try {
      setLoading(true);
      await axios
        .delete(`/subscription/remove/${item?._id}`, { withCredentials: true })
        .then((res) => {
          toast({
            title: "Success",
            description: res.data.message,
          });
          toogleEdit();
        })
        .catch((error: any) => {
          toast({
            title: "Error",
            variant: "destructive",
            description: error.response.data.message,
          });
        })
        .finally(() => setLoading(false));
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <div
      key={item?._id}
      className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none"
    >
      <div className="p-8 sm:p-10 lg:flex-auto">
        <div className=" flex items-center justify-between">
          <h3 className="text-2xl font-bold tracking-tight text-gray-900">
            {memberShipName(dateType)}
          </h3>
          {update && <Badge>Published</Badge>}
        </div>
        <p className="mt-6 text-base leading-7 text-gray-600">
          Select the ideal subscription plan to elevate your learning journey,
          access premium resources, and achieve your educational goals.
        </p>
        <div className="mt-10 flex items-center gap-x-4">
          <h1 className=" flex-none text-sm font-semibold leading-6 text-indigo-600">
            Include benefits
          </h1>
          <div className="h-px flex-auto bg-gray-100"></div>
        </div>
        <ul
          role="list"
          className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
        >
          {item &&
            item?.benifits.map((i: string, index: number) => (
              <li key={index} className="flex gap-x-3 items-center">
                <Check className="w-5 h-5 text-indigo-600" />
                {i}
                <X
                  className=" w-4 h-4 cursor-pointer"
                  onClick={() => onDelete(index)}
                />
              </li>
            ))}
          <li className="flex gap-x-3">
            <Check className="w-5 h-5 text-indigo-600" />
            <input
              type="text"
              value={benefit}
              onChange={(e) => setBenifit(e.target.value)}
              placeholder={`add benefit`}
              className=" outline-none bg-transparent w-full"
            />
          </li>
        </ul>
      </div>
      <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
        <div className="rounded-2xl relative bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
          <div className="mx-auto max-w-xs px-8">
            <p className="text-base font-semibold text-gray-600">
              Set plan price and validity
            </p>
            <div className="mt-6 flex items-baseline justify-center gap-x-2">
              <input
                className="text-5xl font-bold tracking-tight text-gray-900 bg-transparent outline-none w-[130px]"
                type="number"
                placeholder="₹349"
                value={price}
                onChange={(e: any) => setPrice(e.target.value)}
              />
              <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">
                INR
              </span>
            </div>
            <div className="mt-2 flex items-center justify-center ">
              <input
                className=" bg-white p-2 rounded-md outline-none w-[50px] border border-slate-200"
                type="number"
                placeholder="1"
                value={dateDigit}
                onChange={(e) => setDateDigit(e.target.value)}
              />
              <Select value={dateType} onValueChange={(e) => setDateType(e)}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Select date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Date</SelectLabel>
                    <SelectItem value="day">day</SelectItem>
                    <SelectItem value="week">week</SelectItem>
                    <SelectItem value="month">month</SelectItem>
                    <SelectItem value="year">year</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <Button
              className=" bg-indigo-600 w-full hover:bg-indigo-500 mt-8"
              disabled={loading}
              onClick={() => {
                update ? updateSubscription() : createSubscription();
              }}
            >
              {update ? "Update" : "Create"}
            </Button>
            <p className="mt-4 text-xs leading-5 text-gray-600">
              Click on Create to create a custom subscription plan for members
            </p>
          </div>
          {update && (
            <ConfirmModal onConFirm={() => deleteSubscription()}>
              <Button
                size={"sm"}
                variant={"outline"}
                disabled={loading}
                className=" absolute top-2 right-2"
              >
                <Trash className=" w-4 h-4" />
              </Button>
            </ConfirmModal>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionModel;
