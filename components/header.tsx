'use client';

import { useEffect, useState } from 'react';
import sdk from '@farcaster/frame-sdk';

export default function Header() {
  const [username, setUsername] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadContext = async () => {
      try {
        const context = await sdk.context;
        if (context?.user?.username) {
          setUsername(context.user.username);
        }
      } catch (error) {
        console.error('Failed to load Farcaster context', error);
      } finally {
        setIsLoaded(true);
      }
    };

    loadContext();
  }, []);

  if (!isLoaded || !username) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: '24px',
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        zIndex: 50,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(4px)',
          padding: '8px 16px',
          borderRadius: '999px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <span
          style={{
            color: '#e5e5e5',
            fontFamily: 'monospace',
            fontSize: '14px',
            letterSpacing: '0.05em',
            userSelect: 'none',
          }}
        >
          summoned by @{username}
        </span>
      </div>
    </div>
  );
}