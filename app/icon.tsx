import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#030712',
          borderRadius: '8px',
        }}
      >
        <svg
          viewBox="0 0 100 100"
          width="28"
          height="28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="icon-brand-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="50%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>

          {/* Hexagon Frame */}
          <polygon
            points="50,7 90,28 90,72 50,93 10,72 10,28"
            fill="#090d16"
            stroke="url(#icon-brand-grad)"
            strokeWidth="6"
            strokeLinejoin="round"
          />

          {/* 'A' Vector Monogram */}
          <path
            d="M 32 70 L 50 24 L 68 70"
            stroke="url(#icon-brand-grad)"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* 'A' Bridge */}
          <path
            d="M 39 52 L 61 52"
            stroke="#38bdf8"
            strokeWidth="5"
            strokeLinecap="round"
          />

          {/* 'G' Integration */}
          <path
            d="M 64 42 L 72 46 L 72 68 L 50 78 L 36 71"
            stroke="url(#icon-brand-grad)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 52 64 L 65 64"
            stroke="#10b981"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
