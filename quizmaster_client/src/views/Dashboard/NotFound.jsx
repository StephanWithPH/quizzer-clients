import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-neutral-800">
      <h1 className="text-9xl font-extrabold text-white tracking-widest">404</h1>
      <div className="bg-indigo-500 px-2 text-sm rounded rotate-12 absolute">
        Page Not Found
      </div>
      <button className="mt-5">
        <div className="relative inline-block text-sm font-bold text-indigo-400 group active:text-orange-500 focus:outline-none focus:ring">
          <span
            className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-indigo-500 group-hover:translate-y-0 group-hover:translate-x-0"
          />

          <span className="relative block px-8 py-3 bg-neutral-800 border text-indigo-400 border-indigo-500">
            <Link to="/dashboard">Go to dashboard</Link>
          </span>
        </div>
      </button>
    </div>
  );
}

export default NotFound;
