"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAdmin } from "@/lib/auth";

export default function Dashboard() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState({ category: "", min: "", max: "" });

  useEffect(() => {
    if (!isAdmin()) {
      router.push("/login");
    } else {
      fetchProducts();
    }
  }, []);

  const fetchProducts = async () => {
    const query = new URLSearchParams();
    if (filter.category) query.append("category", filter.category);
    if (filter.min) query.append("minPrice", filter.min);
    if (filter.max) query.append("maxPrice", filter.max);
    const res = await fetch(`http://localhost:5000/api/products?${query.toString()}`);
    setProducts(await res.json());
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Admin Dashboard</h2>
      <div className="mb-4">
        <input
          className="border p-2 mr-2"
          placeholder="Category"
          value={filter.category}
          onChange={(e) => setFilter({ ...filter, category: e.target.value })}
        />
        <input
          className="border p-2 mr-2"
          placeholder="Min Price"
          type="number"
          value={filter.min}
          onChange={(e) => setFilter({ ...filter, min: e.target.value })}
        />
        <input
          className="border p-2 mr-2"
          placeholder="Max Price"
          type="number"
          value={filter.max}
          onChange={(e) => setFilter({ ...filter, max: e.target.value })}
        />
        <button className="bg-green-500 text-white px-3 py-2" onClick={fetchProducts}>
          Filter
        </button>
      </div>
      <ul>
        {products.map((prod) => (
          <li key={prod.id} className="mb-2 border p-2">
            <strong>{prod.name}</strong> - {prod.category} - ${prod.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
