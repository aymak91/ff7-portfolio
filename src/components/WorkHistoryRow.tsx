// components/WorkHistoryRow.tsx
import Image from "next/image";

interface WorkHistoryRowProps {
  company: string;
  logo: string;
  role: string;
  years: string;
  level: number;
}

export default function WorkHistoryRow({
  company,
  logo,
  role,
  years,
  level,
}: WorkHistoryRowProps) {
  return (
    <div className="flex gap-3 p-3 border border-ff7-border bg-gradient-to-b from-ff7-panel to-ff7-blue">
      {/* Logo */}
      <div className="w-14 h-14 bg-white flex items-center justify-center">
        <Image src={logo} alt={company} width={48} height={48} />
      </div>

      {/* Character */}
      <div className="w-14 h-14 bg-black">
        <Image src="/cloud.jpg" alt="Character" width={56} height={56} />
      </div>

      {/* Main */}
      <div className="flex-1 text-white text-sm">
        <div className="flex justify-between">
          <div>
            <p className="font-bold">Alexander Mak</p>
            <p className="text-green-400">LV {level}</p>
          </div>

          <div className="border border-ff7-border px-2 text-xs w-50 h-15 flex flex-col justify-center">
            <p>{role}</p>
            <p>{years}</p>
          </div>
        </div>

        <div className="mt-1 border border-ff7-border px-2 py-0.5">
          {company}
        </div>
      </div>
    </div>
  );
}
