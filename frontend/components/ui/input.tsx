import * as React from "react"
import {EyeOff, EyeIcon} from "lucide-react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [show, setShow] = React.useState(false);
    return (
     <div className=" relative">
       <input
        type={show ? "text" : type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
     {
      type === "password" && (
        <div className=" absolute right-3 bottom-2 ">
          {
            show ? (
              <EyeIcon size={22} onClick={() => setShow(false)} />
            ) : (
              <EyeOff size={22} onClick={() => setShow(true)} />
            )
          }
        </div>
      )
     }
     </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
