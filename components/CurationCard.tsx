import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface CurationCardProps {
  id: string
  title: string
  description: string
  count: number
  tags: string[]
}

export function CurationCard({
  id,
  title,
  description,
  count,
  tags,
}: CurationCardProps) {
  return (
    <Link href={`/lists/${id}`}>
      <Card className="transition-shadow hover:shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-3 text-sm text-slate-600">{description}</p>
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-1">
              {tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            <span className="text-xs text-slate-500">{count}作品</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

