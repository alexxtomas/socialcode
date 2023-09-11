import { LinkProps } from "react-router-dom";

interface CommonProps {
  className?: string;
}

export interface AProps
  extends Omit<React.HTMLAttributes<HTMLAnchorElement>, "className" | "children">,
    CommonProps {
  as: "a";
  children: React.ReactNode;
}

export interface ButtonProps
  extends Omit<React.HTMLAttributes<HTMLButtonElement>, "className" | "children">,
    CommonProps {
  as: "button";
  children: React.ReactNode;
}

export interface LinkPropsExtended extends Omit<LinkProps, "children">, CommonProps {
  as: "Link";
  children: React.ReactNode;
}
