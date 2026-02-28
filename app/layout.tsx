import "./styles/globals.css";

export const metadata = {
  title: "Hotel Booking",
  description: "Simple hotel booking platform",
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
