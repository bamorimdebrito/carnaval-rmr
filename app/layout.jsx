export const metadata = {
  title: "Carnaval RMR",
  description: "Programação do Carnaval da Região Metropolitana do Recife",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body style={{ margin: 0 }}>
        {children}
      </body>
    </html>
  );
}
