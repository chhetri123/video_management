import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useYoutube } from "../../context/YoutubeContext";
import { formatViews } from "../Helper/helperStat";
import { useNavigate } from "react-router-dom";

const DescriptionBox = ({ video }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { channelDetails, fetchChannelInfo } = useYoutube();
  const navigate = useNavigate();

  useEffect(() => {
    if (video?.snippet?.channelId) {
      fetchChannelInfo(video.snippet.channelId);
    }
  }, [video?.snippet?.channelId]);

  if (!video) return null;

  const formatDescription = (text) => {
    if (!isExpanded) {
      return text.slice(0, 200) + (text.length > 200 ? "..." : "");
    }
    return text;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="bg-primary rounded-lg p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          {channelDetails?.snippet?.thumbnails?.default?.url ? (
            <img
              src={channelDetails.snippet.thumbnails.default.url}
              alt={channelDetails.snippet.title}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
              <span className="text-lg font-bold">
                {video.snippet.channelTitle[0].toUpperCase()}
              </span>
            </div>
          )}
          <div>
            <h3
              className="font-semibold cursor-pointer"
              onClick={() => {
                navigate(`/channel/${video.snippet.channelId}`);
              }}
            >
              {video.snippet.channelTitle}
            </h3>
            <div className="flex flex-col text-sm text-gray-400">
              <span>
                {channelDetails &&
                  `${formatViews(
                    channelDetails.statistics.subscriberCount
                  )} subscribers`}
              </span>
            </div>
          </div>
        </div>
        <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full font-semibold transition-colors">
          Subscribe
        </button>
      </div>
      <div className="bg-dark rounded-lg p-4">
        <p className="whitespace-pre-line text-gray-300">
          {formatDescription(video.snippet.description)}
        </p>
        {video.snippet.description.length > 200 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-2 flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
          >
            <span>{isExpanded ? "Show Less" : "Show More"}</span>
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        )}
      </div>
    </div>
  );
};

export default DescriptionBox;
