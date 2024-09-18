import { useEffect, useState } from "react";
import { Category } from "@/app/type/category"; // Adjust the import path if needed
import CategoryBarSkeleton from "./CategoryBarSkeleton";

interface CategoryBarProps {
  onCategoryChange: (slug: string | null) => void;
}

export default function CategoryBar({ onCategoryChange }: CategoryBarProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null); // Track selected category

  useEffect(() => {
    // Function to fetch categories from the API
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        const data = await response.json();

        // Assuming the data structure is { categories: [...] }
        if (response.ok) {
          setCategories(data.categories);
        } else {
          setError("Failed to fetch categories");
        }
      } catch (err) {
        setError("An error occurred while fetching categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (slug: string | null) => {
    setSelectedCategory(slug);
    onCategoryChange(slug); // Inform the parent component about the selected category
  };

  if (loading) {
    // Placeholder skeletons for loading state
    return (
    <CategoryBarSkeleton/>
    );
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="max-w-screen-xl mx-auto md:px-8">
      <ul className="w-full border-b flex items-center gap-x-3 overflow-x-auto list-none">
        {/* "All" option to show all categories */}
        <li
          className={`py-2 border-b-2 ${
            selectedCategory === null
              ? "border-indigo-600 text-indigo-600"
              : "border-white text-gray-500"
          }`}
          onClick={() => handleCategoryClick(null)}
        >
          <button
            className="py-2.5 px-4 rounded-lg duration-150 text-sm hover:text-indigo-600 hover:bg-gray-50 active:bg-gray-100 font-medium"
          >
            All
          </button>
        </li>

        {/* Render categories from the API */}
        {categories.map((category) => (
          <li
            key={category.id}
            className={`py-2 border-b-2 ${
              selectedCategory === category.slug
                ? "border-indigo-600 text-indigo-600"
                : "border-white text-gray-500"
            }`}
            onClick={() => handleCategoryClick(category.slug)}
          >
            <button
              className="py-2.5 px-4 rounded-lg duration-150 text-sm hover:text-indigo-600 hover:bg-gray-50 active:bg-gray-100 font-medium"
            >
              {category.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
