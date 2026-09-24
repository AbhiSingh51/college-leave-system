import { NavLink } from "react-router-dom";

export default function Sidebar({ links, open, onNavigate }) {
  return (
    <>
      <aside className={`sidebar ${open ? "open" : ""}`}>
        {links.map((section) => (
          <div key={section.label}>
            {section.label && <div className="sidebar-section-label">{section.label}</div>}
            {section.items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={onNavigate}
                className={({ isActive }) => `sidebar-link${isActive ? " active" : ""}`}
              >
                <span className="sidebar-icon">{item.icon}</span>
                {item.label}
              </NavLink>
            ))}
          </div>
        ))}
      </aside>
      {open && <div className="sidebar-backdrop" onClick={onNavigate} />}
    </>
  );
}
