import { COLLEGE } from "../data/mockData";

export default function Footer() {
  return (
    <div className="footer-strip">
      © {new Date().getFullYear()} {COLLEGE.name} · {COLLEGE.systemName} · {COLLEGE.address}
    </div>
  );
}
