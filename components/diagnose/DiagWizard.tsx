'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Progress } from '@/components/ui/progress'
import { Step1Welcome } from './Step1Welcome'
import { Step2Profile } from './Step2Profile'
import { Step3Subscriptions } from './Step3Subscriptions'
import { Step4Preferences } from './Step4Preferences'
import { Step5Ratings } from './Step5Ratings'
import { Step6Mood } from './Step6Mood'
import { Step7Complete } from './Step7Complete'

const TOTAL_STEPS = 7

export function DiagWizard() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // ステート
  const [gender, setGender] = useState('')
  const [ageRange, setAgeRange] = useState('')
  const [subscriptions, setSubscriptions] = useState<string[]>([])
  const [preferences, setPreferences] = useState<Record<string, number>>({})
  const [ratings, setRatings] = useState<Record<number, number>>({})
  const [mood, setMood] = useState('')

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1)
      window.scrollTo(0, 0)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo(0, 0)
    }
  }

  const handleSkip = () => {
    handleNext()
  }

  const handlePreferenceChange = (questionId: string, value: number) => {
    setPreferences((prev) => ({
      ...prev,
      [questionId]: value,
    }))
  }

  const handleRatingChange = (titleId: number, rating: number) => {
    setRatings((prev) => ({
      ...prev,
      [titleId]: rating,
    }))
  }

  const handleSubmitAndViewResults = async () => {
    setIsSubmitting(true)

    // セッションIDを生成（匿名ユーザー用）
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    try {
      // 1. Demographics
      if (gender || ageRange) {
        await fetch('/api/diagnose/submit-demographics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId, gender, ageRange }),
        })
      }

      // 2. Subscriptions
      if (subscriptions.length > 0) {
        await fetch('/api/diagnose/submit-subscriptions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId, subscriptions }),
        })
      }

      // 3. Preferences (persona_vec初期化)
      await fetch('/api/diagnose/submit-preferences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, preferences }),
      })

      // 4. Ratings (評価履歴 + persona_vec更新)
      if (Object.keys(ratings).length > 0) {
        await fetch('/api/diagnose/submit-ratings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId, ratings }),
        })
      }

      // 5. Mood
      await fetch('/api/diagnose/submit-mood', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, mood }),
      })

      // ダミー遅延（実際のAPI呼び出しをシミュレート）
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // ローカルストレージに保存（Supabase接続前の代替）
      localStorage.setItem(
        'diagnose_data',
        JSON.stringify({
          sessionId,
          gender,
          ageRange,
          subscriptions,
          preferences,
          ratings,
          mood,
          completedAt: new Date().toISOString(),
        })
      )

      // 結果ページへ遷移
      router.push(`/result?session=${sessionId}`)
    } catch (error) {
      console.error('診断データの送信に失敗しました:', error)
      setIsSubmitting(false)
      // エラーハンドリング（将来実装）
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1Welcome onNext={handleNext} />
      case 2:
        return (
          <Step2Profile
            gender={gender}
            ageRange={ageRange}
            onGenderChange={setGender}
            onAgeRangeChange={setAgeRange}
            onNext={handleNext}
            onSkip={handleSkip}
          />
        )
      case 3:
        return (
          <Step3Subscriptions
            subscriptions={subscriptions}
            onSubscriptionsChange={setSubscriptions}
            onNext={handleNext}
            onSkip={handleSkip}
          />
        )
      case 4:
        return (
          <Step4Preferences
            preferences={preferences}
            onPreferenceChange={handlePreferenceChange}
            onNext={handleNext}
            onBack={handleBack}
          />
        )
      case 5:
        return (
          <Step5Ratings
            ratings={ratings}
            onRatingChange={handleRatingChange}
            onNext={handleNext}
            onBack={handleBack}
          />
        )
      case 6:
        return (
          <Step6Mood
            mood={mood}
            onMoodChange={setMood}
            onNext={handleNext}
            onBack={handleBack}
          />
        )
      case 7:
        return (
          <Step7Complete
            isSubmitting={isSubmitting}
            onViewResults={handleSubmitAndViewResults}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      {/* 進捗バー */}
      {currentStep > 1 && currentStep < TOTAL_STEPS && (
        <div className="container mb-8 px-4">
          <div className="mx-auto max-w-2xl">
            <div className="mb-2 flex items-center justify-between text-sm text-slate-600">
              <span>Step {currentStep - 1} / {TOTAL_STEPS - 2}</span>
              <span>{Math.round(((currentStep - 1) / (TOTAL_STEPS - 1)) * 100)}%</span>
            </div>
            <Progress 
              value={currentStep - 1} 
              max={TOTAL_STEPS - 1}
              aria-label={`診断の進捗: ${currentStep - 1}ステップ目、全体の${Math.round(((currentStep - 1) / (TOTAL_STEPS - 1)) * 100)}%完了`}
            />
          </div>
        </div>
      )}

      {/* ステップコンテンツ */}
      <div className="container px-4">{renderStep()}</div>
    </div>
  )
}


