import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { COLLEGE } from "../../data/mockData";
import { useAuth } from "../../hooks/useAuth";
import Button from "../../components/Button";

export default function Login() {
  const [idOrEmail, setIdOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!idOrEmail.trim() || !password.trim()) {
      setError("Please enter both your ID and password.");
      return;
    }
    const user = login(idOrEmail);
    navigate(`/${user.role}/dashboard`);
  };

  return (
    <form className="auth-card" onSubmit={handleSubmit}>
      <div className="auth-crest">SA</div>
      <h1 className="auth-heading" style={{ textAlign: "center" }}>{COLLEGE.name}</h1>
      <p className="auth-subheading">{COLLEGE.systemName}</p>

      <div className="form-field full-width">
        <label className="form-label" htmlFor="loginId">Email / Student ID<span className="required-mark">*</span></label>
        <input
          id="loginId"
          className="form-input"
          placeholder="e.g. STU2041 or name@college.edu"
          value={idOrEmail}
          onChange={(e) => setIdOrEmail(e.target.value)}
        />
      </div>

      <div className="form-field full-width" style={{ marginTop: 14 }}>
        <label className="form-label" htmlFor="loginPassword">Password<span className="required-mark">*</span></label>
        <input
          id="loginPassword"
          type="password"
          className="form-input"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {error && <p className="form-error-text" style={{ marginTop: 10 }}>{error}</p>}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 16 }}>
        <label className="checkbox-row">
          <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
          Remember me
        </label>
        <button type="button" className="btn-link">Forgot password?</button>
      </div>

      <Button type="submit" variant="primary" block style={{ marginTop: 20 }}>Sign In</Button>

      <div className="auth-divider" />

      <div className="demo-hint">
        <strong>Demo IDs</strong> — Student: STU2041 · Teacher: TCH108 · HOD: HOD12 · Admin: ADM01.
        Any password works.
      </div>

      <p className="auth-footnote">Trouble signing in? Contact the office of academic affairs.</p>
    </form>
  );
}
