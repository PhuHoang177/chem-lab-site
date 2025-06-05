import Image from "next/image";
import { client } from "@/sanity/client";

type GalleryImage = {
  _id: string;
  title?: string;
  image?: {
    asset?: {
      url: string;
    };
  };
  altText?: string;
};

const IMAGES_QUERY = `*[_type == "galleryImage"]|order(_createdAt desc)[0...2]{
  _id,
  title,
  image{
    asset->{url}
  },
  altText
}`;

const options = { next: { revalidate: 30 } };

export default async function HomePage() {
  // Fetch the latest two gallery images
  const images: GalleryImage[] = await client.fetch(IMAGES_QUERY, {}, options);
  const mainImage = images[0];
  const secondImage = images[1];

  return (
    <main className="w-full min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative w-full h-[420px] md:h-[520px] flex items-center justify-center">
        {mainImage?.image?.asset?.url && (
          <>
            <Image
              src={mainImage.image.asset.url}
              alt={mainImage.altText || mainImage.title || "Main image"}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60" />
          </>
        )}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white text-center drop-shadow-lg">
            {"LOU'S RESEARCH LAB"}
          </h1>
          <p className="mt-4 text-lg md:text-2xl text-white text-center font-medium drop-shadow">
            Advancing Chemistry Through Innovation and Collaboration
          </p>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-semibold text-green-800 mb-4">
          {"Welcome to LOU'S LAB at [Your Institution]"}
        </h2>
        <p className="text-lg text-gray-700 mb-6">
          Explore our research, meet our team, and discover our latest
          publications and news.
        </p>
        {/* Second image below welcome text */}
        {secondImage?.image?.asset?.url && (
          <div className="flex justify-center mt-8">
            <Image
              src={secondImage.image.asset.url}
              alt={secondImage.altText || secondImage.title || "Lab image"}
              width={600}
              height={350}
              className="rounded-lg shadow-lg object-cover"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </div>
        )}
      </section>
    </main>
  );
}
