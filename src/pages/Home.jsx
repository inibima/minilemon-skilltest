// src/pages/Home.jsx
export default function Home() {
  return (
    <section className="container mx-auto px-4 py-20 text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to BocahLemon</h1>
      <p className="mb-6">A simple front-end app showcasing free public APIs for products/items.</p>
      <a href="/products" className="bg-yellow-500 text-white px-6 py-3 rounded-lg">Explore Products</a>
    </section>
  );
}
