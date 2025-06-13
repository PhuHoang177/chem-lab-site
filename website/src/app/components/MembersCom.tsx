"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MemberType } from "@/data";
import { PortableText } from "next-sanity";
import { Typography, Box } from "@mui/material";

interface Props {
  members: MemberType[];
}

export default function MembersCom({ members }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const isPanelOpen = openIndex !== null;

  return (
    <Box
      sx={{
        p: 4,
        display: "flex",
        flexWrap: "wrap",
        rowGap: 6,
        columnGap: 6,
        justifyContent: "center",
        "&:hover": {
          boxShadow: "0 0 20px rgba(14, 14, 14, 0.2)",
          borderRadius: 2,
        },
      }}
    >
      {members.map((member, index) => (
        <Box
          key={member.order}
          sx={{
            width: 260,
            position: "relative",
            cursor: "pointer",
            opacity: isPanelOpen && openIndex !== index ? 0.3 : 1,
            pointerEvents: isPanelOpen && openIndex !== index ? "none" : "auto",
            transition: "opacity 0.3s ease",
          }}
          onClick={() => setOpenIndex(openIndex === index ? null : index)}
        >
          {/* Card */}
          <Box
            sx={{
              height: { xs: 320, sm: 360, md: 400 },
              bgcolor: "white",
              border: "1px solid #ccc",
              borderRadius: 2,
              boxShadow: 3,
              overflow: "hidden",
              transition: "transform 0.4s, box-shadow 0.4s",
              "&:hover": {
                transform: "translateY(-10px)",
                boxShadow: "0 0 15px rgba(38, 168, 44, 0.4)",
              },
            }}
          >
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: { xs: "70%", sm: "75%", md: "80%" },
              }}
            >
              {member.image?.asset?.url && (
                <Image
                  src={member.image.asset.url}
                  alt={member.title}
                  fill
                  style={{ objectFit: "cover" }}
                />
              )}
            </Box>
            <Box
              sx={{
                p: 2,
              }}
            >
              <Typography variant="h6">{member.title}</Typography>
            </Box>
          </Box>

          {/* Panel */}
          {openIndex === index && (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: {
                  xs: 0,
                  sm: index % 4 === 3 ? "auto" : "calc(100% + 16px)",
                },
                right: {
                  xs: 0,
                  sm: index % 4 === 3 ? "calc(100% + 16px)" : "auto",
                },
                width: { xs: "100%", sm: 360, md: 400 },
                minHeight: { xs: 300, sm: 360, md: 400 },
                maxWidth: "90vw",
                bgcolor: "white",
                border: "1px solid rgba(38,168,44,1.00)",
                borderRadius: 2,
                boxShadow: 6,
                p: 3,
                zIndex: 10,
              }}
            >
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                About {member.title}
              </Typography>
              <PortableText value={member.content || []} />{" "}
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
}
