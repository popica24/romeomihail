import { type FC } from "react";
import { Link } from "react-router-dom";

interface CategoryCardProps {
  text: string;
  link: string;
  image: string;
  delay: number;
}

const CategoryCard: FC<CategoryCardProps> = ({ text, link, image, delay }) => {
  return (
    <div
      className="col-span-1 mb-5 mt-5 md:mt-0 mx-5 md:mx-0"
      data-aos="flip-left"
      data-aos-delay={`${200 * delay}`}
    >
      <div
        className="relative w-full aspect-3/5 bg-center bg-cover group"
        style={{ backgroundImage: `url(${import.meta.env.VITE_APP_URL + image})` }}
      >
        <div className="absolute inset-0 rounded-md bg-black/50 md:rounded-none" />
        <div className="absolute text-2xl font-bold text-center text-white uppercase -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
          <Link
            to={`/albume/${link.toLowerCase()}`}
            className="group-hover:underline group-hover:cursor-pointer"
          >
            {text}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
