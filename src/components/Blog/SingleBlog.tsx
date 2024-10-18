import Link from "next/link";
import Image from "next/image";

const SingleBlog = ({ blog }) => {
  if (!blog) {
    return null;
  }

  const { title, slug, date, excerpt, coverImage, author } = blog;
  const imageSrc = coverImage 
    ? `/images/blog/${coverImage}` 
    : "/images/blog/blog-default.jpg";
  const avatarSrc = author?.avatar
    ? `/images/blog/${author.avatar}`
    : "/images/blog/author-default.jpg";

  return (
    <div className="mb-10 w-full">
      <div className="wow fadeInUp relative overflow-hidden rounded-md bg-white shadow-one dark:bg-dark" data-wow-delay=".1s">
        <Link href={`/blog/${slug}`} className="relative block h-[220px] w-full">
          <Image src={imageSrc} alt={title} fill className="object-cover" />
        </Link>
        <div className="p-6 sm:p-8 md:py-8 md:px-6 lg:p-8 xl:py-8 xl:px-5 2xl:p-8">
          <h3>
            <Link href={`/blog/${slug}`} className="mb-4 block text-xl font-bold text-black hover:text-primary dark:text-white dark:hover:text-primary sm:text-2xl">
              {title}
            </Link>
          </h3>
          <p className="mb-6 border-b border-body-color border-opacity-10 pb-6 text-base font-medium text-body-color dark:border-white dark:border-opacity-10">
            {excerpt}
          </p>
          <div className="flex items-center">
            <div className="mr-5 flex items-center border-r border-body-color border-opacity-10 pr-5 dark:border-white dark:border-opacity-10 xl:mr-3 xl:pr-3 2xl:mr-5 2xl:pr-5">
              <div className="mr-4">
                <div className="relative h-10 w-10 overflow-hidden rounded-full">
                  <Image src={avatarSrc} alt={author?.name || "Author"} fill />
                </div>
              </div>
              <div className="w-full">
                <h4 className="mb-1 text-sm font-medium text-dark dark:text-white">
                  {author?.name || "Anonymous"}
                </h4>
              </div>
            </div>
            <div className="inline-block">
              <h4 className="mb-1 text-sm font-medium text-dark dark:text-white">
                {new Date(date).toLocaleDateString()}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;