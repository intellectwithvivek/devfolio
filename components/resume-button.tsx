'use client'

import { Button, useToast } from '@the_viveksingh/vivek-ui'

/**
 * There is no résumé PDF in this template, and pretending otherwise would ship
 * a 404 to anyone who clicks. The button says so instead.
 */
export function ResumeButton({ size = 'lg' }: { size?: 'sm' | 'md' | 'lg' }) {
  const { toast } = useToast()

  return (
    <Button
      variant="outline"
      size={size}
      onClick={() =>
        toast({
          title: 'Demo only',
          description: 'This is a template — drop your own PDF in /public and point this button at it.',
          tone: 'info',
        })
      }
    >
      Download résumé
    </Button>
  )
}
