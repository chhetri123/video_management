import React, { createContext, useContext, useState } from "react";
import {
  fetchTrendingVideos,
  fetchVideosBySearch,
  fetchVideoDetails,
  fetchComments,
  fetchChannelDetails,
  fetchRecommendedVideos,
} from "../APIs/youtube";

const YoutubeContext = createContext();

export const YoutubeProvider = ({ children }) => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [channelDetails, setChannelDetails] = useState(null);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [currentSearchQuery, setCurrentSearchQuery] = useState("");

  const searchVideos = async (searchTerm, isNextPage = false) => {
    try {
      setLoading(true);
      if (!isNextPage) {
        setCurrentSearchQuery(searchTerm);
        setVideos([]);
        setNextPageToken(null);
      }

      const { items, nextPageToken: newNextPageToken } =
        await fetchVideosBySearch(
          searchTerm,
          isNextPage ? nextPageToken : null
        );

      setVideos((prev) => (isNextPage ? [...prev, ...items] : items));
      setNextPageToken(newNextPageToken);
      setHasMore(!!newNextPageToken);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreSearchResults = async () => {
    if (currentSearchQuery && !loading && hasMore) {
      await searchVideos(currentSearchQuery, true);
    }
  };

  const loadTrendingVideos = async (isNextPage = false) => {
    try {
      setLoading(true);
      const { items, nextPageToken: newNextPageToken } =
        await fetchTrendingVideos(isNextPage ? nextPageToken : null);

      setVideos((prev) => (isNextPage ? [...prev, ...items] : items));
      setNextPageToken(newNextPageToken);
      setHasMore(!!newNextPageToken);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchVideoById = async (videoId) => {
    try {
      setLoading(true);
      const video = await fetchVideoDetails(videoId);
      setSelectedVideo(video);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchVideoComments = async (videoId) => {
    try {
      setLoading(true);
      const comments = await fetchComments(videoId);
      setComments(comments);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchChannelInfo = async (channelId) => {
    try {
      setLoading(true);
      const channel = await fetchChannelDetails(channelId);
      setChannelDetails(channel);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadRecommendedVideos = async (isNextPage = false) => {
    try {
      setLoading(true);
      const { items, nextPageToken: newNextPageToken } =
        await fetchRecommendedVideos(isNextPage ? nextPageToken : null);

      setVideos((prev) => (isNextPage ? [...prev, ...items] : items));
      setNextPageToken(newNextPageToken);
      setHasMore(!!newNextPageToken);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <YoutubeContext.Provider
      value={{
        videos,
        selectedVideo,
        loading,
        error,
        searchVideos,
        setSelectedVideo,
        loadTrendingVideos,
        fetchVideoById,
        comments,
        channelDetails,
        fetchVideoComments,
        fetchChannelInfo,
        hasMore,
        loadMore: () => loadTrendingVideos(true),
        searchMore: (searchTerm) => searchVideos(searchTerm, true),
        loadRecommendedVideos,
        loadMoreSearchResults,
        currentSearchQuery,
      }}
    >
      {children}
    </YoutubeContext.Provider>
  );
};

export const useYoutube = () => useContext(YoutubeContext);
