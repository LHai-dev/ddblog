'use client';
import Drink from '@/components/drink/Drink';
import React from "react";

export default function Page() {
  const products = [
    {
      id: 1,
      name: "Coca-Cola",
      description: "Refreshing soft drink",
      imageUrl: "/nika.png",
      sizes: [
        { size: "Small", price: 10 },
        { size: "Medium", price: 15 },
        { size: "Large", price: 20 }
      ]
    },
    {
      id: 2,
      name: "Pepsi",
      description: "Classic cola taste",
      imageUrl: "/nika.png",
      sizes: [
        { size: "Small", price: 9 },
        { size: "Medium", price: 14 },
        { size: "Large", price: 19 }
      ]
    }
  ];

  return <Drink products={products} />;
}
