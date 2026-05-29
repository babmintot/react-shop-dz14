// src/types.ts
export interface Product {
  id: string;           // ← changed: number → string
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
}