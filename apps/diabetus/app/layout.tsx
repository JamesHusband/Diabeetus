import './global.css';

export const metadata = {
  title: 'frontend',
  description: 'A NX Monorepo Boilerplate',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
