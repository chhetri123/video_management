import React, { useCallback, useRef, useEffect } from "react";

const InfiniteScroll = ({
  children,
  loading,
  hasMore,
  onLoadMore,
  className = "",
}) => {
  const observer = useRef();
  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          onLoadMore();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, onLoadMore]
  );

  return (
    <div className={`relative ${className}`}>
      {children}
      <div ref={lastElementRef} className="h-10" />
    </div>
  );
};

export default InfiniteScroll;
