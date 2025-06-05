import Image from "next/image";
import { client } from "@/sanity/client";

type imageType = {
  _id: string;
  title: string;
  caption?: string;
  image: {
    asset: {
      url: string;
    };
  };
};

const IMAGES_QUERY = `*[_type == "imageType"]|order(_createdAt desc)[0...12]{
  _id,
  title,
  caption,
  image{
    asset->{url}
  },
}`;

const options = { next: { revalidate: 30 } };

export default async function Members() {
  // Default: show gallery images
  const images: imageType[] = await client.fetch(IMAGES_QUERY, {}, options);

  return (
    <section className="container mx-auto max-w-7xl px-4 pb-16 min-h-screen bg-red-100">
      <h1 className="text-6xl font-extrabold text-center tracking-tight mb-4 text-black py-16 ">
        {"LAB'S MEMBERS"}
      </h1>
      <ul className="grid gap-8 md:grid-cols-3">
        {images.map((img: imageType) => (
          <li
            key={img._id}
            className="bg-gray-50 rounded-lg shadow hover:shadow-lg transition-shadow duration-200 overflow-hidden flex flex-col w-full"
          >
            {img.image?.asset?.url && (
              <div className="relative w-full h-64">
                <Image
                  src={img.image.asset.url}
                  alt={img.caption || img.title || "Gallery image"}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="p-4 text-center">
              <h2 className="text-lg font-semibold">{img.title}</h2>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
