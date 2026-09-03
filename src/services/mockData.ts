import type { AuditEntry } from "../types/audit";
import type { CartItem } from "../types/cart";
import type { Category } from "../types/category";
import type { DeliveryCycle } from "../types/deliveryCycle";
import type { InventoryItem, StockAdjustment } from "../types/inventory";
import type { Manufacturer } from "../types/manufacturer";
import type { NotificationItem } from "../types/notification";
import type { Order } from "../types/order";
import type { Product } from "../types/product";
import type { ReturnRequest } from "../types/return";
import type { Address, User } from "../types/user";

export type CustomerRecord = {
  id: string;
  name: string;
  phone: string;
  email?: string;
  status: "active" | "inactive";
  orderCount: number;
  totalSpent: number;
  dueAmount: number;
};

export type AppStore = {
  users: User[];
  addresses: Address[];
  categories: Category[];
  manufacturers: Manufacturer[];
  products: Product[];
  cartItems: CartItem[];
  orders: Order[];
  deliveryCycle: DeliveryCycle;
  notifications: NotificationItem[];
  inventory: InventoryItem[];
  adjustments: StockAdjustment[];
  returns: ReturnRequest[];
  audit: AuditEntry[];
  customers: CustomerRecord[];
};

const seedProducts: Product[] = [
  {
    id: "prod-1",
    name: "Paracetamol 500mg",
    brand: "Panadol",
    genericName: "Paracetamol",
    manufacturerId: "m-1",
    categoryId: "cat-1",
    description:
      "Relief for mild to moderate pain and fever in adults and children over 12 years.",
    price: 150,
    originalPrice: 180,
    discountPercent: 17,
    stock: 42,
    unit: "packet",
    image:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80",
    isActive: true,
    isFeatured: true,
    batchNumber: "PAR-1024",
    expiryDate: "2027-05-12T00:00:00.000Z",
    createdAt: "2024-05-10T09:00:00.000Z",
  },
  {
    id: "prod-2",
    name: "Vitamin C Plus",
    brand: "Cebion",
    genericName: "Ascorbic Acid",
    manufacturerId: "m-2",
    categoryId: "cat-2",
    description: "Immune support with zinc and vitamin C for daily wellness.",
    price: 320,
    originalPrice: 380,
    discountPercent: 16,
    stock: 26,
    unit: "bottle",
    image:
      "https://images.unsplash.com/photo-1550572017-edd951b55104?auto=format&fit=crop&w=600&q=80",
    isActive: true,
    isFeatured: true,
    batchNumber: "VIT-1148",
    expiryDate: "2028-01-18T00:00:00.000Z",
    createdAt: "2024-04-20T10:30:00.000Z",
  },
  {
    id: "prod-3",
    name: "Amoxicillin 250mg",
    brand: "Amoxil",
    genericName: "Amoxicillin",
    manufacturerId: "m-3",
    categoryId: "cat-3",
    description:
      "Broad-spectrum antibiotic used to treat bacterial infections.",
    price: 420,
    originalPrice: 470,
    discountPercent: 11,
    stock: 9,
    unit: "pack",
    image:
      "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=600&q=80",
    isActive: true,
    batchNumber: "AMX-732",
    expiryDate: "2026-11-08T00:00:00.000Z",
    createdAt: "2024-02-15T11:10:00.000Z",
  },
  {
    id: "prod-4",
    name: "Antiseptic Cream",
    brand: "SkinGuard",
    genericName: "Chlorhexidine",
    manufacturerId: "m-4",
    categoryId: "cat-4",
    description:
      "Gentle skin protection cream for cuts, scrapes, and minor irritations.",
    price: 225,
    originalPrice: 260,
    discountPercent: 13,
    stock: 18,
    unit: "tube",
    image:
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=600&q=80",
    isActive: true,
    batchNumber: "SKN-903",
    expiryDate: "2027-09-20T00:00:00.000Z",
    createdAt: "2024-05-19T14:00:00.000Z",
  },
  {
    id: "prod-5",
    name: "First Aid Kit",
    brand: "HomeSafe",
    genericName: "Emergency Care Kit",
    manufacturerId: "m-1",
    categoryId: "cat-5",
    description:
      "Home first aid kit with dressings, bandages, and antiseptic wipes.",
    price: 760,
    originalPrice: 820,
    discountPercent: 7,
    stock: 5,
    unit: "kit",
    image:
      "https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&w=600&q=80",
    isActive: true,
    batchNumber: "FIR-118",
    expiryDate: "2026-03-15T00:00:00.000Z",
    createdAt: "2024-01-06T12:00:00.000Z",
  },
  {
    id: "prod-6",
    name: "Ibuprofen 200mg",
    brand: "Brufen",
    genericName: "Ibuprofen",
    manufacturerId: "m-2",
    categoryId: "cat-1",
    description:
      "Anti-inflammatory medication for pain relief and fever reduction.",
    price: 210,
    originalPrice: 240,
    discountPercent: 12,
    stock: 31,
    unit: "pack",
    image:
      "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=600&q=80",
    isActive: true,
    isFeatured: true,
    batchNumber: "IBU-102",
    expiryDate: "2027-12-12T00:00:00.000Z",
    createdAt: "2024-06-11T09:15:00.000Z",
  },
];

