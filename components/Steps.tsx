import { Card, CardContent } from '@/components/ui/card'
import { copy } from '@/lib/copy'

export function Steps() {
  return (
    <section className="py-16 md:py-24">
      <div className="container px-4">
        <h2 className="mb-12 text-center text-3xl font-bold text-slate-900 sm:text-4xl">
          {copy.steps.title}
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {copy.steps.items.map((step) => (
            <Card key={step.number}>
              <CardContent className="pt-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-xl font-bold text-white">
                  {step.number}
                </div>
                <h3 className="mb-2 text-xl font-semibold text-slate-900">
                  {step.title}
                </h3>
                <p className="text-slate-600">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

