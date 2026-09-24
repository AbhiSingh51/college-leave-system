import { createContext, useContext, useState, useCallback } from "react";
import { INITIAL_APPLICATIONS } from "../data/mockData";
import { generateApplicationId } from "../utils/helpers";

const LeaveDataContext = createContext(null);

export function LeaveDataProvider({ children }) {
  const [applications, setApplications] = useState(INITIAL_APPLICATIONS);
  const [toasts, setToasts] = useState([]);

  const pushToast = useCallback((message, type = "info") => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => {
      setToasts((t) => t.filter((toast) => toast.id !== id));
    }, 4000);
  }, []);

  const submitApplication = useCallback((form) => {
    const newApp = {
      id: generateApplicationId(applications),
      studentId: form.studentId,
      studentName: form.studentName,
      department: form.department,
      semester: form.semester,
      section: form.section,
      leaveType: form.leaveType,
      startDate: form.startDate,
      endDate: form.endDate,
      days: form.days,
      reason: form.reason,
      document: form.document || null,
      emergencyContact: form.emergencyContact,
      appliedOn: new Date().toISOString().slice(0, 10),
      status: "pending",
      stage: "teacher",
      history: [
        { stage: "submitted", by: form.studentName, date: new Date().toISOString().slice(0, 10), note: "Application submitted." },
      ],
    };
    setApplications((prev) => [newApp, ...prev]);
    pushToast("Leave application submitted successfully.", "success");
    return newApp;
  }, [applications, pushToast]);

  const cancelApplication = useCallback((id) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id && app.status === "pending"
          ? { ...app, status: "cancelled", stage: "decided" }
          : app
      )
    );
    pushToast("Application cancelled.", "info");
  }, [pushToast]);

  const approveApplication = useCallback((id, actor) => {
    setApplications((prev) =>
      prev.map((app) => {
        if (app.id !== id) return app;
        const nextStage = app.stage === "teacher" ? "hod" : "decided";
        const isFinal = app.stage === "hod" || app.stage === "teacher" && nextStage === "decided";
        return {
          ...app,
          stage: nextStage,
          status: nextStage === "decided" ? "approved" : app.status,
          history: [
            ...app.history,
            {
              stage: app.stage,
              by: actor,
              date: new Date().toISOString().slice(0, 10),
              note: nextStage === "decided" ? "Approved." : "Forwarded to HOD for approval.",
            },
          ],
        };
      })
    );
    pushToast("Leave application approved.", "success");
  }, [pushToast]);

  const rejectApplication = useCallback((id, actor, reasonText) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id
          ? {
              ...app,
              status: "rejected",
              stage: "decided",
              history: [
                ...app.history,
                {
                  stage: app.stage,
                  by: actor,
                  date: new Date().toISOString().slice(0, 10),
                  note: `Rejected: ${reasonText}`,
                },
              ],
            }
          : app
      )
    );
    pushToast("Leave application rejected.", "error");
  }, [pushToast]);

  const requestMoreInfo = useCallback((id, actor, note) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id
          ? {
              ...app,
              history: [
                ...app.history,
                { stage: app.stage, by: actor, date: new Date().toISOString().slice(0, 10), note: `More information requested: ${note}` },
              ],
            }
          : app
      )
    );
    pushToast("Request for more information sent to the student.", "info");
  }, [pushToast]);

  return (
    <LeaveDataContext.Provider
      value={{
        applications,
        submitApplication,
        cancelApplication,
        approveApplication,
        rejectApplication,
        requestMoreInfo,
        toasts,
        pushToast,
      }}
    >
      {children}
    </LeaveDataContext.Provider>
  );
}

export function useLeaveData() {
  const ctx = useContext(LeaveDataContext);
  if (!ctx) throw new Error("useLeaveData must be used within a LeaveDataProvider");
  return ctx;
}
