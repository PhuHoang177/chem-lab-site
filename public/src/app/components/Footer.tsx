import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-[rgba(38,168,44,0.85)] text-white border-t border-green-700 py-6 mt-12">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Copyright and credits */}
        <div className="text-sm text-left">
          <div>
            Copyright © {new Date().getFullYear()} {"LOU'S LAB – All Rights Reserved."}
          </div>
          <div>
            Headshot image credits: Leon Hoang
          </div>
          <a
            href="mailto:your@email.com"
            className="text-white underline hover:text-green-100"
          >
            your@email.com
          </a>
        </div>
        {/* Center: Social icons */}
        <div className="flex space-x-4">
          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="bg-white rounded-full p-1 hover:bg-green-100 transition flex items-center justify-center"
            style={{ width: 32, height: 32 }}
          >
            {/* Official LinkedIn SVG */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="12" fill="#0A66C2"/>
              <path d="M17 17h-2.25v-3.25c0-.75-.25-1.25-1-1.25s-1 .5-1 1.25V17H10V10h2.25v1c.25-.5 1-1 2-1 1.5 0 2.25 1 2.25 2.5V17zM7.5 8.75a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zM8.75 17h-2.5V10h2.5v7z" fill="white"/>
            </svg>
          </a>
          {/* X (Twitter) */}
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X"
            className="bg-white rounded-full p-1 hover:bg-green-100 transition flex items-center justify-center"
            style={{ width: 32, height: 32 }}
          >
            {/* Official X SVG */}
            <svg width="24" height="24" viewBox="0 0 1200 1227" fill="none">
              <circle cx="600" cy="613.5" r="600" fill="black"/>
              <path fill="white" d="M911.6 320H1080L728.2 695.7 1140 1200H823.5L600 927.6 376.5 1200H60L471.8 695.7 120 320h168.4l311.6 357.5L911.6 320ZM852.5 1100h110.7L600 800.6 236.8 1100h110.7L600 927.6 852.5 1100Z"/>
            </svg>
          </a>
        </div>
        {/* Right: Powered by */}
        <div className="flex flex-col items-center md:items-end">
          <span className="text-xs text-white mb-1">Powered by</span>
          <span className="flex items-center space-x-2">
            {/* Sanity logo SVG */}
            <svg width="80" height="24" viewBox="0 0 80 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g>
                <rect width="24" height="24" rx="4" fill="#F03E2F"/>
                <text x="28" y="18" fontFamily="Arial, sans-serif" fontSize="18" fill="white">Sanity</text>
              </g>
            </svg>
          </span>
        </div>
      </div>
    </footer>
  );
}