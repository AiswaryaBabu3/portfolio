import './TheatricalCurtains.css';

export default function TheatricalCurtains() {
  return (
    <div className="stage-curtains-container" aria-hidden="true">
      {/* Top Stage Pelmet Drape */}
      <div className="stage-pelmet">
        <div className="stage-pelmet-fringes"></div>
      </div>

      {/* Side Velvet Stage Curtains */}
      <div className="curtain-drape curtain-left"></div>
      <div className="curtain-drape curtain-right"></div>
    </div>
  );
}
