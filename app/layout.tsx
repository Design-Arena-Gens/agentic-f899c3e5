import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Digital Fraud Research Automation',
  description: 'Automated system to research digital frauds in India and create awareness posts',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  )
}
