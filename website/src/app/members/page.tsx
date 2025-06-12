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

type headerType = {
  title: string;
  subtitle?: string;
  image?: {
    asset?: {
      url: string;
    };
  };
};

const HEADER_QUERY = `*[_type == "headerType"][0]{
  title,
  subtitle,
  image{
    asset->{url}
  }
}`;

const options = { next: { revalidate: 30 } };

export default async function Members() {
  const images: imageType[] = await client.fetch(IMAGES_QUERY, {}, options);
  const header: headerType = await client.fetch(HEADER_QUERY, {}, options);

  return (
    <section className="container mx-auto max-w-7xl px-4 pb-16 min-h-screen bg-red-100">
      {/* Header Section */}
      <section className="relative w-full h-[420px] md:h-[520px] flex items-center justify-center">
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white text-center drop-shadow-lg">
            {header.title}
          </h1>
          <p className="mt-4 text-lg md:text-2xl text-white text-center font-medium drop-shadow">
            {header.subtitle}
          </p>
        </div>
      </section>
      <ul className="flex flex-wrap justify-center gap-8 py-8">
        {" "}
        {images.map((img: imageType) => (
          <li
            key={img._id}
            className="flex flex-col items-center bg-white shadow-md transform -skew-x-6 overflow-hidden rounded-lg"
          >
            <div className="relative w-64 h-96 skew-x-6">
              <Image
                src={img.image.asset.url}
                alt={img.caption || img.title || "Gallery image"}
                fill
                className="object-cover skew-x-[-6deg]"
              />
            </div>
            <div className="pt-4 text-center">
              <h2 className="text-lg font-semibold">{img.title}</h2>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
