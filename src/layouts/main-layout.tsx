type Props = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: Props) {
  return (
    <div className="min-h-[100dvh] w-screen bg-black-100 flex justify-center">
      <main className="w-full max-w-[450px] bg-white-100">{children}</main>
    </div>
  );
}
