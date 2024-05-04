import "./globals.css";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div>
        {children}
        </div>
      <div id='modal-root' className=""></div>
      </body>
    </html>
  );
}
