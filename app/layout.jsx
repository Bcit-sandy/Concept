import "./globals.css";

export const metadata = {
  title: "Concept Generator",
  description: "Structured concept generation for early-stage product design."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

