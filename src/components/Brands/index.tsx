import { Brand } from "@/types/brand";
import Image from "next/image";
import brandsData from "./brandsData";

const Brands = () => {
  return (
    <section className="pt-16">
      <div className="container">
        <div className="flex flex-wrap items-center justify-center rounded-sm bg-gray-light px-4 py-8 dark:bg-gray-dark sm:px-6 md:px-[30px] md:py-[30px] xl:p-[40px]">
          {brandsData.map((brand) => (
            <SingleBrand key={brand.id} brand={brand} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Brands;


const SingleBrand = ({ brand }: { brand: Brand }) => {
  const { href, image, imageLight, name } = brand;

  return (
    <div className="flex items-center justify-center p-2 sm:p-3 md:p-4 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6">
      <a
        href={href}
        target="_blank"
        rel="nofollow noreferrer"
        className="relative w-full h-12 md:h-16 opacity-70 transition hover:opacity-100 dark:opacity-60 dark:hover:opacity-100"
      >
        <Image 
          src={imageLight} 
          alt={name} 
          fill 
          style={{ objectFit: 'contain', objectPosition: 'center' }} 
          className="hidden dark:block"
        />
        <Image 
          src={image} 
          alt={name} 
          fill 
          style={{ objectFit: 'contain', objectPosition: 'center' }} 
          className="block dark:hidden"
        />
      </a>
    </div>
  );
};
