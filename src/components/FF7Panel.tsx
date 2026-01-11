import { ReactNode, HTMLAttributes } from "react";

type FF7PanelProps = {
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>; // allows className, style, etc.

export default function FF7Panel({ children, className = "", ...props }: FF7PanelProps) {
  return (
    <div
      className={`
        bg-gradient-to-b from-ff7-panel to-ff7-blue
        text-ff7-text
        p-4
        rounded-sm
        shadow-ff7
        shadow-[2px_2px_0_#00000080]
        backdrop-blur-[1px]
        h-full
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}
