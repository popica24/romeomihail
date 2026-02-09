import { type FC } from "react";

interface FooterSectionProps {
  title: string;
  description: string;
  zones: string;
  services: string;
}

const FooterSection: FC<FooterSectionProps> = ({
  title,
  description,
  zones,
  services,
}) => {
  return (
    <div className="p-4 mb-4 bg-gray-50">
      <div className="flex flex-col items-center justify-center max-w-2xl mx-auto text-center">
        <h1 className="mb-6 text-2xl font-light text-[#6F8584] md:text-3xl">
          {title}
        </h1>

        <p className="px-4 mb-8 text-sm leading-relaxed text-gray-600 md:text-base">
          {description}
        </p>

        <div className="mb-8 text-sm text-gray-600">
          <p className="mb-2">
            <strong>Zone acoperite:</strong> {zones}
          </p>
          <p>
            <strong>Servicii:</strong> {services}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FooterSection;
