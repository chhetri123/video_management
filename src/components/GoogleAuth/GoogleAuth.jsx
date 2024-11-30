import React, { useState, useCallback } from "react";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { User, PlayCircle, ThumbsUp, LogOut } from "lucide-react"; // Import Lucide icons

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

// Separate internal component that uses the Google hooks
const GoogleAuthContent = () => {
  const { login, logout, user } = useAuth();
  const [channelInfo, setChannelInfo] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // Get user info from ID token
        const userInfoResponse = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
          }
        );
        const userInfo = await userInfoResponse.json();

        // Fetch YouTube channel info
        const channelResponse = await fetch(
          "https://youtube.googleapis.com/youtube/v3/channels?part=snippet,statistics&mine=true",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
              Accept: "application/json",
            },
          }
        );

        if (channelResponse.ok) {
          const channelData = await channelResponse.json();
          console.log(channelData);
          if (channelData.items?.length > 0) {
            console.log(channelData.items);
            setChannelInfo(channelData.items[0]);
          }
        }

        // Store user info and access token
        login(userInfo, tokenResponse.access_token);
      } catch (error) {
        console.error("Authentication error:", error);
      }
    },
    onError: () => console.error("Login Failed"),
    scope:
      "https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/youtube.force-ssl",
    flow: "implicit",
  });

  const handleLogout = () => {
    logout();
    setChannelInfo(null);
    setIsDropdownOpen(false);
    navigate("/");
  };

  const menuItems = [
    {
      icon: <User size={18} />,
      label: "My Channel",
      onClick: () => navigate(`/channel/${channelInfo?.id}`),
    },
    {
      icon: <PlayCircle size={18} />,
      label: "Playlists",
      onClick: () => navigate("/playlists"),
    },
    {
      icon: <ThumbsUp size={18} />,
      label: "Liked Videos",
      onClick: () => navigate("/liked-videos"),
    },
    {
      icon: <LogOut size={18} />,
      label: "Sign Out",
      onClick: handleLogout,
      className: "text-red-500 hover:text-red-400",
    },
  ];

  return (
    <div className="relative">
      {!user ? (
        <button
          onClick={() => googleLogin()}
          className="flex items-center justify-center space-x-2 bg-white text-gray-800 px-6 py-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          <span>Sign in with Google</span>
        </button>
      ) : (
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-2 focus:outline-none"
          >
            <img
              src={user.picture}
              alt={user.name}
              className="w-9 h-9 rounded-full border-2 border-transparent hover:border-red-500 transition-colors"
            />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-gray-800 rounded-lg shadow-lg py-1 z-50 border border-gray-700">
              {/* User Info Section */}
              <div className="px-4 py-3 border-b border-gray-700">
                <p className="text-sm font-semibold text-white truncate">
                  {user.name}
                </p>
                <p className="text-xs text-gray-400 truncate">{user.email}</p>
              </div>

              {/* Menu Items */}
              <div className="py-1">
                {menuItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={item.onClick}
                    className={`flex items-center space-x-2 px-4 py-2 text-gray-300 hover:text-white ${item.className}`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Main component that wraps the content with GoogleOAuthProvider
const GoogleAuth = () => {
  if (!GOOGLE_CLIENT_ID) {
    console.error("Google Client ID is not defined");
    return null;
  }

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <GoogleAuthContent />
    </GoogleOAuthProvider>
  );
};

export default GoogleAuth;
