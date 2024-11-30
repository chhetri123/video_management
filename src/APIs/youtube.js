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

// Fetch user's playlists
export const fetchUserPlaylists = async (accessToken, pageToken = null) => {
  try {
    const response = await axios.get(`${BASE_URL}/playlists`, {
      params: {
        part: "snippet,contentDetails",
        mine: true,
        maxResults: 20,
        pageToken: pageToken,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return {
      items: response.data.items,
      nextPageToken: response.data.nextPageToken,
    };
  } catch (error) {
    console.error("Error fetching playlists:", error);
    return { items: [], nextPageToken: null };
  }
};

// Fetch user's liked videos
export const fetchLikedVideos = async (accessToken, pageToken = null) => {
  try {
    const response = await axios.get(`${BASE_URL}/videos`, {
      params: {
        part: "snippet,statistics",
        myRating: "like",
        maxResults: 20,
        pageToken: pageToken,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return {
      items: response.data.items,
      nextPageToken: response.data.nextPageToken,
    };
  } catch (error) {
    console.error("Error fetching liked videos:", error);
    return { items: [], nextPageToken: null };
  }
};

// Fetch playlist items
export const fetchPlaylistItems = async (
  playlistId,
  pageToken = null,
  accessToken = null
) => {
  try {
    const config = {
      params: {
        part: "snippet,contentDetails",
        playlistId: playlistId,
        maxResults: 20,
        pageToken: pageToken,
      },
    };

    if (accessToken) {
      config.headers = {
        Authorization: `Bearer ${accessToken}`,
      };
    }

    const response = await axios.get(`${BASE_URL}/playlistItems`, config);
    return {
      items: response.data.items,
      nextPageToken: response.data.nextPageToken,
    };
  } catch (error) {
    console.error("Error fetching playlist items:", error);
    return { items: [], nextPageToken: null };
  }
};

// Fetch user's channel information
export const fetchUserChannel = async (accessToken, channelId) => {
  // if channelId is null, fetch the user's own channel
  let params = {
    part: "snippet,statistics,contentDetails",
  };
  if (channelId) {
    params.id = channelId;
  } else {
    params.mine = true;
  }

  try {
    const response = await axios.get(`${BASE_URL}/channels`, {
      params,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data.items[0];
  } catch (error) {
    console.error("Error fetching user channel:", error);
    return null;
  }
};

// Fetch user's subscriptions
export const fetchUserSubscriptions = async (accessToken, pageToken = null) => {
  try {
    const response = await axios.get(`${BASE_URL}/subscriptions`, {
      params: {
        part: "snippet,contentDetails",
        mine: true,
        maxResults: 20,
        pageToken: pageToken,
        order: "alphabetical",
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return {
      items: response.data.items,
      nextPageToken: response.data.nextPageToken,
    };
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    return { items: [], nextPageToken: null };
  }
};

// Fetch user's uploaded videos
export const fetchUserUploads = async (
  accessToken,
  playlistId,
  pageToken = null
) => {
  try {
    const response = await axios.get(`${BASE_URL}/playlistItems`, {
      params: {
        part: "snippet,contentDetails",
        playlistId: playlistId,
        maxResults: 20,
        pageToken: pageToken,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return {
      items: response.data.items,
      nextPageToken: response.data.nextPageToken,
    };
  } catch (error) {
    console.error("Error fetching user uploads:", error);
    return { items: [], nextPageToken: null };
  }
};

// Fetch latest videos from subscribed channels
export const fetchSubscriptionVideos = async (
  accessToken,
  pageToken = null
) => {
  try {
    // Calculate date 2 days ago
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
    const publishedAfter = twoDaysAgo.toISOString();

    // First get subscriptions
    const subsResponse = await axios.get(`${BASE_URL}/subscriptions`, {
      params: {
        part: "snippet",
        mine: true,
        maxResults: 10,
        order: "relevance",
        pageToken: pageToken,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!subsResponse.data.items?.length) {
      return { items: [], nextPageToken: null };
    }

    // Get channel IDs
    const channelIds = subsResponse.data.items.map(
      (sub) => sub.snippet.resourceId.channelId
    );

    // Get latest videos from these channels
    const videosResponse = await axios.get(`${BASE_URL}/search`, {
      params: {
        part: "snippet",
        type: "video",
        order: "date",
        publishedAfter: publishedAfter,
        maxResults: 20,
        channelId: channelIds,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!videosResponse.data.items?.length) {
      return { items: [], nextPageToken: subsResponse.data.nextPageToken };
    }

    // Get full video details
    const videoIds = videosResponse.data.items.map((item) => item.id.videoId);
    const detailsResponse = await axios.get(`${BASE_URL}/videos`, {
      params: {
        part: "snippet,statistics,contentDetails",
        id: videoIds.join(","),
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return {
      items: detailsResponse.data.items || [],
      nextPageToken: subsResponse.data.nextPageToken,
      channelIds,
    };
  } catch (error) {
    console.error("Error fetching subscription videos:", error);
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
  fetchUserPlaylists,
  fetchLikedVideos,
  fetchPlaylistItems,
  fetchUserChannel,
  fetchUserSubscriptions,
  fetchUserUploads,
  fetchSubscriptionVideos,
};
