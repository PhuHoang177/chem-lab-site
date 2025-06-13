import { client } from "@/sanity/client";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { HeaderType, HEADER_QUERY, MemberType, MEMBER_QUERY } from "@/data";

const options = { next: { revalidate: 30 } };

export default async function MembersPage() {
  const header: HeaderType = await client.fetch(HEADER_QUERY, {
    page: "members",
  });
  const members: MemberType[] = await client.fetch(
    MEMBER_QUERY,
    { page: "members" },
    options
  );

  const MembersClient = (await import("@/app/components/Members")).default;

  return (
    <main className="w-full min-h-screen bg-white">
      {/* Header Section */}
      <section className="relative w-full h-[420px] md:h-[520px] flex items-center justify-center">
        {header?.image?.asset?.url && (
          <div>
            <Image
              src={header.image.asset.url}
              alt={header.title}
              fill
              style={{ objectFit: "cover" }}
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>
        )}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold text-center drop-shadow-lg">
            {header.title}
          </h1>
          {Array.isArray(header?.content) && (
            <div className="mt-4 text-lg md:text-2xl text-white text-center font-medium drop-shadow prose prose-invert max-w-2xl">
              <PortableText value={header.content} />
            </div>
          )}
        </div>
      </section>
      {/* Members Section */}
      <MembersClient members={members} />;
    </main>
  );
}
