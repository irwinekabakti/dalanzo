import { FC } from "react";

interface SkeletonProps {
  className?: string;
}

const SkeletonDetail: FC<SkeletonProps> = ({ className }) => {
  return (
    <div className={`animate-pulse bg-gray-300 rounded ${className}`}></div>
  );
};

export default SkeletonDetail;
