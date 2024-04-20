export const metadata = {
  title: '점메추',
  description: '점심 메뉴 추천 서비스',
}

export default function RootLayout({ children }) {
 return (
    <html lang="kro">
      <body>{children}</body>
    </html>
  )
}
