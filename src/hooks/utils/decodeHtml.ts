import { Email, HtmlData } from "../../types/type";

export const processingEmail = (email: Email): HtmlData => {
  const baseHtml = email.payload.parts[1].body.data;

  const html = Buffer.from(baseHtml, "base64").toString("utf-8");
  const parser = new DOMParser();

  const doc = parser.parseFromString(html, "text/html");
  const price = doc.querySelector(".price")?.textContent;
  const deliveryLink: HTMLAnchorElement | null = doc.querySelector(
    ".buttonComponentLink"
  );
  const deliveryUrl = deliveryLink?.href;
  const deliveryDate = doc
    .querySelector(".uniqueSpan")
    ?.nextElementSibling?.nextElementSibling?.textContent?.trim()
    .split(" ")[1];

  return {
    price,
    deliveryUrl,
    deliveryDate,
  };
};
