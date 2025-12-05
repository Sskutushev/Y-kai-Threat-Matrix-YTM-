import './globals.scss';
import Providers from './providers';

export const metadata = {
  title: 'Yōkai Threat Matrix',
  description: 'Real-time spiritual anomaly monitoring dashboard',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
