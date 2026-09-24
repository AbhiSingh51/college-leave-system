import { Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import Login from "../pages/auth/Login";
import { useAuth } from "../hooks/useAuth";
import { ROLES } from "../data/mockData";

import StudentDashboard from "../pages/student/Dashboard";
import ApplyLeave from "../pages/student/ApplyLeave";
import MyApplications from "../pages/student/MyApplications";
import LeaveHistory from "../pages/student/LeaveHistory";
import StudentApplicationDetails from "../pages/student/ApplicationDetails";
import StudentProfile from "../pages/student/Profile";

import TeacherDashboard from "../pages/teacher/Dashboard";
import TeacherApplicationsList from "../pages/teacher/ApplicationsList";
import ApplicationReview from "../pages/teacher/ApplicationReview";
import TeacherStudents from "../pages/teacher/Students";
import TeacherProfile from "../pages/teacher/Profile";

import HodDashboard from "../pages/hod/Dashboard";
import HodStudentHistory from "../pages/hod/History";
import HodProfile from "../pages/hod/Profile";

import AdminDashboard from "../pages/admin/Dashboard";
import AdminStudents from "../pages/admin/Students";
import AdminTeachers from "../pages/admin/Teachers";
import AdminDepartments from "../pages/admin/Departments";
import AdminLeaveApplications from "../pages/admin/LeaveApplications";
import AdminReports from "../pages/admin/Reports";
import AdminSettings from "../pages/admin/Settings";

const STUDENT_LINKS = [
  { label: "", items: [
    { to: "/student/dashboard", label: "Dashboard", icon: "🏠", end: true },
    { to: "/student/apply", label: "Apply Leave", icon: "📝" },
    { to: "/student/applications", label: "My Applications", icon: "📋" },
    { to: "/student/history", label: "Leave History", icon: "🗂️" },
    { to: "/student/profile", label: "Profile", icon: "👤" },
  ]},
];

const TEACHER_LINKS = [
  { label: "", items: [
    { to: "/teacher/dashboard", label: "Dashboard", icon: "🏠", end: true },
    { to: "/teacher/pending", label: "Pending Applications", icon: "⏳" },
    { to: "/teacher/approved", label: "Approved Applications", icon: "✅" },
    { to: "/teacher/rejected", label: "Rejected Applications", icon: "✕" },
    { to: "/teacher/students", label: "Students", icon: "🎓" },
    { to: "/teacher/profile", label: "Profile", icon: "👤" },
  ]},
];

const HOD_LINKS = [
  { label: "", items: [
    { to: "/hod/dashboard", label: "Dashboard", icon: "🏠", end: true },
    { to: "/hod/history", label: "Student Leave History", icon: "🗂️" },
    { to: "/hod/profile", label: "Profile", icon: "👤" },
  ]},
];

const ADMIN_LINKS = [
  { label: "", items: [
    { to: "/admin/dashboard", label: "Dashboard", icon: "🏠", end: true },
    { to: "/admin/students", label: "Students", icon: "🎓" },
    { to: "/admin/teachers", label: "Teachers", icon: "🧑‍🏫" },
    { to: "/admin/departments", label: "Departments", icon: "🏛️" },
    { to: "/admin/applications", label: "Leave Applications", icon: "📋" },
    { to: "/admin/reports", label: "Reports", icon: "📈" },
    { to: "/admin/settings", label: "Settings", icon: "⚙️" },
  ]},
];

function ProtectedRoute({ role, children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  const allowed = Array.isArray(role) ? role : [role];
  if (role && !allowed.includes(user.role)) return <Navigate to={`/${user.role}/dashboard`} replace />;
  return children;
}

export default function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Navigate to={user ? `/${user.role}/dashboard` : "/login"} replace />} />

      <Route path="/login" element={
        user ? <Navigate to={`/${user.role}/dashboard`} replace /> : <AuthLayout><Login /></AuthLayout>
      } />

      {/* Student */}
      <Route path="/student" element={<ProtectedRoute role={ROLES.STUDENT}><DashboardLayout links={STUDENT_LINKS} /></ProtectedRoute>}>
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="apply" element={<ApplyLeave />} />
        <Route path="applications" element={<MyApplications />} />
        <Route path="applications/:id" element={<StudentApplicationDetails />} />
        <Route path="history" element={<LeaveHistory />} />
        <Route path="profile" element={<StudentProfile />} />
      </Route>

      {/* Teacher */}
      <Route path="/teacher" element={<ProtectedRoute role={ROLES.TEACHER}><DashboardLayout links={TEACHER_LINKS} /></ProtectedRoute>}>
        <Route path="dashboard" element={<TeacherDashboard />} />
        <Route path="pending" element={<TeacherApplicationsList status="pending" title="Pending Applications" subtitle="Applications awaiting your review." />} />
        <Route path="approved" element={<TeacherApplicationsList status="approved" title="Approved Applications" subtitle="Applications you have approved or forwarded." />} />
        <Route path="rejected" element={<TeacherApplicationsList status="rejected" title="Rejected Applications" subtitle="Applications you have rejected." />} />
        <Route path="review/:id" element={<ApplicationReview />} />
        <Route path="students" element={<TeacherStudents />} />
        <Route path="profile" element={<TeacherProfile />} />
      </Route>

      {/* HOD — reuses the teacher review page for the shared approve/reject workflow */}
      <Route path="/hod" element={<ProtectedRoute role={ROLES.HOD}><DashboardLayout links={HOD_LINKS} /></ProtectedRoute>}>
        <Route path="dashboard" element={<HodDashboard />} />
        <Route path="history" element={<HodStudentHistory />} />
        <Route path="review/:id" element={<ApplicationReview />} />
        <Route path="profile" element={<HodProfile />} />
      </Route>

      {/* Admin */}
      <Route path="/admin" element={<ProtectedRoute role={ROLES.ADMIN}><DashboardLayout links={ADMIN_LINKS} /></ProtectedRoute>}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="students" element={<AdminStudents />} />
        <Route path="teachers" element={<AdminTeachers />} />
        <Route path="departments" element={<AdminDepartments />} />
        <Route path="applications" element={<AdminLeaveApplications />} />
        <Route path="applications/:id" element={<ApplicationReview />} />
        <Route path="reports" element={<AdminReports />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
