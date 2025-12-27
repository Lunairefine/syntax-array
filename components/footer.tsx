export default function Footer() {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        pointerEvents: 'none',
      }}
    >
      <span
        style={{
          color: '#07dbe6ff',
          fontFamily: 'monospace',
          fontSize: '14px',
          letterSpacing: '0.1em',
          opacity: 0.8,
          userSelect: 'none',
        }}
      >
        ver 0.1.0
      </span>
    </div>
  );
}