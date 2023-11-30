import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const SkeletonLoader = () => {
  return (
    <SkeletonTheme baseColor="#D7D7D7" highlightColor="#eee">
      <div className="relative min-w-[250px] flex-shrink-0 flex-grow">
        <Skeleton width={"87%"} height={16} count={2.7} className="ms-7" />
        <Skeleton width={"87%"} height={16} count={2.7} className="ms-7" />
        <Skeleton width={"87%"} height={16} count={2.7} className="ms-7" />
      </div>
    </SkeletonTheme>
  );
};

export default SkeletonLoader;
