export default function SelectInput({
  label,
  required = false,
  error,
  options = [],
  placeholder = "Select…",
  fullWidth = false,
  id,
  ...selectProps
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
      <select id={fieldId} className={`form-select ${error ? "has-error" : ""}`} aria-invalid={!!error} {...selectProps}>
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      {error && <span className="form-error-text">{error}</span>}
    </div>
  );
}
