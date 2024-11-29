import axios from "axios";

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const BASE_URL = "https://www.googleapis.com/youtube/v3";

const youtube = axios.create({
  baseURL: BASE_URL,
  params: {
    key: API_KEY,
  },
});

// Fetch trending videos
export const fetchTrendingVideos = async (pageToken = null) => {
  try {
    const response = await youtube.get("/videos", {
      params: {
        part: "snippet,statistics",
        chart: "mostPopular",
        maxResults: 12,
        pageToken: pageToken,
        regionCode: "NP",
        videoCategoryId: "28", // Technology category
      },
    });
    return {
      items: response.data.items,
      nextPageToken: response.data.nextPageToken,
    };
  } catch (error) {
    console.error("Error fetching trending videos:", error);
    return { items: [], nextPageToken: null };
  }
};

// Fetch videos by search query
export const fetchVideosBySearch = async (searchTerm, pageToken = null) => {
  try {
    // First, get search results
    const searchResponse = await youtube.get("/search", {
      params: {
        part: "snippet",
        q: searchTerm,
        maxResults: 12,
        pageToken: pageToken,
        type: "video",
      },
    });

    // Get video IDs from search results
    const videoIds = searchResponse.data.items
      .map((item) => item.id.videoId)
      .join(",");

    // Fetch video statistics for all videos
    const statsResponse = await youtube.get("/videos", {
      params: {
        part: "statistics",
        id: videoIds,
      },
    });

    // Merge search results with statistics
    const items = searchResponse.data.items.map((searchItem) => {
      const statsItem = statsResponse.data.items.find(
        (statsItem) => statsItem.id === searchItem.id.videoId
      );
      return {
        ...searchItem,
        statistics: statsItem ? statsItem.statistics : null,
      };
    });

    return {
      items,
      nextPageToken: searchResponse.data.nextPageToken,
    };
  } catch (error) {
    console.error("Error searching videos:", error);
    return { items: [], nextPageToken: null };
  }
};

// Fetch single video details
export const fetchVideoDetails = async (videoId) => {
  try {
    const response = await youtube.get("/videos", {
      params: {
        part: "snippet,statistics,status",
        id: videoId,
      },
    });
    return response.data.items[0];
  } catch (error) {
    console.error("Error fetching video details:", error);
    return null;
  }
};

export const fetchComments = async (videoId) => {
  try {
    const response = await youtube.get("/commentThreads", {
      params: {
        part: "snippet,replies",
        videoId: videoId,
        maxResults: 25,
      },
    });
    return response.data.items;
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
};

export const fetchChannelDetails = async (channelId) => {
  try {
    const response = await youtube.get("/channels", {
      params: {
        part: "snippet,statistics,contentDetails",
        id: channelId,
      },
    });
    return response.data.items[0];
  } catch (error) {
    console.error("Error fetching channel details:", error);
    return null;
  }
};

export const fetchRecommendedVideos = async (pageToken = null) => {
  try {
    const response = await youtube.get("/videos", {
      params: {
        part: "snippet,statistics,contentDetails",
        chart: "mostPopular",
        maxResults: 12,
        pageToken: pageToken,
        regionCode: "US",
        videoCategoryId: "0", // General category (includes all types)
      },
    });

    // Fetch channel details for each video
    const videosWithChannelDetails = await Promise.all(
      response.data.items.map(async (video) => {
        const channelResponse = await youtube.get("/channels", {
          params: {
            part: "snippet,statistics",
            id: video.snippet.channelId,
          },
        });
        return {
          ...video,
          channelInfo: channelResponse.data.items[0],
        };
      })
    );

    return {
      items: videosWithChannelDetails,
      nextPageToken: response.data.nextPageToken,
    };
  } catch (error) {
    console.error("Error fetching recommended videos:", error);
    return { items: [], nextPageToken: null };
  }
};

export default {
  get: youtube.get.bind(youtube),
  fetchTrendingVideos,
  fetchVideosBySearch,
  fetchVideoDetails,
  fetchComments,
  fetchChannelDetails,
  fetchRecommendedVideos,
};
