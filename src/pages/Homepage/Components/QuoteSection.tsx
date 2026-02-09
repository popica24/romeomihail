import { type FC } from "react";
//@ts-ignore
import ArrowDownIcon from "../../../assets/svgs/ArrowDown.svg?react";

interface QuoteSectionProps {
  quote: string;
  author: string;
}

const QuoteSection: FC<QuoteSectionProps> = ({ quote, author }) => {
  return (
    <div className="relative z-20 flex flex-col items-center justify-center h-[20vh] bg-[#6F8584] border-red-700 shadow-2xl">
      <div className="relative z-10 text-center">
        <blockquote
          className="mb-2 text-lg font-light italic tracking-wide text-white"
          data-aos="fade-up"
        >
          {quote}
        </blockquote>

        <p
          className="text-xs tracking-widest uppercase text-white/60"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {author}
        </p>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDownIcon className="w-6 h-6 text-white/70" />
      </div>
    </div>
  );
};

export default QuoteSection;
