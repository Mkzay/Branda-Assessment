export default function Loading() {
  return (
    <div className="container">
      <div className="page-hero">
        <div
          className="skeleton"
          style={{ width: 210, height: 18, marginBottom: 25 }}
        />
        <div
          className="skeleton"
          style={{ width: 'min(100%,520px)', height: 90 }}
        />
      </div>
      <div className="grid items-start gap-[25px] pb-[52px] min-[761px]:grid-cols-[210px_minmax(0,1fr)] min-[761px]:pb-[90px] min-[1051px]:grid-cols-[242px_minmax(0,1fr)] min-[1051px]:gap-[42px]">
        <div className="skeleton" style={{ height: 420 }} />
        <div className="grid grid-cols-1 gap-[18px] min-[521px]:grid-cols-2 min-[761px]:gap-[22px] min-[1051px]:grid-cols-3">
          {Array.from({ length: 6 }, (_, i) => (
            <div className="skeleton" key={i} style={{ height: 370 }} />
          ))}
        </div>
      </div>
    </div>
  );
}
