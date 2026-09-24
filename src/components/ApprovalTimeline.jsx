import { APPROVAL_TIMELINE_STEPS, STAGE_LABELS } from "../data/mockData";
import { formatDate } from "../utils/helpers";

export default function ApprovalTimeline({ application }) {
  const { stage, status, history } = application;
  const isRejected = status === "rejected";
  const currentIndex = APPROVAL_TIMELINE_STEPS.indexOf(stage);

  return (
    <div className="timeline">
      {APPROVAL_TIMELINE_STEPS.map((step, idx) => {
        const record = history.find((h) => h.stage === step);
        let stateClass = "";
        if (isRejected && idx === currentIndex - 0 && !record) stateClass = "";
        if (record) stateClass = "done";
        if (!record && idx === currentIndex) stateClass = "current";
        if (isRejected && step === "decided") stateClass = "rejected";

        const marker = stateClass === "done" ? "✓" : stateClass === "rejected" ? "✕" : idx + 1;

        return (
          <div className={`timeline-step ${stateClass}`} key={step}>
            <div className="timeline-marker">{marker}</div>
            <div className="timeline-content">
              <div className="timeline-title">{STAGE_LABELS[step]}</div>
              {record ? (
                <>
                  <div className="timeline-meta">{record.by} · {formatDate(record.date)}</div>
                  <div className="timeline-note">{record.note}</div>
                </>
              ) : (
                <div className="timeline-meta">
                  {stateClass === "current" ? "Awaiting action" : "Not yet reached"}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
