'use client';
import { RecoveryState } from '@/components/layout/recovery-state';
export default function Error({ reset }: { error: Error; reset: () => void }) {
  return <RecoveryState reset={reset} />;
}
