export default function DateInput({ label, required = false, error, fullWidth = false, id, ...inputProps }) {
  const fieldId = id || `field-${label?.replace(/\s+/g, "-").toLowerCase()}`;
  return (
    <div className={`form-field ${fullWidth ? "full-width" : ""}`}>
      {label && (
        <label className="form-label" htmlFor={fieldId}>
          {label}
          {required && <span className="required-mark">*</span>}
        </label>
      )}
      <input id={fieldId} type="date" className={`form-input ${error ? "has-error" : ""}`} aria-invalid={!!error} {...inputProps} />
      {error && <span className="form-error-text">{error}</span>}
    </div>
  );
}
