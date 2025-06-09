import React from "react";
import Image from "next/image";
import { client } from "@/sanity/client";
import { PortableText } from "@portabletext/react";
import Button from "@mui/material/Button";

type Social = {
  label: string;
  link: string;
  icon?: { asset?: { url: string } };
};

type FooterType = {
  title: string;
  info?: any;
  socials?: Social[];
  universityDescription?: string;
  universityLogo?: { asset?: { url: string } };
  universityLogoLink?: string;
};

const FOOTER_QUERY = `*[_type == "footerType"][0]{
  title,
  info,
  socials[]{
    label,
    link,
    icon{
      asset->{url}
    }
  },
  universityDescription,
  universityLogo{
    asset->{url}
  },
  universityLogoLink,
}`;

export default async function Footer() {
  const footer: FooterType = await client.fetch(FOOTER_QUERY);

  return (
    <footer className="w-full bg-[rgba(38,168,44,0.85)] text-white border-t border-green-700 py-4 mt-10">
      <div className="container w-full mx-auto px-4 grid grid-cols-1 md:grid-cols-3 items-center gap-2">
        {/* Left: Info */}
        <div className="text-left w-full">
          <div className="font-bold text-black text-lg mb-2">
            {footer?.title}
          </div>
          {footer?.info && (
            <div className="prose prose-invert text-xs text-white space-y-0 leading-none">
              <PortableText value={footer.info} />
            </div>
          )}
        </div>
        {/* Center: Social icons */}
        <div className="flex justify-center w-full">
          <ul className="flex space-x-4">
            {footer?.socials?.map((icon) =>
              icon.icon?.asset?.url ? (
                <li key={icon.label}>
                  <Button
                    component="a"
                    href={icon.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={icon.label}
                    sx={{
                      p: 0,
                      minWidth: 0,
                      borderRadius: 1,
                      background: "none",
                      transition: "transform 0.3s",
                      "&:hover": {
                        background: "none",
                        boxShadow: "none",
                        transform: "scale(1.2)",
                      },
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 48,
                      height: 48,
                    }}
                  >
                    <Image
                      src={icon.icon.asset.url}
                      alt={icon.label}
                      width={40}
                      height={40}
                      className="object-contain"
                      style={{ borderRadius: 8 }}
                    />
                  </Button>
                </li>
              ) : null
            )}
          </ul>
        </div>
        {/* Right: University Logo */}
        <div className="flex flex-col items-end justify-center w-full space-y-1 pr-4">
          {footer.universityLogo?.asset?.url && (
            <div>
              <span className="text-xs text-white mb-px">
                {footer?.universityDescription || "Associated with"}
              </span>
              <Button
                component="a"
                href={footer.universityLogoLink || "#"}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  p: 0,
                  minWidth: 0,
                  borderRadius: 1,
                  background: "none",
                  transition: "transform 0.2s",
                  "&:hover": {
                    background: "none",
                    boxShadow: "none",
                    transform: "scale(1.1)",
                  },
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 48,
                  height: 48,
                  mr: 0, // Remove any right margin from the button
                }}
              >
                <Image
                  src={footer.universityLogo.asset.url}
                  alt="University Logo"
                  width={150}
                  height={75}
                  className="h-28 w-auto mt-0"
                  style={{ maxWidth: 180, height: "auto" }}
                  priority
                />
              </Button>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
