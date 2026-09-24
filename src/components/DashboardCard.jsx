export default function DashboardCard({ label, value, icon }) {
  return (
    <div className="stat-card">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div className="stat-value">{value}</div>
          <div className="stat-label">{label}</div>
        </div>
        {icon && <div style={{ fontSize: "1.4rem", opacity: 0.55 }}>{icon}</div>}
      </div>
    </div>
  );
}
