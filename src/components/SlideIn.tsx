import { ReactNode, useEffect, useState } from "react";

export default function SlideIn({
  children,
  from = "left",
  delay = 0,
}: {
  children: ReactNode;
  from?: "left" | "right" | "top" | "bottom";
  delay?: number;
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  const directionMap = {
    left: "-translate-x-[120vw]",
    right: "translate-x-[120vw]",
    top: "-translate-y-[120vh]",
    bottom: "translate-y-[120vh]",
  };

  return (
    <div
      className={`
        duration-1500
        ease-[cubic-bezier(0.22,1,0.36,1)]
        ${show ? "translate-x-0 translate-y-0" : `${directionMap[from]}`}
      `}
    >
      {children}
    </div>
  );
}
