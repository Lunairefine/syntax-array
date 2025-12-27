interface TapProps {
  visible: boolean;
}

export default function Tap({ visible }: TapProps) {
  if (!visible) return null;

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
        zIndex: 40,
      }}
    >
      <span
        className="animate-pulse"
        style={{
          color: 'rgba(24, 211, 248, 0.8)',
          fontFamily: 'monospace',
          fontSize: '1.25rem',
          userSelect: 'none',
        }}
      >
        [ tap anywhere ]
      </span>
    </div>
  );
}