// Mock data for the College Leave Approval Management System.
// Everything here is in-memory only — no backend calls.

export const COLLEGE = {
  name: "St. Aldric's College",
  systemName: "Leave Approval Management System",
  address: "12 University Avenue, Kingsbridge",
};

export const ROLES = {
  STUDENT: "student",
  TEACHER: "teacher",
  HOD: "hod",
  ADMIN: "admin",
};

export const LEAVE_TYPES = ["Medical", "Personal", "Family Emergency", "Other"];

export const DEMO_USERS = [
  { id: "STU2041", role: ROLES.STUDENT, name: "Ananya Rao", department: "Computer Science", semester: "5th", section: "B" },
  { id: "STU2042", role: ROLES.STUDENT, name: "Rohan Mehta", department: "Computer Science", semester: "5th", section: "B" },
  { id: "STU2055", role: ROLES.STUDENT, name: "Sara Fernandes", department: "Electronics", semester: "3rd", section: "A" },
  { id: "TCH108", role: ROLES.TEACHER, name: "Prof. Meera Iyer", department: "Computer Science" },
  { id: "HOD12", role: ROLES.HOD, name: "Dr. Vikram Nair", department: "Computer Science" },
  { id: "ADM01", role: ROLES.ADMIN, name: "Mrs. Latha Pillai", department: "Administration" },
];

export function findUserById(id) {
  return DEMO_USERS.find((u) => u.id.toLowerCase() === String(id).toLowerCase());
}

// Each application moves through: submitted -> teacher -> hod -> decided
export const INITIAL_APPLICATIONS = [
  {
    id: "LV-2026-0091",
    studentId: "STU2041",
    studentName: "Ananya Rao",
    department: "Computer Science",
    semester: "5th",
    section: "B",
    leaveType: "Medical",
    startDate: "2026-09-28",
    endDate: "2026-09-30",
    days: 3,
    reason: "Recovering from a viral fever, advised bed rest by the college doctor.",
    document: "medical_certificate.pdf",
    emergencyContact: "+91 98200 11234",
    appliedOn: "2026-09-24",
    status: "pending",
    stage: "teacher",
    history: [
      { stage: "submitted", by: "Ananya Rao", date: "2026-09-24", note: "Application submitted." },
    ],
  },
  {
    id: "LV-2026-0088",
    studentId: "STU2041",
    studentName: "Ananya Rao",
    department: "Computer Science",
    semester: "5th",
    section: "B",
    leaveType: "Family Emergency",
    startDate: "2026-09-10",
    endDate: "2026-09-12",
    days: 3,
    reason: "Family emergency requiring travel to hometown.",
    document: "supporting_letter.pdf",
    emergencyContact: "+91 98200 11234",
    appliedOn: "2026-09-08",
    status: "approved",
    stage: "decided",
    history: [
      { stage: "submitted", by: "Ananya Rao", date: "2026-09-08", note: "Application submitted." },
      { stage: "teacher", by: "Prof. Meera Iyer", date: "2026-09-08", note: "Forwarded to HOD for approval." },
      { stage: "hod", by: "Dr. Vikram Nair", date: "2026-09-09", note: "Approved. Please share notes with classmates." },
    ],
  },
  {
    id: "LV-2026-0076",
    studentId: "STU2041",
    studentName: "Ananya Rao",
    department: "Computer Science",
    semester: "5th",
    section: "B",
    leaveType: "Personal",
    startDate: "2026-08-20",
    endDate: "2026-08-20",
    days: 1,
    reason: "Attending a family function.",
    document: null,
    emergencyContact: "+91 98200 11234",
    appliedOn: "2026-08-18",
    status: "rejected",
    stage: "decided",
    history: [
      { stage: "submitted", by: "Ananya Rao", date: "2026-08-18", note: "Application submitted." },
      { stage: "teacher", by: "Prof. Meera Iyer", date: "2026-08-19", note: "Rejected: clashes with the scheduled internal assessment." },
    ],
  },
  {
    id: "LV-2026-0092",
    studentId: "STU2042",
    studentName: "Rohan Mehta",
    department: "Computer Science",
    semester: "5th",
    section: "B",
    leaveType: "Personal",
    startDate: "2026-09-29",
    endDate: "2026-09-29",
    days: 1,
    reason: "Appearing for a competitive examination.",
    document: "admit_card.pdf",
    emergencyContact: "+91 90210 44556",
    appliedOn: "2026-09-23",
    status: "pending",
    stage: "teacher",
    history: [
      { stage: "submitted", by: "Rohan Mehta", date: "2026-09-23", note: "Application submitted." },
    ],
  },
  {
    id: "LV-2026-0093",
    studentId: "STU2042",
    studentName: "Rohan Mehta",
    department: "Computer Science",
    semester: "5th",
    section: "B",
    leaveType: "Medical",
    startDate: "2026-09-15",
    endDate: "2026-09-18",
    days: 4,
    reason: "Dengue fever, hospitalised for observation.",
    document: "discharge_summary.pdf",
    emergencyContact: "+91 90210 44556",
    appliedOn: "2026-09-14",
    status: "pending",
    stage: "hod",
    history: [
      { stage: "submitted", by: "Rohan Mehta", date: "2026-09-14", note: "Application submitted." },
      { stage: "teacher", by: "Prof. Meera Iyer", date: "2026-09-14", note: "Forwarded to HOD given the extended duration." },
    ],
  },
  {
    id: "LV-2026-0081",
    studentId: "STU2055",
    studentName: "Sara Fernandes",
    department: "Electronics",
    semester: "3rd",
    section: "A",
    leaveType: "Other",
    startDate: "2026-09-05",
    endDate: "2026-09-06",
    days: 2,
    reason: "Representing the college at an inter-university robotics meet.",
    document: "event_invite.pdf",
    emergencyContact: "+91 88990 22110",
    appliedOn: "2026-09-01",
    status: "approved",
    stage: "decided",
    history: [
      { stage: "submitted", by: "Sara Fernandes", date: "2026-09-01", note: "Application submitted." },
      { stage: "teacher", by: "Prof. Meera Iyer", date: "2026-09-01", note: "Forwarded to HOD." },
      { stage: "hod", by: "Dr. Vikram Nair", date: "2026-09-02", note: "Approved. All the best for the meet." },
    ],
  },
];

export const APPROVAL_TIMELINE_STEPS = ["submitted", "teacher", "hod", "decided"];

export const STAGE_LABELS = {
  submitted: "Student Submitted",
  teacher: "Class Teacher Review",
  hod: "HOD Review",
  decided: "Final Decision",
};

export const DEPARTMENTS = [
  { name: "Computer Science", students: 214, teachers: 12 },
  { name: "Electronics", students: 178, teachers: 9 },
  { name: "Mechanical", students: 196, teachers: 11 },
  { name: "Civil", students: 142, teachers: 8 },
  { name: "Commerce", students: 233, teachers: 10 },
];

export const TEACHERS_LIST = [
  { id: "TCH108", name: "Prof. Meera Iyer", department: "Computer Science", students: 62 },
  { id: "TCH114", name: "Prof. Aravind Das", department: "Computer Science", students: 58 },
  { id: "TCH121", name: "Prof. Nisha George", department: "Electronics", students: 54 },
  { id: "TCH130", name: "Prof. Karan Bhatt", department: "Mechanical", students: 60 },
];
