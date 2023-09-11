import { cn } from "@/utils/functions";
import { Link } from "react-router-dom";
import { AProps, ButtonProps, LinkPropsExtended } from "./types";

type Props = AProps | ButtonProps | LinkPropsExtended;
export default async function Button({ children, className, as = "button", ...props }: Props) {
  if (as === "a") {
    return (
      <a className={cn("bg-red-500 rounded py-2 px-4", className)} {...(props as AProps)}>
        {children}
      </a>
    );
  }

  if (as === "Link") {
    return (
      <Link
        className={cn("bg-red-500 rounded py-2 px-4", className)}
        {...(props as LinkPropsExtended)}
      >
        {children}
      </Link>
    );
  }

  return (
    <button className={cn("bg-red-500 rounded py-2 px-4", className)} {...(props as ButtonProps)}>
      {children}
    </button>
  );
}
