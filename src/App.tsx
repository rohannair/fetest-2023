import React, { SyntheticEvent, useEffect, useState } from "react";
import { type Item, createItems } from "./fixtures/catalog";
import "./styles/App.css";

// Set up
const items = createItems(20);

export default function App() {
  const [cart, setCart] = useState<number[]>([]);

  const [catalog, setCatalog] = useState<Item[]>(items);

  return (
    <main>
      <div>
        <header>
          <h1>Our Ecommerce Store</h1>
        </header>
        <div className="container">
          <div className="body">
            {catalog.map((item) => (
              <div key={`item-${item.id}`}>
                <img src={item?.image} />
                <h2>{item.name}</h2>
                <h3>
                  {item.price.currency} {item.price.cost}
                </h3>
                <p>{item.description}</p>
                <p>
                  {item.attributes.map((attr) => (
                    <span>{attr}</span>
                  ))}
                </p>

                <button
                  onClick={(e: SyntheticEvent) =>
                    setCart((arr) => [...arr, item.id])
                  }
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
          <div className="cart">
            {cart.length > 0 ? (
              cart.map((id) => {
                const cartItem = catalog.find((i) => i.id === id);
                return (
                  <div key={`cartitem-${id}`}>
                    <img src={cartItem?.image} />
                    {JSON.stringify(cartItem)}
                    <button
                      onClick={(e: SyntheticEvent) =>
                        setCart((arr) => arr.filter((item) => item !== id))
                      }
                    >
                      Remove to Cart
                    </button>
                  </div>
                );
              })
            ) : (
              <div>Empty cart</div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
