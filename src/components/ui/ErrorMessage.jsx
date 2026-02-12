import { AlertCircle } from 'lucide-react';

export function ErrorMessage({ message, className }) {
  if (!message) return null;

  return (
    <div
      role="alert"
      className={`flex items-center gap-3 p-4 bg-status-dead/20 border-2 border-status-dead/50 rounded-lg text-white ${className || ''}`}
    >
      <AlertCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
      <p className="font-medium">{message}</p>
    </div>
  );
}
