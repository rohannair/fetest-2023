import { faker } from "@faker-js/faker";

const baseImgSize = 64;

export type Item = {
  id: number;
  image?: string;
  name: string;
  price: {
    cost: number;
    currency: "USD" | "CAD" | "EUR";
  };
  description?: string;
  attributes: string[];
};

function getRandomCurrencyCode() {
  const currencies = ["USD", "CAD", "EUR"] as const;
  const randomIndex = Math.floor(Math.random() * currencies.length);
  return currencies[randomIndex];
}

export const createItems = (n: number) => {
  let catalog: Item[] = [];
  for (let i = 0; i < n; i++) {
    const item = {
      id: i,
      name: faker.commerce.productName(),
      image: faker.image.url({
        width: baseImgSize * 2,
        height: baseImgSize,
      }),
      description: faker.commerce.productDescription(),
      attributes: [
        faker.commerce.productMaterial(),
        faker.commerce.productMaterial(),
      ],
      price: {
        cost: parseFloat(faker.commerce.price()),
        currency: getRandomCurrencyCode(),
      },
    } satisfies Item;

    catalog.push(item);
  }
  return catalog;
};
