import Image from "next/image";
import { client } from "@/sanity/client";
import { PortableText } from "@portabletext/react";
import type { TypedObject } from "@portabletext/types";

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

type postType = {
  _id: string;
  title: string;
  body: TypedObject[];
  image?: {
    asset?: {
      url: string;
    };
  };
};

const POST_QUERY = `*[_type == "postType"] | order(publishedAt desc) {
  _id,
  title,
  body,
  image{
    asset->{url}
  }
}`;

const options = { next: { revalidate: 30 } };

export default async function HomePage() {
  const cards: cardType[] = await client.fetch(CARDS_QUERY, {}, options);
  const header: headerType = await client.fetch(HEADER_QUERY, {}, options);
  const posts: postType[] = await client.fetch(POST_QUERY, {}, options);

  return (
    <main className="w-full min-h-screen bg-white">
      {/* Header Section */}
      <section className="relative w-full h-[420px] md:h-[520px] flex items-center justify-center">
        {header?.image?.asset?.url && (
          <>
            <Image
              src={header.image.asset.url}
              alt={header.title}
              fill
              style={{ objectFit: "cover" }}
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/60" />
          </>
        )}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white text-center drop-shadow-lg">
            {header.title}
          </h1>
          <p className="mt-4 text-lg md:text-2xl text-white text-center font-medium drop-shadow">
            {header.subtitle}
          </p>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="max-w-8xl mx-auto px-4 py-12 text-center">
        <div className="space-y-12">
          {posts.map((post) => (
            <div key={post._id} className="mb-8 flex flex-col items-center">
              <h1 className="text-2xl font-semibold text-green-800 mb-4">
                {post.title}
              </h1>
              {(post.image?.asset?.url || post.body) && (
                <div className="w-[85%]">
                  {post.image?.asset?.url && (
                    <div className="flex justify-center mt-4">
                      <Image
                        src={post.image.asset.url}
                        alt={post.title}
                        width={800}
                        height={400}
                        className="rounded-lg shadow-lg object-cover w-full h-auto"
                      />
                    </div>
                  )}
                  <div className="prose mt-6 mb-3 mx-auto text-lg max-w-none">
                    <PortableText value={post.body} />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
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
