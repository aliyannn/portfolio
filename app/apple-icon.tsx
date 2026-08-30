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
          background: '#070709',
          border: '4px solid rgba(6, 182, 212, 0.4)',
          borderRadius: '40px',
        }}
      >
        <svg
          viewBox="0 0 100 100"
          width="135"
          height="135"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="apple-brand-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06B6D4" />
              <stop offset="50%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
          </defs>

          {/* Hexagon Outer Frame */}
          <polygon
            points="50,6 91,28 91,72 50,94 9,72 9,28"
            fill="#030712"
            stroke="url(#apple-brand-grad)"
            strokeWidth="5"
            strokeLinejoin="round"
          />

          {/* 'A' Monogram Circuit */}
          <path
            d="M 31 71 L 50 22 L 69 71"
            stroke="url(#apple-brand-grad)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* 'A' Bridge */}
          <path
            d="M 38 52 L 62 52"
            stroke="#38BDF8"
            strokeWidth="4.5"
            strokeLinecap="round"
          />

          {/* 'G' Interlocking Loop */}
          <path
            d="M 65 41 L 74 46 L 74 68 L 50 79 L 35 71"
            stroke="url(#apple-brand-grad)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 52 64 L 67 64"
            stroke="#10B981"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Glowing Vertex Nodes */}
          <circle cx="50" cy="6" r="3" fill="#06B6D4" />
          <circle cx="91" cy="28" r="3" fill="#3B82F6" />
          <circle cx="91" cy="72" r="3" fill="#10B981" />
          <circle cx="50" cy="94" r="3" fill="#10B981" />
          <circle cx="9" cy="72" r="3" fill="#3B82F6" />
          <circle cx="9" cy="28" r="3" fill="#06B6D4" />
          <circle cx="50" cy="22" r="2.5" fill="#ffffff" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
