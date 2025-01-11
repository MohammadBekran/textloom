import Header from "@/features/home/components/header";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-10 h-16 p-4 bg-white">
        <Header />
      </div>
      <div className="mt-16">Home Content</div>
    </div>
  );
};

export default Home;
