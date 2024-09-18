// components/BlogListSkeleton.tsx

import React from 'react';

const BlogListSkeleton = () => {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-4xl">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="animate-pulse block mb-12 border-b border-gray-200 pb-8">
            <div className="flex flex-col md:flex-row items-start md:space-x-6">
              <div className="w-full md:w-4/12 flex-shrink-0">
                <div className="h-56 bg-gray-300 rounded-lg"></div>
              </div>
              <div className="w-full md:w-8/12 mt-4 md:mt-0">
                <div className="mb-3 flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                  <div className="ml-3 w-32 h-5 bg-gray-300 rounded"></div>
                </div>
                <div className="h-8 bg-gray-300 w-2/3 mb-3 rounded"></div>
                <div className="h-4 bg-gray-300 w-full mb-4 rounded"></div>
                <div className="h-4 bg-gray-300 w-2/3 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogListSkeleton;
