import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check } from 'lucide-react'

interface PlanCardProps {
  name: string
  price: string
  period: string
  features: string[]
  recommended?: boolean
}

export function PlanCard({
  name,
  price,
  period,
  features,
  recommended,
}: PlanCardProps) {
  return (
    <Card className={recommended ? 'border-slate-900 shadow-lg' : ''}>
      <CardHeader>
        {recommended && <Badge className="mb-2 w-fit">おすすめ</Badge>}
        <CardTitle className="text-2xl">{name}</CardTitle>
        <div className="mt-4">
          <span className="text-4xl font-bold text-slate-900">{price}</span>
          <span className="text-slate-600">/{period}</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <Check
                className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600"
                aria-hidden="true"
              />
              <span className="text-sm text-slate-700">{feature}</span>
            </li>
          ))}
        </ul>
        <Button
          className="w-full"
          variant={recommended ? 'default' : 'outline'}
        >
          プランを選択
        </Button>
      </CardContent>
    </Card>
  )
}

