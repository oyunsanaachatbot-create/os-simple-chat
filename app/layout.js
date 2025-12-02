export const metadata = {
  title: "OS Simple Chat",
  description: "GPT-4.1-mini simple chat"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
