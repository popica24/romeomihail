import { type FC } from "react";
import CategoryCard from "./CategoryCard";

interface Category {
  text: string;
  link: string;
  image: string;
}

interface CategoriesGridProps {
  categories: Category[];
}

const CategoriesGrid: FC<CategoriesGridProps> = ({ categories }) => {
  return (
    <div
      className="container gap-x-5 mx-auto md:mt-5 md:grid md:grid-cols-3"
      id="categorii"
    >
      {categories.map((category, index) => (
        <CategoryCard
          key={category.link}
          text={category.text}
          link={category.link}
          image={category.image}
          delay={index + 1}
        />
      ))}
    </div>
  );
};

export default CategoriesGrid;
