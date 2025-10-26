import type { Metadata } from 'next'
import { DiagWizard } from '@/components/diagnose/DiagWizard'

export const metadata: Metadata = {
  title: '物語気質診断',
  description:
    'あなたの性格と物語の好みから、ぴったりの映画を見つける診断です。',
}

export default function DiagnosePage() {
  return <DiagWizard />
}
