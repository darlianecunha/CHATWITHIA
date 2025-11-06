export const metadata = { title: "AI Media Studio" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body style={{ fontFamily: "Inter, system-ui, Arial, sans-serif" }}>{children}</body>
    </html>
  );
}
