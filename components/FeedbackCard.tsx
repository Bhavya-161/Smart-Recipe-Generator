interface FeedbackCardProps {
  message: string;
}

export default function FeedbackCard({ message }: FeedbackCardProps) {
  return (
    <div className="feedback-card">
      <p>{message}</p>
    </div>
  );
}


