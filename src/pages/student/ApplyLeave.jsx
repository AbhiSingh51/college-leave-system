import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../../components/FormInput";
import SelectInput from "../../components/SelectInput";
import DateInput from "../../components/DateInput";
import FileUpload from "../../components/FileUpload";
import Button from "../../components/Button";
import { useAuth } from "../../hooks/useAuth";
import { useLeaveData } from "../../hooks/useLeaveData";
import { LEAVE_TYPES, DEPARTMENTS } from "../../data/mockData";
import { validateLeaveForm, daysBetween } from "../../utils/helpers";

const SEMESTERS = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"];

export default function ApplyLeave() {
  const { user } = useAuth();
  const { submitApplication } = useLeaveData();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    studentName: user.name,
    studentId: user.id,
    department: user.department,
    semester: user.semester,
    section: user.section,
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
    emergencyContact: "",
    document: null,
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(null);

  const update = (field, value) => setValues((v) => ({ ...v, [field]: value }));

  const days = daysBetween(values.startDate, values.endDate);

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validateLeaveForm(values);
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;
    const app = submitApplication({ ...values, days });
    setSubmitted(app.id);
  };

  const handleReset = () => {
    setValues({
      studentName: user.name,
      studentId: user.id,
      department: user.department,
      semester: user.semester,
      section: user.section,
      leaveType: "",
      startDate: "",
      endDate: "",
      reason: "",
      emergencyContact: "",
      document: null,
    });
    setErrors({});
  };

  if (submitted) {
    return (
      <div className="card" style={{ textAlign: "center", padding: 48 }}>
        <div style={{ fontSize: "2.4rem", marginBottom: 10 }}>✅</div>
        <h2>Application Submitted</h2>
        <p className="text-muted">Your leave application <strong>{submitted}</strong> has been sent to your class teacher for review.</p>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 20 }}>
          <Button variant="outline" onClick={() => navigate(`/student/applications/${submitted}`)}>View Application</Button>
          <Button variant="primary" onClick={() => { setSubmitted(null); handleReset(); }}>Apply for Another Leave</Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1>Apply for Leave</h1>
      <p className="text-muted" style={{ marginBottom: 20 }}>Complete the official leave application form below.</p>

      <form className="card" onSubmit={handleSubmit}>
        <div className="doc-section-title">Student Information</div>
        <div className="form-grid" style={{ marginBottom: 18 }}>
          <FormInput label="Student Name" required value={values.studentName} onChange={(e) => update("studentName", e.target.value)} error={errors.studentName} />
          <FormInput label="Student ID" required value={values.studentId} onChange={(e) => update("studentId", e.target.value)} error={errors.studentId} />
          <SelectInput label="Department" required options={DEPARTMENTS.map((d) => d.name)} value={values.department} onChange={(e) => update("department", e.target.value)} error={errors.department} />
          <SelectInput label="Semester" required options={SEMESTERS} value={values.semester} onChange={(e) => update("semester", e.target.value)} error={errors.semester} />
          <FormInput label="Section" required value={values.section} onChange={(e) => update("section", e.target.value)} error={errors.section} />
        </div>

        <div className="doc-section-title">Leave Details</div>
        <div className="form-grid" style={{ marginBottom: 18 }}>
          <SelectInput label="Leave Type" required options={LEAVE_TYPES} value={values.leaveType} onChange={(e) => update("leaveType", e.target.value)} error={errors.leaveType} />
          <FormInput label="Number of Days" value={days || ""} readOnly hint="Calculated automatically from the dates below." />
          <DateInput label="Start Date" required value={values.startDate} onChange={(e) => update("startDate", e.target.value)} error={errors.startDate} />
          <DateInput label="End Date" required value={values.endDate} onChange={(e) => update("endDate", e.target.value)} error={errors.endDate} />
          <FormInput label="Emergency Contact" required placeholder="+91 XXXXX XXXXX" value={values.emergencyContact} onChange={(e) => update("emergencyContact", e.target.value)} error={errors.emergencyContact} />
        </div>

        <div className="form-grid">
          <div className="form-field full-width">
            <label className="form-label">Reason for Leave<span className="required-mark">*</span></label>
            <textarea
              className={`form-textarea ${errors.reason ? "has-error" : ""}`}
              rows={4}
              placeholder="Briefly describe the reason for your leave…"
              value={values.reason}
              onChange={(e) => update("reason", e.target.value)}
            />
            {errors.reason && <span className="form-error-text">{errors.reason}</span>}
          </div>

          <FileUpload onFileSelect={(name) => update("document", name)} />
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
          <Button type="submit" variant="primary">Submit Application</Button>
          <Button type="button" variant="outline" onClick={handleReset}>Reset</Button>
        </div>
      </form>
    </div>
  );
}
