import axios from "axios";
import googleIt from "google-it";
import * as cheerio from "cheerio";
import OpenAI from "openai";

const LARAVEL_API = "http://localhost:8000/api/articles";
const OPENAI_KEY = process.env.OPENAI_API_KEY;

async function fetchLatestArticle() {
  console.log("Fetching latest article...");
  const res = await axios.get(LARAVEL_API);
  if (!res.data || res.data.length === 0) {
    throw new Error("No articles found in Laravel API.");
  }
  return res.data[res.data.length - 1];
}

async function searchGoogle(title) {
  console.log("Searching Google...");
  try {
    const results = await googleIt({ query: title, limit: 5 });
    return results.slice(0, 2);
  } catch {
    return [];
  }
}

async function scrapeContent(url) {
  try {
    const html = await axios.get(url, { timeout: 10000 });
    const $ = cheerio.load(html.data);
    const text = $("article").text().trim();
    return text.slice(0, 3000);
  } catch {
    return "";
  }
}

async function rewriteArticle(original, ref1, ref2) {
  console.log("Rewriting article using OpenAI...");

  const client = new OpenAI({ apiKey: OPENAI_KEY });

  const prompt = `
You are a professional content editor.

Rewrite the article below with better structure, clarity, and readability.
Do NOT change the meaning.

Original Article:
${original}

Reference 1:
${ref1 || "N/A"}

Reference 2:
${ref2 || "N/A"}
`;

  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }]
  });

  return completion.choices[0].message.content;
}

async function publishArticle(title, content) {
  console.log("Publishing updated article...");
  await axios.post(LARAVEL_API, {
    title: title + " (Updated)",
    content,
    source_url: "generated",
  });
}

async function main() {
  try {
    const article = await fetchLatestArticle();
    const searchResults = await searchGoogle(article.title);

    let ref1 = article.content;
    let ref2 = article.content;

    if (searchResults.length >= 1) {
      ref1 = await scrapeContent(searchResults[0].link);
    }
    if (searchResults.length >= 2) {
      ref2 = await scrapeContent(searchResults[1].link);
    }

    const newContent = await rewriteArticle(article.content, ref1, ref2);
    await publishArticle(article.title, newContent);

    console.log("✅ Article updated and published successfully.");
  } catch (err) {
    console.error("❌ Phase-2 failed:", err.message);
  }
}

main();


// import axios from "axios";
// import googleIt from "google-it";
// import cheerio from "cheerio";
// import OpenAI from "openai";

// const LARAVEL_API = "http://localhost:8000/api/articles";
// const OPENAI_KEY = process.env.OPENAI_API_KEY;

// async function fetchLatestArticle() {
//   const res = await axios.get(LARAVEL_API);
//   return res.data[0];
// }

// async function searchGoogle(title) {
//   const results = await googleIt({ query: title, limit: 5 });
//   return results.slice(0, 2);
// }

// async function scrapeContent(url) {
//   const html = await axios.get(url);
//   const $ = cheerio.load(html.data);
//   return $("article").text().trim().slice(0, 3000);
// }

// async function rewriteArticle(original, ref1, ref2) {
//   const client = new OpenAI({ apiKey: OPENAI_KEY });

//   const prompt = `
// You are a professional content editor.

// Rewrite the article below by improving structure, readability,
// and formatting. Keep meaning intact.

// Original Article:
// ${original}

// Reference Style 1:
// ${ref1}

// Reference Style 2:
// ${ref2}

// At the end, add a "References" section citing both URLs.
// `;

//   const completion = await client.chat.completions.create({
//     model: "gpt-4o-mini",
//     messages: [{ role: "user", content: prompt }]
//   });

//   return completion.choices[0].message.content;
// }

// async function publishArticle(title, content) {
//   await axios.post(LARAVEL_API, {
//     title: title + " (Updated)",
//     content,
//     source_url: "generated",
//     type: "generated"
//   });
// }

// async function main() {
//   const article = await fetchLatestArticle();
//   const searchResults = await searchGoogle(article.title);

//   const ref1 = await scrapeContent(searchResults[0].link);
//   const ref2 = await scrapeContent(searchResults[1].link);

//   const newContent = await rewriteArticle(article.content, ref1, ref2);

//   await publishArticle(article.title, newContent);
//   console.log("Article updated and published successfully.");
// }

// main();
