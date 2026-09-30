import './StageLighting.css';

export default function StageLighting() {
  return (
    <div className="stage-lighting-root" aria-hidden="true">
      {/* Top Spotlights Beams */}
      <div className="spotlight-rig">
        <div className="spotlight-beam beam-left"></div>
        <div className="spotlight-beam beam-right"></div>
        <div className="spotlight-beam beam-center"></div>
      </div>

      {/* Stage Floor Glow Footlights */}
      <div className="stage-floor-glow"></div>
    </div>
  );
}
