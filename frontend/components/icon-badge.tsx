import React from 'react'
import {LucideIcon} from "lucide-react";
import {cva, type VariantProps} from "class-variance-authority";
import {cn} from "@/lib/utils";

const backgroundVarient = cva(
    " rounded-full flex items-center justify-center",
    {
        variants:{
            variant:{
                default: "bg-sky-100",
                success: "bg-emerald-100"
            },
            size:{
                default: "p-2",
                sm:"p-1"
            }
        },
        defaultVariants:{
            variant: "default",
            size:"default"
        }
    }
)
const iconVariants = cva(
    "",
    {
        variants:{
            variant:{
                default: "text-sky-700",
                success: "text-emerald-700"
            },
            size:{
                default: " h-8 w-8",
                sm: "h-4 w-4"
            },
        },
        defaultVariants:{
            variant: "default",
            size:"default"
        }
    }
);
type BackgroundVarientsProps = VariantProps<typeof backgroundVarient>;
type IconVariantsProps = VariantProps<typeof iconVariants>;

interface IconBadgeProps extends BackgroundVarientsProps, IconVariantsProps
{
   icon: LucideIcon;
}


const IconBadge = ({icon: Icon, variant, size}: IconBadgeProps) => {
  return (
    <div className={cn(backgroundVarient({variant, size}))}>
        <Icon className={cn(iconVariants({variant, size}))} />
    </div>
  )
}

export default IconBadge