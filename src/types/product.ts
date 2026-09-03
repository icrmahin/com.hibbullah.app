export type Product = {
  id: string;
  name: string;
  brand: string;
  genericName: string;
  manufacturerId: string;
  categoryId: string;
  description: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  stock: number;
  unit: string;
  image?: string;
  isActive: boolean;
  isFeatured?: boolean;
  batchNumber?: string;
  expiryDate?: string;
  createdAt: string;
};

export type ProductListItem = Product;
