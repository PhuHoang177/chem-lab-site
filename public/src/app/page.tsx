import Image from "next/image";
import { client } from "@/sanity/client";

type imageType = {
  _id: string;
  title: string;
  caption?: string;
  image?: {
    asset?: {
      url: string;
    };
  };
};

const IMAGES_QUERY = `*[_type == "imageType"]|order(_createdAt desc)[0...2]{
  _id,
  title,
  caption,
  image{
    asset->{url}
  },
}`;

type cardType = {
  _id: string;
  title: string;
  description: string;
  icon: {
    asset?: {
      url: string;
    };
  };
  link?: string;
  linkLabel?: string;
};

const CARDS_QUERY = `*[_type == "cardType"]|order(_createdAt asc){
  _id,
  title,
  description,
  icon{
    asset->{url}
  },
  link,
  linkLabel
}`;

const options = { next: { revalidate: 30 } };

export default async function HomePage() {
  const images: imageType[] = await client.fetch(IMAGES_QUERY, {}, options);
  const cards: cardType[] = await client.fetch(CARDS_QUERY, {}, options);

  console.log(cards); // Add this after fetching cards

  return (
    <main className="w-full min-h-screen bg-white">
      {/* Header Section */}
      <section className="relative w-full h-[420px] md:h-[520px] flex items-center justify-center">
        {images[0]?.image?.asset?.url && (
          <>
            <Image
              src={images[0].image.asset.url}
              alt={images[0].caption || images[0].title}
              fill
              style={{ objectFit: "cover" }}
              className="object-cover"
              priority
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
      <section className="max-w-8xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-semibold text-green-800 mb-4">
          {"Welcome to LOU'S LAB at [Your Institution]"}
        </h2>
        <p className="text-lg text-gray-700 mb-6">
          Explore our research, meet our team, and discover our latest
          publications and news.
        </p>
        {/* Wel image */}
        {images[1]?.image?.asset?.url && (
          <div className="flex justify-center mt-8">
            <Image
              src={images[1].image.asset.url}
              alt={images[1].caption || images[1].title}
              width={1598}
              height={954}
              className="rounded-lg shadow-lg object-cover w-[90%] h-auto"
            />
          </div>
        )}
      </section>

      {/* Info Cards Section */}
      <section className="w-full border-t border-gray-200 bg-white py-12">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card) => (
            <div
              key={card._id}
              className="flex flex-col items-center text-center px-4"
            >
              {card.icon?.asset?.url && (
                <Image
                  src={card.icon.asset.url || "/placeholder.png"}
                  alt={card.title || "Card icon"}
                  width={100}
                  height={100}
                  style={{ maxWidth: "30%", height: "auto" }}
                  className="mb-4"
                  priority
                />
              )}
              <h3 className="mt-2 text-2xl font-bold text-gray-800">
                {card.title}
              </h3>
              <p className="mt-4 text-gray-700">{card.description}</p>
              <a
                href={card.link || "#"}
                className="mt-4 text-blue-700 font-medium flex items-center justify-center gap-1 hover:text-blue-900"
              >
                <span className="underline">
                  {card.linkLabel || "Learn more"}
                </span>
                <span className="ml-1 text-orange-500 no-underline">
                  &#9654;
                </span>
              </a>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
