"use client";
import axios from "axios";
import React, { FormEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import {
  ArrowLeft,
  BarChart3,
  CalendarCheckIcon,
  CalendarX,
  CreditCard,
  Mail,
  ShieldCheck,
  Text,
  TicketCheck,
  TicketX,
  Trash,
  UserCircle2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { ConfirmModal } from "@/components/modals/confirm-modal";
import { formatPrice } from "@/lib/format";
type Props = {};

const UserIdPage = ({ params }: { params: { userId: string } }) => {
  const [user, setUser] = useState<any>({});
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  useEffect(() => {
    const getUser = async () => {
      try {
        await axios
          .get(`/member/getMember/${params.userId}`, {
            withCredentials: true,
          })
          .then((res) => {
            setUser(res.data.userData);
            setRole(res.data.userData.user.role);
          })
          .catch((error) => {
            console.log(error.response.data.message);
          });
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [params]);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios
        .put(
          `/user/update-role/${params.userId}`,
          {
            role,
          },
          { withCredentials: true }
        )
        .then((res) => {
          router.refresh();
          toast({
            title: "Success",
            description: res.data.message,
          });
        })
        .catch((error: any) => {
          toast({
            variant: "destructive",
            title: "Success",
            description: error.response.data.message,
          });
        })
        .finally(() => setLoading(false));
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const onDelete = async () => {
    try {
      setLoading(true);
      await axios
        .delete(`/user/delete-user/${params.userId}`, {
          withCredentials: true,
        })
        .then((res) => {
          toast({
            title: "Success",
            description: res.data.message,
          });
          router.refresh();
          router.push("/manage-user");
        })
        .catch((error: any) => {
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
  const formatesDate = (str: string) => {
    const formattedJoinDate = new Date(str).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return formattedJoinDate;
  };
  return (
    <div className=" w-full h-full p-6">
     <div className=" flex flex-row items-center justify-between mx-2">
     <Link href={"/manage-user"}>
        <Button variant={"outline"} size={"sm"}>
          <ArrowLeft className=" w-5 h-5 mr-2" /> Back
        </Button>
      </Link>
     <Link href={`/teacher/analytics/${params.userId}`}>
     <Button variant={"outline"}>
        <BarChart3 className=" w-5 h-5 mr-2" /> See user enrollment
      </Button>
     </Link>
     </div>
      <div className=" mt-4 p-2 grid gap-7 md:grid-cols-2 grid-cols-1">
        <Card className=" bg-slate-100">
          <div className=" flex items-center justify-between">
            <CardHeader>
              <CardTitle className=" flex items-center">
                {user?.user?.role === "Admin" && (
                  <ShieldCheck className=" text-blue-500 w-5 h-5 mr-2" />
                )}
                {user?.user?.name} details
              </CardTitle>
              <CardDescription>you can update role</CardDescription>
            </CardHeader>
            <ConfirmModal onConFirm={() => onDelete()}>
              <Button size={"sm"} className=" mr-4">
                <Trash className=" w-4 h-4" />
              </Button>
            </ConfirmModal>
          </div>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                <div className=" m-auto">
                  {user?.user?.avatar?.url ? (
                    <Image
                      alt="profile"
                      src={user?.user?.avatar?.url}
                      width={500}
                      height={500}
                      className=" object-cover w-[100px] h-[100px]"
                    />
                  ) : (
                    <UserCircle2 size={100} />
                  )}
                </div>
                <div className=" flex bg-slate-50 hover:bg-white items-center space-x-4 rounded-md border border-[#8b8b8b42] p-4">
                  <Text />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-semibold leading-none">Name</p>
                    <p className="text-sm text-muted-foreground">
                      {user?.user?.name}
                    </p>
                  </div>
                </div>
                <div className=" flex bg-slate-50 hover:bg-white items-center space-x-4 rounded-md border border-[#8b8b8b42] p-4">
                  <Mail />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-semibold leading-none">Email</p>
                    <p className="text-sm text-muted-foreground">
                      {user?.user?.email}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <label htmlFor="framework">Role</label>
                  <Select value={role} onValueChange={(e) => setRole(e)}>
                    <SelectTrigger id="framework">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="user">User</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex mt-5 w-full justify-between">
                <Button
                  variant="outline"
                  onClick={() => setRole("")}
                  type="button"
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={!role || loading}>
                  Update
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className=" bg-slate-100">
          <CardHeader>
            <CardTitle className=" flex items-center">
              Membership details
            </CardTitle>
            <CardDescription>Information of the membership</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className=" flex bg-slate-50 hover:bg-white items-center space-x-4 rounded-md border border-[#8b8b8b42] p-4">
                  <CalendarCheckIcon />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-semibold leading-none">
                      Joining Date
                    </p>
                    <p
                      className={`text-sm text-muted-foreground ${
                        !user?.member && " italic "
                      }`}
                    >
                      {user?.member
                        ? formatesDate(user?.member?.joinDate)
                        : "Not joining yet"}
                    </p>
                  </div>
                </div>
                <div className=" flex bg-slate-50 hover:bg-white items-center space-x-4 rounded-md border border-[#8b8b8b42] p-4">
                  {user?.member?.Active ? <TicketCheck /> : <TicketX />}
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-semibold leading-none">
                      Membership status
                    </p>
                    <p
                      className={`text-sm text-muted-foreground ${
                        !user?.member && " italic "
                      }`}
                    >
                      {user?.member
                        ? user?.member?.Active
                          ? "Active"
                          : "Deactive"
                        : "Not Applicable"}
                    </p>
                  </div>
                </div>
                <div>
                  <h1 className=" text-xl my-2 ml-2">Subscription Details</h1>
                </div>
                {user?.member ? (
                  <div className=" space-y-4">
                    <div className=" flex bg-slate-50 hover:bg-white items-center space-x-4 rounded-md border border-[#8b8b8b42] p-4">
                      <CreditCard />
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-semibold leading-none">
                          Plan
                        </p>
                        <p className={`text-sm text-muted-foreground`}>
                          {formatPrice(user?.member?.subscription?.price)} /{" "}
                          {user?.member?.subscription?.subscriptionPeriod}
                        </p>
                      </div>
                    </div>
                    <div className=" flex bg-slate-50 hover:bg-white items-center space-x-4 rounded-md border border-[#8b8b8b42] p-4">
                      <CalendarX />
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-semibold leading-none">
                          End Date
                        </p>
                        <p className={`text-sm text-muted-foreground`}>
                          {formatesDate(user?.member?.subscription?.endDate)}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className=" text-sm text-muted-foreground italic ">
                      This user not yet purchased a membership
                    </p>
                  </div>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserIdPage;
