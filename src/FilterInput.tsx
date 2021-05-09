import React from "react";

interface IProps {
  setter: React.Dispatch<React.SetStateAction<string>>;
  value: string;
}

function SearchInput({ value, setter }: IProps) {
  return (
    <div className="mb-5">
      <input
        className="bg-trueGray-600 text-trueGray-200 px-6 py-3 rounded text-3xl focus:ring-emerald-600 focus:border-emerald-600"
        type="text"
        placeholder="Search..."
        value={value}
        onChange={(e) => setter(e.target.value)}
      />
    </div>
  );
}

export default SearchInput;
