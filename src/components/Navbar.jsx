import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { COLLEGE } from "../data/mockData";
import { initials } from "../utils/helpers";
import { useAuth } from "../hooks/useAuth";

export default function Navbar({ onToggleSidebar }) {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="top-navbar">
      <div className="navbar-brand">
        <button className="hamburger-btn" onClick={onToggleSidebar} aria-label="Toggle menu">☰</button>
        <div className="navbar-crest">SA</div>
        <div>
          <div className="navbar-title">{COLLEGE.name}</div>
          <div className="navbar-subtitle">{COLLEGE.systemName}</div>
        </div>
      </div>

      <div className="navbar-right">
        <div className="navbar-user" onClick={() => setMenuOpen((o) => !o)}>
          <div className="navbar-avatar">{initials(user?.name || "?")}</div>
          <div>
            <div className="navbar-username">{user?.name}</div>
            <div className="navbar-role">{user?.role?.toUpperCase()}</div>
          </div>
          {menuOpen && (
            <div className="profile-menu">
              <button onClick={() => navigate(`/${user.role}/profile`)}>My Profile</button>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
