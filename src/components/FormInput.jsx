export default function FormInput({
  label,
  required = false,
  error,
  hint,
  fullWidth = false,
  id,
  ...inputProps
}) {
  const fieldId = id || `field-${label?.replace(/\s+/g, "-").toLowerCase()}`;
  return (
    <div className={`form-field ${fullWidth ? "full-width" : ""}`}>
      {label && (
        <label className="form-label" htmlFor={fieldId}>
          {label}
          {required && <span className="required-mark">*</span>}
        </label>
      )}
      <input
        id={fieldId}
        className={`form-input ${error ? "has-error" : ""}`}
        aria-invalid={!!error}
        aria-describedby={error ? `${fieldId}-error` : undefined}
        {...inputProps}
      />
      {error && <span className="form-error-text" id={`${fieldId}-error`}>{error}</span>}
      {!error && hint && <span className="form-hint-text">{hint}</span>}
    </div>
  );
}
