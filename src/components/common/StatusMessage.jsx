// Loading / error / empty states.
//   <StatusMessage variant="loading" />
//   <StatusMessage variant="error" title="…" message="…" onRetry={fn} />
//   <StatusMessage variant="empty" title="…" message="…" />
export default function StatusMessage({ variant = "empty", title, message, onRetry }) {
  if (variant === "loading") {
    return (
      <div className="state" role="status" aria-live="polite">
        <div className="spinner" aria-hidden="true" />
        {message ?? "Loading political intelligence…"}
      </div>
    );
  }
  if (variant === "error") {
    return (
      <div className="state" role="alert">
        <h1>{title ?? "Something went wrong"}</h1>
        <p>{message}</p>
        {onRetry && <button onClick={onRetry}>Retry</button>}
      </div>
    );
  }
  return (
    <div className="empty" role="status">
      <h3>{title ?? "No data"}</h3>
      <p>{message}</p>
    </div>
  );
}
