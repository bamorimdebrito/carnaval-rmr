"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQNRD-9kuFfNjn1U6VyVL7nAGs3KL766nZxFgefhM3G1I9iM6GHhf_Nnc-KYVs9CaXlbGWWjFPJcvdr/pub?output=csv";

function parseCSV(text) {
  const lines = text.split("\n").slice(1);
  return lines
    .map(l => l.split(","))
    .filter(l => l.length > 3)
    .map(c => ({
      title: c[0],
      city: c[1],
      date: c[2],
      time: c[3],
      location: c[4],
      category: c[5],
      cost: c[6],
      ticket: c[7]
    }));
}

export default function Page() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch(SHEET_URL)
      .then(r => r.text())
      .then(csv => setEvents(parseCSV(csv)));
  }, []);

  return (
    <main style={{ padding: 30, fontFamily: "Arial" }}>
      <h1>🎉 Carnaval RMR</h1>
      <p>Programação da Região Metropolitana do Recife</p>

      <div style={{ marginTop: 30, display: "grid", gap: 16 }}>
        {events.map((e, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              padding: 16,
              border: "1px solid #ddd",
              borderRadius: 10
            }}
          >
            <strong>{e.title}</strong>
            <div>📍 {e.city} — {e.location}</div>
            <div>🗓 {e.date} ⏰ {e.time}</div>
            <div>🎭 {e.category} • {e.cost}</div>

            {e.ticket && (
              <a
                href={e.ticket}
                target="_blank"
                style={{
                  display: "inline-block",
                  marginTop: 8,
                  padding: "6px 10px",
                  background: "#000",
                  color: "#fff",
                  borderRadius: 6
                }}
              >
                Comprar ingresso
              </a>
            )}
          </motion.div>
        ))}
      </div>
    </main>
  );
}
