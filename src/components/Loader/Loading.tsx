import React from 'react';

export const Loading = (
  <div className="flex justify-center w-full h-full absolute inset-0 bg-opacity-25 bg-gray-500">
    <div className="flex space-x-1 text-sm text-gray-700 pt-10">
      <svg
        fill="none"
        className="w-6 h-6 animate-spin"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          clipRule="evenodd"
          d="M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z"
          fill="currentColor"
          fillRule="evenodd"
        />
      </svg>
      <div>Loading ...</div>
    </div>
  </div>
);
