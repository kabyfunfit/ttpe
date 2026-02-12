import React from 'react';

export default function Loading() {
  return (
    <main className="min-h-screen p-8 bg-gray-900 text-white">
      <div className="max-w-2xl mx-auto">
        {/* Header Skeleton */}
        <header className="mb-12 text-center space-y-4">
          <div className="h-10 w-3/4 mx-auto bg-gray-800 rounded animate-pulse" />
          <div className="h-4 w-1/2 mx-auto bg-gray-800 rounded animate-pulse" />
        </header>

        {/* Form Skeleton */}
        <div className="mb-12 h-[300px] bg-gray-800 rounded-lg animate-pulse" />

        {/* Questions List Skeleton */}
        <div className="space-y-4">
          <div className="h-8 w-40 bg-gray-800 rounded mb-6 animate-pulse" />
          
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-6 bg-gray-800 rounded-lg border border-gray-700 space-y-4">
              <div className="h-4 w-full bg-gray-700 rounded animate-pulse" />
              <div className="h-4 w-2/3 bg-gray-700 rounded animate-pulse" />
              <div className="flex justify-between items-center pt-2">
                <div className="h-4 w-20 bg-gray-700 rounded animate-pulse" />
                <div className="h-8 w-24 bg-gray-700 rounded-full animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}