import { ImageResponse } from "next/og";
import { contact } from "@/data/contact";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#faf7f2",
          color: "#1c1b19",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#a6774f", letterSpacing: 4 }}>
          ROMANA REALITY
        </div>
        <div style={{ display: "flex", marginTop: 24, fontSize: 64, lineHeight: 1.1, maxWidth: 900 }}>
          {contact.name} – realitní makléřka
        </div>
        <div style={{ display: "flex", marginTop: 28, fontSize: 30, color: "#6f6a61" }}>
          {contact.experienceYears} let zkušeností · {contact.region}
        </div>
      </div>
    ),
    { ...size },
  );
}
