import React from "react";

function Sidebar() {
  return (
    <div className="bg-trueGray-900 shadow-xl font-chakra">
      <div className="p-4 text-3xl border-b-2 border-emerald-700">
        <h1>Bazify</h1>
      </div>
      <div className="text-xl mt-5">
        <ul>
          {["Albums", "Artists", "Search"].map((el) => {
            return (
              <li className="p-2 hover:bg-emerald-700 cursor-pointer">
                <div className="flex">
                  <UserCircleSvg />
                  <p className="pl-3">{el}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;

function UserCircleSvg() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}
