"use client";

import React, { useState } from "react";

export default function HoverPanelTest() {
  const [openCard, setOpenCard] = useState<number | null>(null);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-10 overflow-auto">
      <div className="flex flex-wrap justify-center gap-x-15 gap-y-30 max-w-screen-xl mx-auto">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(
          (num, idx) => {
            const isLastInRow = (idx + 1) % 4 === 0;

            return (
              <div
                key={num}
                onClick={() => setOpenCard(openCard === num ? null : num)}
                className={`group relative w-64 h-96 overflow-visible cursor-pointer ${openCard === num ? "active" : ""} ${isLastInRow ? "last-card" : ""}`}
              >
                <div
                  className="relative w-full h-full"
                  style={{ perspective: "1000px" }}
                >
                  <div
                    className="relative w-full h-full transition-transform duration-700"
                    style={{
                      transformStyle: "preserve-3d",
                      transform:
                        openCard === num ? "rotateY(180deg)" : "rotateY(0deg)",
                    }}
                  >
                    {/* Front side */}
                    <div
                      className="absolute inset-0 bg-white border border-gray-300 rounded-lg shadow-lg transform -skew-x-6 z-10"
                      style={{ backfaceVisibility: "hidden" }}
                    >
                      <div className="h-full w-full transform skew-x-6 p-4">
                        <h2 className="text-lg font-semibold">
                          Click Me {num}
                        </h2>
                        <p className="text-sm text-gray-500">Card Content</p>
                      </div>
                    </div>

                    {/* Back side */}
                    <div
                      className="absolute inset-0 bg-white text-black border rounded-md shadow-xl transform rotate-y-180 z-20"
                      style={{
                        backfaceVisibility: "hidden",
                        borderColor: "rgba(38,168,44,1.00)",
                        borderWidth: "1px",
                      }}
                    >
                      <div className="h-full w-full p-4">
                        <h3 className="font-semibold text-md mb-2">
                          Panel {num}
                        </h3>
                        <p className="text-sm">
                          This panel appears on click and overlays the card
                          directly.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          }
        )}
      </div>
    </main>
  );
}
