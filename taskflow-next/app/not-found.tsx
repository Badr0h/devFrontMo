import Image from "next/image";

export default function NotFound() {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1 style={{ fontSize: "3rem", color: "#ccc" }}>404</h1>
      <div
        style={{ display: "flex", justifyContent: "center", margin: "2rem 0" }}
      >
        <Image
          src="/next.svg" // Using next.svg as a placeholder since 404.png doesn't exist
          alt="Page not found"
          width={300}
          height={200}
          priority
        />
      </div>
      <p>Cette page n'existe pas</p>
      <a href="/dashboard" style={{ color: "#1B8C3E" }}>
        ← Retour au Dashboard
      </a>
    </div>
  );
}
