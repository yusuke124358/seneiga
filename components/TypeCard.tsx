import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { MovieType } from '@/lib/data/sampleTypes'

interface TypeCardProps {
  type: MovieType
}

export function TypeCard({ type }: TypeCardProps) {
  return (
    <Link href={`/type/${type.code}`}>
      <Card className="transition-shadow hover:shadow-md">
        <CardHeader>
          <div className="mb-2">
            <Badge variant="secondary">{type.code}</Badge>
          </div>
          <CardTitle className="text-xl">{type.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-600">{type.oneLiner}</p>
        </CardContent>
      </Card>
    </Link>
  )
}

