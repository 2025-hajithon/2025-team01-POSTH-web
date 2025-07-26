type Props = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: Props) {
  return (
    <div className="h-screen w-screen bg-black-100 box-border">
      <main className="h-full w-full max-w-[450px] bg-white mx-auto">
        {children}
      </main>
    </div>
  );
}
