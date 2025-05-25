import type * as React from "react"
import { ClockIcon } from "lucide-react"

export function Clock({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return <ClockIcon className={className} {...props} />
}
