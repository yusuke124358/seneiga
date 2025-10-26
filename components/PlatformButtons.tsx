import { Button } from '@/components/ui/button'
import { ExternalLink } from 'lucide-react'

interface PlatformButtonsProps {
  movieId: number
}

export function PlatformButtons({ movieId }: PlatformButtonsProps) {
  // 実際のAPI連携はここで行う（現在はダミーリンク）
  const platforms = [
    { name: 'Netflix', url: '#', available: true },
    { name: 'Prime Video', url: '#', available: true },
    { name: 'U-NEXT', url: '#', available: false },
  ]

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-slate-700">配信サービス</p>
      <div className="flex flex-wrap gap-2">
        {platforms.map((platform) => (
          <Button
            key={platform.name}
            variant={platform.available ? 'default' : 'outline'}
            size="sm"
            disabled={!platform.available}
            className="gap-1"
            asChild={platform.available}
          >
            {platform.available ? (
              <a
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${platform.name}で視聴する`}
              >
                {platform.name}
                <ExternalLink className="h-3 w-3" aria-hidden="true" />
              </a>
            ) : (
              <span>{platform.name}</span>
            )}
          </Button>
        ))}
      </div>
      <p className="text-xs text-slate-500">
        ※ 配信状況は変更される場合があります
      </p>
    </div>
  )
}

