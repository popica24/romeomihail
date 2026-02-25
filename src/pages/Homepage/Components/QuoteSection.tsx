import { type FC } from "react";
//@ts-ignore
import ArrowDownIcon from "../../../assets/svgs/ArrowDown.svg?react";

interface QuoteSectionProps {
  quote: string;
  author: string;
}

const QuoteSection: FC<QuoteSectionProps> = ({ quote, author }) => {
  return (
    <div className="relative flex h-[20vh] flex-col items-center justify-center border-red-700 bg-[#6F8584] shadow-2xl md:absolute md:bottom-20 md:right-0 md:h-[7vh] md:w-100 md:rounded-s-full md:opacity-80 z-20">
      <div className="relative z-10 text-center mb-20 md:mb-0">
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
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 animate-bounce md:left-20 md:top-1/4 md:translate-y-1/3">
        <ArrowDownIcon className="h-6 w-6 text-white/70" />
      </div>
    </div>
  );
};

export default QuoteSection;