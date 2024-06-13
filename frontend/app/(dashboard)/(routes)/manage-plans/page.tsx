"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import axios from "axios";
import SubscriptionModel from "./_components/SubscriptionModel";

type Props = {};

const ManagePlans = (props: Props) => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [offLead, setOffLead] = useState(false);
  const [loadEffect, setLoadEffect] = useState(false);
  const toggleClose = () => {
    setOffLead(!offLead);
  };
  const toogleLoadEffect = () => {
    setLoadEffect(!loadEffect);
  }
  const item = {
    price: "",
    validity: "",
    _id: "",
    benifits: [],
    modelName: "",
  };
  useEffect(() => {
    const getAllSubscription = async () => {
      try {
        await axios.get("/subscription/getAll-subscription").then((res) => {
          setSubscriptions(res.data.subscription);
        });
      } catch (error) {
        console.log(error);
      }
    };
    getAllSubscription();
  }, [loadEffect]);

  return (
    <div>
      <div className="bg-white pb-24 sm:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className=" mt-5 flex items-center justify-between w-full ">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Create plans
              </h1>
              <p>you can create weekly/monthly/annual plans</p>
            </div>
            <Button variant={"outline"} type="button" onClick={toggleClose}>
              <PlusCircle className=" w-4 h-4 mr-2" /> Create
            </Button>
          </div>
          {(subscriptions.length === 0 || offLead) && (
            <SubscriptionModel update={false} item={item} toogleEdit={toogleLoadEffect} toogleLoad={toggleClose} />
          )}
          {subscriptions.length !== 0 &&
            subscriptions.map((item: any) => (
              <SubscriptionModel update item={item} key={item?._id} toogleEdit={toogleLoadEffect} toogleLoad={toggleClose} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ManagePlans;
