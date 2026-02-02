function parseCSV(text) {
  const lines = text
    .replace(/\r/g, "")
    .split("\n")
    .filter(Boolean);

  const headers = lines[0].split(",").map(h => h.trim());

  return lines.slice(1).map((line) => {
    const values = line.split(",").map(v => v.replace(/^"|"$/g, "").trim());

    const obj = {};
    headers.forEach((h, i) => {
      obj[h] = values[i] || "";
    });

    return obj;
  });
}
