export default function FeedbackList({ feedback = [] }) {
  if (feedback.length === 0) {
    return <p className="empty-state">No feedback yet.</p>;
  }

  return (
    <ul className="feedback-list">
      {feedback.map((item) => (
        <li key={item.id || item.date}>
          <strong>{item.author || "Anonymous"}</strong>
          <p>{item.message}</p>
        </li>
      ))}
    </ul>
  );
}
