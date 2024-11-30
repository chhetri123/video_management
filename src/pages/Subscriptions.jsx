import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { fetchUserSubscriptions } from "../APIs/youtube";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "../components/InfiniteScroll/InfiniteScroll";

const Subscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [nextPageToken, setNextPageToken] = useState(null);
  const { accessToken } = useAuth();
  const navigate = useNavigate();

  const loadSubscriptions = async (isNextPage = false) => {
    if (!accessToken) return;

    try {
      setLoading(true);
      const { items, nextPageToken: newNextPageToken } =
        await fetchUserSubscriptions(
          accessToken,
          isNextPage ? nextPageToken : null
        );

      setSubscriptions((prev) => (isNextPage ? [...prev, ...items] : items));
      setNextPageToken(newNextPageToken);
      setHasMore(!!newNextPageToken);
    } catch (error) {
      console.error("Error loading subscriptions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSubscriptions();
  }, [accessToken]);

  if (!accessToken) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <h2 className="text-xl font-semibold mb-4">
          Please sign in to view your subscriptions
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Subscriptions</h1>
      <InfiniteScroll
        loading={loading}
        hasMore={hasMore}
        onLoadMore={() => loadSubscriptions(true)}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {subscriptions.map((subscription) => (
            <div
              key={subscription.id}
              className="bg-primary rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform cursor-pointer"
              onClick={() =>
                navigate(
                  `/channel/${subscription.snippet.resourceId.channelId}`
                )
              }
            >
              <img
                src={subscription.snippet.thumbnails.medium.url}
                alt={subscription.snippet.title}
                className="w-full aspect-square object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">
                  {subscription.snippet.title}
                </h3>
                <p className="text-gray-400 text-sm line-clamp-2">
                  {subscription.snippet.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default Subscriptions;