export function createSeedStore(): AppStore {
  const products = seedProducts.map((product) => ({ ...product }));

  return {
    users: [
      {
        id: "user-001",
        name: "Amina Karim",
        email: "amina@hibbullah.app",
        phone: "+254712345678",
        role: "customer",
        createdAt: "2024-01-15T08:00:00.000Z",
      },
      {
        id: "admin-001",
        name: "Dr. Yusuf Ali",
        email: "admin@hibbullah.app",
        phone: "+254720000111",
        role: "admin",
        createdAt: "2023-11-02T09:00:00.000Z",
      },
    ],
    addresses: [
      {
        id: "addr-1",
        label: "Home",
        street: "Nairobi West, Mfangano Street",
        city: "Nairobi",
        county: "Nairobi County",
        postalCode: "00100",
        isDefault: true,
      },
      {
        id: "addr-2",
        label: "Office",
        street: "Kimathi Street, Suite 7",
        city: "Nairobi",
        county: "Nairobi County",
        postalCode: "00100",
      },
    ],
    categories: [
      {
        id: "cat-1",
        name: "Pain Relief",
        slug: "pain-relief",
        description: "Fever and body pain",
        productCount: 2,
      },
      {
        id: "cat-2",
        name: "Vitamins",
        slug: "vitamins",
        description: "Daily wellness support",
        productCount: 1,
      },
      {
        id: "cat-3",
        name: "Antibiotics",
        slug: "antibiotics",
        description: "Prescription support",
        productCount: 1,
      },
      {
        id: "cat-4",
        name: "Skin Care",
        slug: "skin-care",
        description: "Dermatology care",
        productCount: 1,
      },
      {
        id: "cat-5",
        name: "First Aid",
        slug: "first-aid",
        description: "Emergency essentials",
        productCount: 1,
      },
    ],
    manufacturers: [
      { id: "m-1", name: "Nairobi Pharma", country: "Kenya", productCount: 2 },
      { id: "m-2", name: "East Coast Labs", country: "Kenya", productCount: 2 },
      { id: "m-3", name: "MedTrust", country: "Uganda", productCount: 1 },
      { id: "m-4", name: "BloomCare", country: "Kenya", productCount: 1 },
    ],
    products,
    cartItems: [
      { id: "cart-1", productId: "prod-1", quantity: 2, product: products[0] },
      { id: "cart-2", productId: "prod-2", quantity: 1, product: products[1] },
    ],
    orders: [
      {
        id: "order-1",
        orderNumber: "HB-1001",
        customerId: "user-001",
        customerName: "Amina Karim",
        createdAt: "2026-08-30T09:00:00.000Z",
        status: "PENDING",
        subtotal: 620,
        discount: 90,
        deliveryFee: 150,
        total: 680,
        paymentMethod: "CASH_ON_DELIVERY",
        address: "Nairobi West, Mfangano Street, Nairobi",
        items: [
          {
            id: "oitem-1",
            productId: "prod-1",
            productName: "Paracetamol 500mg",
            quantity: 2,
            unitPrice: 150,
            discountPercent: 17,
            total: 300,
          },
          {
            id: "oitem-2",
            productId: "prod-2",
            productName: "Vitamin C Plus",
            quantity: 1,
            unitPrice: 320,
            discountPercent: 16,
            total: 320,
          },
        ],
        timeline: [
          {
            label: "Placed",
            time: "2026-08-30 09:00",
            note: "Customer submitted order",
          },
          {
            label: "Pending",
            time: "2026-08-30 09:05",
            note: "Waiting for admin review",
          },
        ],
      },
      {
        id: "order-2",
        orderNumber: "HB-1002",
        customerId: "user-001",
        customerName: "Amina Karim",
        createdAt: "2026-08-28T16:40:00.000Z",
        status: "DELIVERED",
        subtotal: 210,
        discount: 30,
        deliveryFee: 150,
        total: 330,
        paymentMethod: "CASH_ON_DELIVERY",
        address: "Nairobi West, Mfangano Street, Nairobi",
        items: [
          {
            id: "oitem-3",
            productId: "prod-6",
            productName: "Ibuprofen 200mg",
            quantity: 1,
            unitPrice: 210,
            discountPercent: 12,
            total: 210,
          },
        ],
        timeline: [
          {
            label: "Confirmed",
            time: "2026-08-28 17:00",
            note: "Order approved by admin",
          },
          {
            label: "Delivered",
            time: "2026-08-29 11:30",
            note: "Cash on delivery completed",
          },
        ],
      },
    ],
    deliveryCycle: {
      id: "cycle-1",
      customerId: "user-001",
      status: "PENDING",
      startedAt: "2026-08-30T08:45:00.000Z",
      closesAt: "2026-08-31T08:45:00.000Z",
      estimatedTotal: 680,
      products: [products[0], products[1]],
    },
    notifications: [
      {
        id: "notify-1",
        title: "Order delivered",
        body: "Your order HB-1002 was delivered successfully.",
        createdAt: "2026-08-29T10:10:00.000Z",
        read: false,
        type: "success",
      },
      {
        id: "notify-2",
        title: "Cycle reminder",
        body: "Your current delivery cycle is still open. Add items before it closes.",
        createdAt: "2026-08-30T06:10:00.000Z",
        read: false,
        type: "info",
      },
    ],
    inventory: [
      {
        id: "inv-1",
        productId: "prod-1",
        productName: "Paracetamol 500mg",
        batchNumber: "PAR-1024",
        quantity: 42,
        expiryDate: "2027-05-12T00:00:00.000Z",
        status: "healthy",
        lastUpdated: "2026-08-18T09:00:00.000Z",
      },
      {
        id: "inv-2",
        productId: "prod-3",
        productName: "Amoxicillin 250mg",
        batchNumber: "AMX-732",
        quantity: 9,
        expiryDate: "2026-11-08T00:00:00.000Z",
        status: "low",
        lastUpdated: "2026-08-19T09:00:00.000Z",
      },
      {
        id: "inv-3",
        productId: "prod-5",
        productName: "First Aid Kit",
        batchNumber: "FIR-118",
        quantity: 0,
        expiryDate: "2026-03-15T00:00:00.000Z",
        status: "out_of_stock",
        lastUpdated: "2026-08-26T13:00:00.000Z",
      },
    ],
    adjustments: [
      {
        id: "sa-1",
        productId: "prod-3",
        productName: "Amoxicillin 250mg",
        batchNumber: "AMX-732",
        type: "decrease",
        quantity: 6,
        reason: "Order fulfillment",
        timestamp: "2026-08-29T10:00:00.000Z",
        adminName: "Dr. Yusuf Ali",
      },
    ],
    returns: [
      {
        id: "return-1",
        orderId: "order-2",
        customerId: "user-001",
        customerName: "Amina Karim",
        productName: "Ibuprofen 200mg",
        quantity: 1,
        reason: "Incorrect medication packaging",
        status: "PENDING",
        createdAt: "2026-08-30T10:00:00.000Z",
      },
    ],
    audit: [
      {
        id: "audit-1",
        actor: "Dr. Yusuf Ali",
        action: "Confirmed order",
        timestamp: "2026-08-29T11:00:00.000Z",
        recordType: "Order",
        oldValue: "PENDING",
        newValue: "CONFIRMED",
      },
    ],
    customers: [
      {
        id: "user-001",
        name: "Amina Karim",
        phone: "+254712345678",
        email: "amina@hibbullah.app",
        status: "active",
        orderCount: 3,
        totalSpent: 1265,
        dueAmount: 0,
      },
      {
        id: "user-002",
        name: "John Mutua",
        phone: "+254723456789",
        status: "active",
        orderCount: 2,
        totalSpent: 890,
        dueAmount: 120,
      },
      {
        id: "user-003",
        name: "Mary Wanjiku",
        phone: "+254734567890",
        status: "inactive",
        orderCount: 1,
        totalSpent: 460,
        dueAmount: 0,
      },
    ],
  };
}

export const store: AppStore = createSeedStore();

export const mockUser = store.users[0];
export const mockAdmin = store.users[1];
export const mockAddresses = store.addresses;
export const mockCategories = store.categories;
export const mockManufacturers = store.manufacturers;
export const mockProducts = store.products;
export const mockCartItems = store.cartItems;
export const mockOrders = store.orders;
export const mockDeliveryCycle = store.deliveryCycle;
export const mockNotifications = store.notifications;
export const mockInventory = store.inventory;
export const mockStockAdjustments = store.adjustments;
export const mockReturns = store.returns;
export const mockAuditEntries = store.audit;
export const mockCustomerList = store.customers;
