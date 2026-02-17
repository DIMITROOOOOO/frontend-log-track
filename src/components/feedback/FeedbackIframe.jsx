export default function FeedbackIframe({ src }) {
  if (!src) {
    return <p className="empty-state">No feedback source provided.</p>;
  }

  return (
    <div className="feedback-iframe">
      <iframe title="Feedback" src={src} loading="lazy" />
    </div>
  );
}
