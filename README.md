# St. Aldric's College — Leave Approval Management System

A frontend-only prototype (React + React Router + mock data) for a college
leave application and approval workflow, covering Student, Class Teacher,
HOD and Admin roles.

## Run it

```
npm install
npm run dev
```

Then open the printed local URL. No backend is required — everything runs
on in-memory mock data (see `src/data/mockData.js`).

## Signing in

The login page accepts any password. Use one of these IDs (or type your own —
it will default to the Student role) to see each dashboard:

| Role         | Student/Staff ID |
|--------------|-------------------|
| Student      | STU2041           |
| Class Teacher| TCH108            |
| HOD          | HOD12             |
| Admin        | ADM01             |

## Structure

```
src/
├── components/   Reusable UI: Navbar, Sidebar, DashboardCard, StatusBadge,
│                 ApplicationTable, ApprovalTimeline, Modal, Button,
│                 FormInput, SelectInput, DateInput, FileUpload,
│                 Notification, Footer
├── layouts/      AuthLayout, DashboardLayout (role-aware sidebar/nav)
├── pages/        auth/, student/, teacher/, hod/, admin/
├── routes/       AppRoutes.jsx — all route definitions, role-guarded
├── data/         mockData.js — seed data + in-memory leave records
├── hooks/        useAuth.js, useLeaveData.js
├── utils/        formatters + validation helpers
└── styles/       theme.css — the classical academic design system
```
