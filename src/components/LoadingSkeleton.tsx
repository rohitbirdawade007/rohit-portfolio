import React from 'react';

interface SkeletonProps {
  className?: string;
}

export const LoadingSkeleton: React.FC<SkeletonProps> = ({ className = '' }) => {
  return (
    <div className={`animate-pulse bg-gray-200 dark:bg-gray-800 rounded-xl ${className}`} />
  );
};

export const CardSkeleton = () => (
  <div className="flex flex-col h-full bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-sm">
    <LoadingSkeleton className="h-64 rounded-none" />
    <div className="p-6 flex flex-col gap-4">
      <LoadingSkeleton className="h-8 w-3/4" />
      <LoadingSkeleton className="h-4 w-full" />
      <LoadingSkeleton className="h-4 w-5/6" />
      <div className="flex gap-2 mt-4">
        <LoadingSkeleton className="h-6 w-16 !rounded-full" />
        <LoadingSkeleton className="h-6 w-20 !rounded-full" />
      </div>
    </div>
  </div>
);

export const DetailPageSkeleton = () => (
  <div className="min-h-screen flex items-start justify-center bg-gray-50/50 dark:bg-gray-950 pt-20">
    <div className="animate-pulse space-y-6 w-full max-w-4xl px-4">
      <LoadingSkeleton className="h-10 w-2/4" />
      <LoadingSkeleton className="h-96 rounded-3xl" />
      <div className="space-y-3">
        <LoadingSkeleton className="h-4 w-full" />
        <LoadingSkeleton className="h-4 w-11/12" />
        <LoadingSkeleton className="h-4 w-full" />
        <LoadingSkeleton className="h-4 w-5/6" />
      </div>
    </div>
  </div>
);

// ─── Default export ────────────────────────────────────────────────────────────
// Supports `type` prop for different skeleton layouts used across the app
interface DefaultSkeletonProps {
  type?: 'timeline' | 'cards' | 'detail' | 'default';
  count?: number;
}

const DefaultLoadingSkeleton: React.FC<DefaultSkeletonProps> = ({ type = 'default', count = 3 }) => {
  if (type === 'timeline') {
    return (
      <div className="animate-pulse space-y-8 max-w-4xl mx-auto">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="relative pl-10 border-l-2 border-gray-200 dark:border-gray-700 ml-3">
            <div className="absolute -left-[17px] top-1 w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700" />
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 space-y-3 border border-gray-100 dark:border-gray-800">
              <LoadingSkeleton className="h-6 w-1/2" />
              <LoadingSkeleton className="h-4 w-1/3" />
              <LoadingSkeleton className="h-4 w-full" />
              <LoadingSkeleton className="h-4 w-5/6" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'cards') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: count }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (type === 'detail') {
    return <DetailPageSkeleton />;
  }

  return (
    <div className="animate-pulse space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <LoadingSkeleton key={i} className="h-8 w-full" />
      ))}
    </div>
  );
};

export default DefaultLoadingSkeleton;
