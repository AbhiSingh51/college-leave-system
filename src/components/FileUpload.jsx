import { useRef, useState } from "react";

export default function FileUpload({ label = "Supporting Document", onFileSelect, hint = "PDF, JPG or PNG up to 5MB" }) {
  const inputRef = useRef(null);
  const [fileName, setFileName] = useState(null);

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      onFileSelect?.(file.name);
    }
  };

  return (
    <div className="form-field full-width">
      <label className="form-label">{label}</label>
      <div className="file-drop" onClick={() => inputRef.current?.click()} role="button" tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}>
        {fileName ? `Selected: ${fileName}` : "Click to choose a file, or drag it here"}
      </div>
      <input ref={inputRef} type="file" style={{ display: "none" }} onChange={handleChange} accept=".pdf,.jpg,.jpeg,.png" />
      <span className="form-hint-text">{hint}</span>
      {fileName && (
        <div className="file-chip">
          📄 {fileName}
          <button
            type="button"
            className="btn-link"
            onClick={() => { setFileName(null); onFileSelect?.(null); }}
            aria-label="Remove file"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
