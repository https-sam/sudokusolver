import React, { useState } from "react";

interface CellProps {
  odd: boolean;
  i: number;
}

const Cell = ({ odd, i }: CellProps) => {
  const [val, setVal] = useState<string>("");
  return (
    <input
      id={`cell-${i}`}
      type="text"
      value={val}
      maxLength={1}
      onChange={(e) => {
        let val = e.target.value.replace(/[^1-9]/g, "");
        setVal(val);
      }}
      pattern="[0-9]{1}"
      className={`w-[40px] h-[40px] text-center border-[1px] focus:outline-none font-semibold text-gray-600 ${
        odd && "bg-[#f0f0f0]"
      }`}
    ></input>
  );
};

export default Cell;
