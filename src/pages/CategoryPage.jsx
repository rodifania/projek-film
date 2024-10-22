import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          'https://api.themoviedb.org/3/genre/movie/list?api_key=YOUR_API_KEY'
        );
        setCategories(response.data.genres);
      } catch (err) {
        setError('Error fetching categories');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="category-container">
      <h1 className="text-center text-2xl font-bold">Kategori Film</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5">
        {categories.map((category) => (
          <Link key={category.id} to={`/category/${category.id}`}>
            <div className="category-card p-4 bg-gray-800 text-white rounded-lg shadow-lg">
              <h2 className="text-lg font-semibold">{category.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
