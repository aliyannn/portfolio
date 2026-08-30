import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
  width: 180,
  height: 180,
};
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #030712 0%, #090d16 100%)',
          borderRadius: '40px',
        }}
      >
        <svg
          viewBox="0 0 100 100"
          width="130"
          height="130"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="apple-brand-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="50%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>

          {/* Hexagon Frame */}
          <polygon
            points="50,7 90,28 90,72 50,93 10,72 10,28"
            fill="#030712"
            stroke="url(#apple-brand-grad)"
            strokeWidth="4"
            strokeLinejoin="round"
          />

          {/* Precision 'A' Monogram Circuit Track */}
          <path
            d="M 32 70 L 50 24 L 68 70"
            stroke="url(#apple-brand-grad)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* 'A' Bridge */}
          <path
            d="M 39 52 L 61 52"
            stroke="#38bdf8"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* 'G' Integration */}
          <path
            d="M 64 42 L 72 46 L 72 68 L 50 78 L 36 71"
            stroke="url(#apple-brand-grad)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 52 64 L 65 64"
            stroke="#10b981"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Glowing Vertex Nodes */}
          <circle cx="50" cy="7" r="3" fill="#06b6d4" />
          <circle cx="90" cy="28" r="3" fill="#6366f1" />
          <circle cx="90" cy="72" r="3" fill="#10b981" />
          <circle cx="10" cy="28" r="3" fill="#06b6d4" />
          <circle cx="50" cy="24" r="2.5" fill="#ffffff" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
