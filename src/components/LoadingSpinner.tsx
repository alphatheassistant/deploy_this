import { Loader2 } from 'lucide-react';

export function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center w-full py-8">
      <Loader2 className="w-8 h-8 animate-spin text-neutral-500" />
    </div>
  );
}