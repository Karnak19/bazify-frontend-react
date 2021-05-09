import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

function Home() {
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const [_, token] = location.search.substr(1).split("&")[0].split("=");

    if (token) {
      import.meta.env.DEV && localStorage.setItem("token", token);
      import.meta.env.PROD && sessionStorage.setItem("token", token);

      history.push("/albums");
    }
  }, []);
  return (
    <div className="grid place-items-center h-screen bg-gray-900 text-white font-chakra">
      <a
        href={import.meta.env.VITE_API_URL + "/auth/github"}
        className="rounded-sm bg-pink-300 hover:bg-pink-400 text-gray-900 text-xl px-5 py-2"
      >
        LOGIN
      </a>
    </div>
  );
}

export default Home;
