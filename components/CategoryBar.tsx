import { useEffect, useState } from "react";
import { Category } from "@/app/type/category"; // Adjust the import path if needed

interface CategoryBarProps {
  onCategoryChange: (slug: string | null) => void;
}

export default function CategoryBar({ onCategoryChange }: CategoryBarProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null); // Track selected category

  useEffect(() => {
    // Function to fetch categories from the API
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        const data = await response.json();

        if (response.ok) {
          setCategories(data.categories);
        }
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (slug: string | null) => {
    if (slug !== selectedCategory) {
      setSelectedCategory(slug); // Immediately update the selected category
      onCategoryChange(slug); // Inform the parent component
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto md:px-8">
      <ul className="w-full border-b flex items-center gap-x-3 overflow-x-auto list-none">
        {/* "All" option to show all categories */}
        <li
          className={`py-2 border-b-2 ${
            selectedCategory === null
              ? "border-indigo-600 text-indigo-600"
              : "border-transparent text-gray-500"
          }`}
        >
          <button
            className={`py-2.5 px-4 rounded-lg duration-150 text-sm hover:text-indigo-600 hover:bg-gray-50 active:bg-gray-100 font-medium ${
              selectedCategory === null ? "text-indigo-600" : ""
            }`}
            onClick={() => handleCategoryClick(null)} // Set category to null (for "All")
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
                : "border-transparent text-gray-500"
            }`}
          >
            <button
              className={`py-2.5 px-4 rounded-lg duration-150 text-sm hover:text-indigo-600 hover:bg-gray-50 active:bg-gray-100 font-medium ${
                selectedCategory === category.slug ? "text-indigo-600" : ""
              }`}
              onClick={() => handleCategoryClick(category.slug)} // Set category to selected slug
            >
              {category.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
