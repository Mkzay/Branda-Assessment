export default function Loading() {
  return (
    <div className="container detail-top">
      <div className="skeleton" style={{ aspectRatio: '1.13' }} />
      <div>
        <div
          className="skeleton"
          style={{ height: 20, width: 150, marginBottom: 25 }}
        />
        <div className="skeleton" style={{ height: 90, marginBottom: 20 }} />
        <div
          className="skeleton"
          style={{ height: 20, width: 250, marginBottom: 35 }}
        />
        <div className="skeleton" style={{ height: 220 }} />
      </div>
    </div>
  );
}
