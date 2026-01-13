import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

function Home() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-4">jewellery-inventory-manager</h1>
      <p className="text-gray-600">A web application to manage inventory for a jewellery business</p>
    </main>
  );
}

export default App;
