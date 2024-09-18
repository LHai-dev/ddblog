// components/CategoryBarSkeleton.tsx

import React from 'react';

const CategoryBarSkeleton = () => {
  return (
    <div className="max-w-screen-xl mx-auto md:px-8">
      <ul className="w-full border-b flex items-center gap-x-3 overflow-x-auto list-none">
        {Array.from({ length: 5 }).map((_, index) => (
          <li key={index} className="py-2 border-b-2 border-white text-gray-500">
            <div className="py-2.5 px-4 rounded-lg bg-gray-300 animate-pulse w-20 h-8"></div> {/* Skeleton Placeholder */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryBarSkeleton;
