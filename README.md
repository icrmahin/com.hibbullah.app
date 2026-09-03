````md
# Hibbullah Mobile Application

A mobile-first pharmaceutical product discovery and ordering application built with Expo React Native and Supabase.

The application is designed for a single-pharmacy business where customers can browse medicines/products, add products to their cart, and submit orders. The administrator manages products, inventory, orders, customers, stock, batches, expiry dates, discounts, returns, reports, and audit history from the same mobile application.

## Project Status

- [x] Project setup
- [ ] Design system
- [ ] Customer frontend
- [ ] Admin frontend
- [ ] Supabase backend
- [ ] Authentication
- [ ] Database implementation
- [ ] Product management
- [ ] Cart and ordering system
- [ ] 24-hour order consolidation
- [ ] Inventory management
- [ ] Batch management
- [ ] Expiry management
- [ ] Discount management
- [ ] Customer management
- [ ] Reports
- [ ] Returns
- [ ] Audit logging
- [ ] Notifications
- [ ] Security / RLS
- [ ] Full testing
- [ ] Android build
- [ ] APK testing
- [ ] Production release

---

# 1. Technology Stack

## Frontend

- Expo
- React Native
- TypeScript
- Expo Router
- React Hooks

## Backend

- Supabase

Supabase provides the backend infrastructure for the application.

## Database

- PostgreSQL through Supabase

No separate PostgreSQL server is required.

## Authentication

- Supabase Auth

## File Storage

- Supabase Storage

Used primarily for product images and other application assets that need remote storage.

## Realtime

- Supabase Realtime

Use only where realtime updates provide an actual benefit.

## Server-side Logic

- Supabase Edge Functions

Use Edge Functions for operations that should not be trusted to the client application.

## Android

- Expo EAS Build

---

# 2. Core Project Architecture

```text
Expo React Native App
        |
        v
   Supabase Client
        |
        v
     Supabase
        |
        +---- Authentication
        |
        +---- PostgreSQL
        |
        +---- Storage
        |
        +---- Realtime
        |
        +---- Edge Functions
```
````

The application is divided into:

```text
src/app/          -> Screens and routes
src/components/   -> Reusable UI
src/constants/    -> Design system and configuration
src/hooks/        -> Reusable React logic
src/lib/          -> Supabase and infrastructure
src/services/     -> Data and business operations
src/types/        -> TypeScript definitions
src/utils/        -> Helper functions
```

---

# 3. Complete Project File Structure

```text
hibbullah/
│
├── AGENTS.md
├── CLAUDE.md
├── LICENSE
├── README.md
├── app.json
├── expo-env.d.ts
├── package.json
├── package-lock.json
├── tsconfig.json
│
├── assets/
│   ├── expo.icon/
│   │   ├── Assets/
│   │   └── icon.json
│   │
│   └── images/
│       ├── logo/
│       │   └── hibbullah-logo.png
│       │
│       ├── onboarding/
│       │   └── ...
│       │
│       ├── placeholders/
│       │   └── product-placeholder.png
│       │
│       └── tabIcons/
│           ├── home.png
│           ├── products.png
│           ├── orders.png
│           ├── cart.png
│           └── account.png
│
├── docs/
│   ├── requirements.md
│   ├── architecture.md
│   ├── database.md
│   ├── business-logic.md
│   ├── api-contract.md
│   └── testing.md
│
├── scripts/
│   └── README.md
│
└── src/
    │
    ├── app/
    │   │
    │   ├── _layout.tsx
    │   ├── index.tsx
    │   │
    │   ├── (auth)/
    │   │   ├── _layout.tsx
    │   │   ├── welcome.tsx
    │   │   ├── login.tsx
    │   │   ├── register.tsx
    │   │   ├── forgot-password.tsx
    │   │   └── reset-password.tsx
    │   │
    │   ├── (customer)/
    │   │   ├── _layout.tsx
    │   │   │
    │   │   ├── (tabs)/
    │   │   │   ├── _layout.tsx
    │   │   │   ├── index.tsx
    │   │   │   ├── products.tsx
    │   │   │   ├── orders.tsx
    │   │   │   ├── cart.tsx
    │   │   │   └── account.tsx
    │   │   │
    │   │   ├── search.tsx
    │   │   │
    │   │   ├── products/
    │   │   │   ├── _layout.tsx
    │   │   │   ├── categories.tsx
    │   │   │   ├── category/
    │   │   │   │   └── [categoryId].tsx
    │   │   │   ├── manufacturers.tsx
    │   │   │   ├── manufacturer/
    │   │   │   │   └── [manufacturerId].tsx
    │   │   │   └── [productId].tsx
    │   │   │
    │   │   ├── checkout.tsx
    │   │   ├── delivery-cycle.tsx
    │   │   │
    │   │   ├── order/
    │   │   │   └── [orderId].tsx
    │   │   │
    │   │   ├── account/
    │   │   │   ├── profile.tsx
    │   │   │   ├── addresses.tsx
    │   │   │   ├── notifications.tsx
    │   │   │   └── settings.tsx
    │   │   │
    │   │   └── address/
    │   │       └── edit.tsx
    │   │
    │   └── (admin)/
    │       ├── _layout.tsx
    │       ├── index.tsx
    │       │
    │       ├── products/
    │       │   ├── _layout.tsx
    │       │   ├── index.tsx
    │       │   ├── add.tsx
    │       │   └── [productId]/
    │       │       ├── index.tsx
    │       │       └── edit.tsx
    │       │
    │       ├── inventory/
    │       │   ├── index.tsx
    │       │   ├── batches.tsx
    │       │   ├── expiry.tsx
    │       │   └── adjustment.tsx
    │       │
    │       ├── orders/
    │       │   ├── index.tsx
    │       │   └── [orderId].tsx
    │       │
    │       ├── customers/
    │       │   ├── index.tsx
    │       │   └── [customerId].tsx
    │       │
    │       ├── reports/
    │       │   ├── index.tsx
    │       │   ├── sales.tsx
    │       │   └── inventory.tsx
    │       │
    │       ├── returns/
    │       │   ├── index.tsx
    │       │   └── [returnId].tsx
    │       │
    │       └── audit/
    │           └── index.tsx
    │
    ├── components/
    │   ├── common/
    │   │   ├── Button.tsx
    │   │   ├── Input.tsx
    │   │   ├── SearchBar.tsx
    │   │   ├── Header.tsx
    │   │   ├── LoadingState.tsx
    │   │   ├── EmptyState.tsx
    │   │   ├── ErrorState.tsx
    │   │   ├── Modal.tsx
    │   │   └── StatusBadge.tsx
    │   │
    │   ├── products/
    │   │   ├── ProductCard.tsx
    │   │   ├── ProductImage.tsx
    │   │   ├── ProductPrice.tsx
    │   │   ├── DiscountBadge.tsx
    │   │   ├── CategoryCard.tsx
    │   │   └── ManufacturerCard.tsx
    │   │
    │   ├── cart/
    │   │   ├── CartItem.tsx
    │   │   ├── QuantitySelector.tsx
    │   │   └── CartSummary.tsx
    │   │
    │   ├── orders/
    │   │   ├── OrderCard.tsx
    │   │   ├── OrderStatus.tsx
    │   │   └── OrderSummary.tsx
    │   │
    │   └── admin/
    │       ├── AdminHeader.tsx
    │       ├── AdminStatCard.tsx
    │       ├── AdminProductCard.tsx
    │       ├── AdminOrderCard.tsx
    │       └── InventoryStatus.tsx
    │
    ├── constants/
    │   ├── colors.ts
    │   ├── typography.ts
    │   ├── spacing.ts
    │   ├── sizes.ts
    │   └── config.ts
    │
    ├── hooks/
    │   ├── useAuth.ts
    │   ├── useUser.ts
    │   ├── useProducts.ts
    │   ├── useProduct.ts
    │   ├── useCart.ts
    │   ├── useOrders.ts
    │   ├── useDeliveryCycle.ts
    │   ├── useNotifications.ts
    │   └── useAdmin.ts
    │
    ├── lib/
    │   ├── supabase.ts
    │   └── storage.ts
    │
    ├── services/
    │   ├── authService.ts
    │   ├── productService.ts
    │   ├── categoryService.ts
    │   ├── manufacturerService.ts
    │   ├── cartService.ts
    │   ├── deliveryCycleService.ts
    │   ├── orderService.ts
    │   ├── addressService.ts
    │   ├── notificationService.ts
    │   │
    │   └── admin/
    │       ├── adminProductService.ts
    │       ├── inventoryService.ts
    │       ├── batchService.ts
    │       ├── orderManagementService.ts
    │       ├── customerService.ts
    │       ├── reportService.ts
    │       ├── returnService.ts
    │       └── auditService.ts
    │
    ├── types/
    │   ├── auth.ts
    │   ├── user.ts
    │   ├── product.ts
    │   ├── category.ts
    │   ├── manufacturer.ts
    │   ├── cart.ts
    │   ├── deliveryCycle.ts
    │   ├── order.ts
    │   ├── address.ts
    │   ├── notification.ts
    │   ├── inventory.ts
    │   ├── return.ts
    │   ├── audit.ts
    │   └── database.ts
    │
    └── utils/
        ├── currency.ts
        ├── date.ts
        ├── validation.ts
        ├── formatting.ts
        └── errorHandling.ts
```

---

# 4. Screen Architecture

## 4.1 Authentication

### Welcome

```text
src/app/(auth)/welcome.tsx
```

Responsibilities:

- Display Hibbullah branding
- Introduce the application
- Navigate to Login/Register

Checklist:

- [ ] Logo
- [ ] Brand presentation
- [ ] Login button
- [ ] Register button
- [ ] Responsive layout
- [ ] Loading state

### Login

```text
src/app/(auth)/login.tsx
```

Responsibilities:

- Customer login
- Admin login
- Session creation
- Validation
- Error handling

Checklist:

- [ ] Email/phone field
- [ ] Password field
- [ ] Login action
- [ ] Forgot password
- [ ] Validation
- [ ] Authentication error handling
- [ ] Loading state

### Register

```text
src/app/(auth)/register.tsx
```

Checklist:

- [ ] Name
- [ ] Phone
- [ ] Email if required
- [ ] Password
- [ ] Confirm password
- [ ] Account creation
- [ ] Validation

### Forgot Password

```text
src/app/(auth)/forgot-password.tsx
```

### Reset Password

```text
src/app/(auth)/reset-password.tsx
```

---

# 5. Customer Application

The customer application contains five primary tabs:

```text
Home
Products
Orders
Cart
Account
```

---

## 5.1 Home

```text
src/app/(customer)/(tabs)/index.tsx
```

Main customer landing screen.

Checklist:

- [ ] Hibbullah header
- [ ] Search entry
- [ ] Product of the Day
- [ ] Trending Products
- [ ] New Products
- [ ] Discounted Products
- [ ] Featured categories
- [ ] Featured manufacturers
- [ ] Product cards
- [ ] Loading states
- [ ] Empty states
- [ ] Error states

---

# 6. Product Discovery

## Products

```text
src/app/(customer)/(tabs)/products.tsx
```

Checklist:

- [ ] Product listing
- [ ] Product search
- [ ] Category filtering
- [ ] Manufacturer filtering
- [ ] Brand filtering
- [ ] Generic filtering
- [ ] Price display
- [ ] Discount display
- [ ] Stock availability
- [ ] Pagination/infinite loading

---

## Categories

```text
src/app/(customer)/products/categories.tsx
```

Checklist:

- [ ] Category list
- [ ] Category cards
- [ ] Product count
- [ ] Navigation

---

## Category Products

```text
src/app/(customer)/products/category/[categoryId].tsx
```

Checklist:

- [ ] Category title
- [ ] Product listing
- [ ] Filtering
- [ ] Sorting
- [ ] Product details navigation

---

## Manufacturers

```text
src/app/(customer)/products/manufacturers.tsx
```

Checklist:

- [ ] Manufacturer list
- [ ] Search
- [ ] Manufacturer cards

---

## Manufacturer Products

```text
src/app/(customer)/products/manufacturer/[manufacturerId].tsx
```

Checklist:

- [ ] Manufacturer information
- [ ] Product list
- [ ] Filtering
- [ ] Sorting

---

# 7. Product Details

```text
src/app/(customer)/products/[productId].tsx
```

This screen is critical.

Checklist:

- [ ] Product image
- [ ] Product name
- [ ] Brand
- [ ] Generic name
- [ ] Manufacturer
- [ ] Category
- [ ] Current price
- [ ] Original price
- [ ] Discount
- [ ] Stock status
- [ ] Batch information where appropriate
- [ ] Expiry information where appropriate
- [ ] Quantity selector
- [ ] Add to Cart
- [ ] Out-of-stock handling
- [ ] Error handling

---

# 8. Search

```text
src/app/(customer)/search.tsx
```

Search must support:

- [ ] Product name
- [ ] Brand
- [ ] Generic name
- [ ] Manufacturer/company
- [ ] Relevant keywords

Checklist:

- [ ] Search input
- [ ] Search results
- [ ] No results state
- [ ] Loading state
- [ ] Search error state
- [ ] Product navigation

---

# 9. Cart

```text
src/app/(customer)/(tabs)/cart.tsx
```

Checklist:

- [ ] Cart items
- [ ] Product image
- [ ] Product name
- [ ] Quantity
- [ ] Price
- [ ] Discount
- [ ] Item subtotal
- [ ] Remove item
- [ ] Quantity update
- [ ] Total calculation
- [ ] Continue shopping
- [ ] Proceed to checkout

---

# 10. Checkout

```text
src/app/(customer)/checkout.tsx
```

Checklist:

- [ ] Customer information
- [ ] Delivery address
- [ ] Cart summary
- [ ] Product quantities
- [ ] Price calculation
- [ ] Discount calculation
- [ ] Delivery/service charge
- [ ] Cash on Delivery
- [ ] Final order confirmation
- [ ] Submit order

No online payment gateway is required for the current business model.

---

# 11. 24-Hour Order Consolidation System

This is one of the most important pieces of the project.

The business model is:

```text
Customer adds products
        ↓
Customer submits order
        ↓
Order becomes PENDING
        ↓
Customer can continue ordering
        ↓
Additional products are added to the same delivery cycle
        ↓
24-hour cycle ends
        ↓
Admin reviews the consolidated order
        ↓
Admin approves
        ↓
Order becomes CONFIRMED
        ↓
Delivery
        ↓
Cash on Delivery
```

The system must NOT treat every cart submission as an independent delivery.

Instead, the system should maintain a customer's active delivery cycle.

Example:

```text
Customer A

10:00 AM
Paracetamol + Vitamin C
        ↓
Pending

03:00 PM
Adds Antibiotic
        ↓
Same active delivery cycle

09:00 PM
Adds another product
        ↓
Same active delivery cycle

Next cycle processing
        ↓
Admin reviews everything
        ↓
ONE consolidated delivery
```

The delivery-cycle logic must be designed carefully in the backend.

Screen:

```text
src/app/(customer)/delivery-cycle.tsx
```

Checklist:

- [ ] Current cycle status
- [ ] Cycle start time
- [ ] Cycle closing time
- [ ] Products currently included
- [ ] Current estimated total
- [ ] Pending status
- [ ] Admin approval status
- [ ] Delivery information

---

# 12. Order Details

```text
src/app/(customer)/order/[orderId].tsx
```

Checklist:

- [ ] Order number
- [ ] Products
- [ ] Quantities
- [ ] Price
- [ ] Discounts
- [ ] Total
- [ ] Delivery address
- [ ] Order status
- [ ] Timeline
- [ ] Cash on Delivery indicator

Order states may include:

```text
PENDING
CONFIRMED
PROCESSING
OUT_FOR_DELIVERY
DELIVERED
CANCELLED
RETURNED
```

---

# 13. Customer Orders

```text
src/app/(customer)/(tabs)/orders.tsx
```

Checklist:

- [ ] Active orders
- [ ] Pending orders
- [ ] Confirmed orders
- [ ] Delivered orders
- [ ] Cancelled orders
- [ ] Order history
- [ ] Order details navigation

---

# 14. Customer Account

## Account

```text
src/app/(customer)/(tabs)/account.tsx
```

Checklist:

- [ ] Profile
- [ ] Addresses
- [ ] Notifications
- [ ] Settings
- [ ] Logout

## Profile

```text
src/app/(customer)/account/profile.tsx
```

## Addresses

```text
src/app/(customer)/account/addresses.tsx
```

## Edit Address

```text
src/app/(customer)/address/edit.tsx
```

## Notifications

```text
src/app/(customer)/account/notifications.tsx
```

## Settings

```text
src/app/(customer)/account/settings.tsx
```

---

# 15. Admin Application

The admin panel is also mobile-first.

There is no requirement for a separate desktop admin application.

The administrator should be able to operate the business from the same Android application.

---

# 16. Admin Dashboard

```text
src/app/(admin)/index.tsx
```

Dashboard information:

- [ ] Pending orders
- [ ] Today's sales
- [ ] Active delivery cycles
- [ ] Low-stock products
- [ ] Expiring products
- [ ] Recent orders
- [ ] Customer count
- [ ] Inventory summary

---

# 17. Admin Product Management

## Product List

```text
src/app/(admin)/products/index.tsx
```

Checklist:

- [ ] Product list
- [ ] Search
- [ ] Brand filter
- [ ] Generic filter
- [ ] Manufacturer filter
- [ ] Stock status
- [ ] Edit product
- [ ] Product activation/deactivation

## Add Product

```text
src/app/(admin)/products/add.tsx
```

Product information:

- [ ] Product name
- [ ] Brand
- [ ] Generic name
- [ ] Manufacturer
- [ ] Category
- [ ] Product image
- [ ] Price
- [ ] Discount
- [ ] Stock
- [ ] Batch number
- [ ] Expiry date
- [ ] Description
- [ ] Active status

## Product Details

```text
src/app/(admin)/products/[productId]/index.tsx
```

## Edit Product

```text
src/app/(admin)/products/[productId]/edit.tsx
```

---

# 18. Inventory Management

```text
src/app/(admin)/inventory/index.tsx
```

Checklist:

- [ ] Current stock
- [ ] Low stock
- [ ] Out of stock
- [ ] Stock adjustment
- [ ] Stock history

---

# 19. Batch Management

```text
src/app/(admin)/inventory/batches.tsx
```

Checklist:

- [ ] Batch number
- [ ] Product
- [ ] Quantity
- [ ] Purchase information
- [ ] Expiry date
- [ ] Batch status

Different batches of the same medicine must be independently trackable.

---

# 20. Expiry Management

```text
src/app/(admin)/inventory/expiry.tsx
```

Checklist:

- [ ] Expiring soon
- [ ] Expired
- [ ] Expiry date
- [ ] Batch
- [ ] Quantity
- [ ] Warning states
- [ ] Prevent expired products from being sold

---

# 21. Stock Adjustment

```text
src/app/(admin)/inventory/adjustment.tsx
```

Checklist:

- [ ] Increase stock
- [ ] Decrease stock
- [ ] Adjustment reason
- [ ] Related batch
- [ ] Timestamp
- [ ] Admin identity
- [ ] Audit log

---

# 22. Admin Order Management

## Order List

```text
src/app/(admin)/orders/index.tsx
```

Checklist:

- [ ] Pending orders
- [ ] Active orders
- [ ] Confirmed orders
- [ ] Processing
- [ ] Out for delivery
- [ ] Delivered
- [ ] Cancelled
- [ ] Search
- [ ] Filter
- [ ] Sort

## Order Details

```text
src/app/(admin)/orders/[orderId].tsx
```

Admin must be able to:

- [ ] View customer
- [ ] View products
- [ ] View quantities
- [ ] View price
- [ ] View discount
- [ ] View stock
- [ ] Review delivery cycle
- [ ] Confirm order
- [ ] Reject/cancel where appropriate
- [ ] Update order status
- [ ] View order history

---

# 23. Customer Management

## Customer List

```text
src/app/(admin)/customers/index.tsx
```

Checklist:

- [ ] Customer list
- [ ] Search
- [ ] Customer status
- [ ] Order count
- [ ] Total spending
- [ ] Due amount

## Customer Details

```text
src/app/(admin)/customers/[customerId].tsx
```

Checklist:

- [ ] Customer profile
- [ ] Contact information
- [ ] Addresses
- [ ] Order history
- [ ] Due history
- [ ] Delivery history

---

# 24. Reports

## Reports Dashboard

```text
src/app/(admin)/reports/index.tsx
```

## Sales Report

```text
src/app/(admin)/reports/sales.tsx
```

Should provide:

- [ ] Daily sales
- [ ] Weekly sales
- [ ] Monthly sales
- [ ] Product sales
- [ ] Total revenue
- [ ] Discounts
- [ ] Delivered orders

## Inventory Report

```text
src/app/(admin)/reports/inventory.tsx
```

Should provide:

- [ ] Current stock
- [ ] Low stock
- [ ] Out of stock
- [ ] Expiring stock
- [ ] Expired stock
- [ ] Inventory value

---

# 25. Returns

## Returns List

```text
src/app/(admin)/returns/index.tsx
```

## Return Details

```text
src/app/(admin)/returns/[returnId].tsx
```

Checklist:

- [ ] Return request
- [ ] Customer
- [ ] Product
- [ ] Quantity
- [ ] Reason
- [ ] Order reference
- [ ] Return status
- [ ] Stock adjustment
- [ ] Audit record

---

# 26. Audit Log

```text
src/app/(admin)/audit/index.tsx
```

The system should track important administrative actions.

Examples:

```text
Admin changed product price
Admin changed stock
Admin edited product
Admin confirmed order
Admin cancelled order
Admin changed customer information
Admin adjusted inventory
Admin processed return
```

Each audit record should contain:

```text
Who
What
When
Which record
Old value
New value
```

---

# 27. Reusable Components

Reusable UI should NOT be placed inside `src/app`.

Use:

```text
src/components/
```

Examples:

```text
ProductCard.tsx
SearchBar.tsx
Button.tsx
Input.tsx
CartItem.tsx
OrderCard.tsx
StatusBadge.tsx
```

A component should be created when the same UI/logic is required in multiple screens.

Do not create unnecessary abstractions for one-off UI.

---

# 28. Design System

All design values should be centralized.

```text
src/constants/
├── colors.ts
├── typography.ts
├── spacing.ts
├── sizes.ts
└── config.ts
```

Brand colors:

```text
Primary Green
#023719

Gold
#A97104

White
#FFFFFF

Black
#000000
```

The application should maintain consistent:

- [ ] Colors
- [ ] Typography
- [ ] Spacing
- [ ] Border radius
- [ ] Button styles
- [ ] Input styles
- [ ] Cards
- [ ] Icons
- [ ] Navigation
- [ ] Status indicators

Do not hardcode random colors throughout individual screens.

---

# 29. Supabase Client

```text
src/lib/supabase.ts
```

This file should initialize the Supabase client.

All application code should use the centralized Supabase client instead of creating separate clients in individual screens.

---

# 30. Services Layer

Screens should not contain large amounts of database logic.

For example:

```text
src/services/productService.ts
```

handles product operations.

```text
src/services/orderService.ts
```

handles customer order operations.

```text
src/services/admin/orderManagementService.ts
```

handles administrative order operations.

The architecture should generally follow:

```text
Screen
  ↓
Hook
  ↓
Service
  ↓
Supabase
  ↓
PostgreSQL
```

Example:

```text
products.tsx
      ↓
useProducts()
      ↓
productService.ts
      ↓
Supabase
      ↓
products table
```

---

# 31. Hooks

Hooks should contain reusable React-side logic.

Examples:

```text
useAuth.ts
useProducts.ts
useCart.ts
useOrders.ts
useAdmin.ts
```

A hook may manage:

- Fetching
- Loading state
- Error state
- React state
- Subscriptions
- Refetching

Business-critical validation should still be enforced by the backend/database.

---

# 32. TypeScript Types

Keep shared data structures inside:

```text
src/types/
```

Examples:

```text
Product
Order
OrderItem
Customer
Inventory
Batch
Return
Notification
```

Avoid duplicating interfaces across multiple screens.

---

# 33. Database Architecture

The exact database schema should be finalized before implementing the backend.

Core entities are expected to include:

```text
users
customers
admins
products
categories
manufacturers
product_batches
inventory
carts
cart_items
delivery_cycles
orders
order_items

## Verified Frontend and Backend Handoff Status

The following foundation is complete and is intended to keep the future backend integration localized:

- [x] Screens are organized under `src/app/`
- [x] Reusable UI is organized under `src/components/`
- [x] Shared data types are organized under `src/types/`
- [x] Customer navigation is owned by the customer layout and works across nested screens
- [x] Product, cart, order, authentication, and admin operations have service boundaries
- [x] A centralized Supabase client exists in `src/lib/supabase.ts`
- [ ] Services are connected to Supabase tables
- [ ] Database schema, migrations, and indexes are implemented
- [ ] RLS policies and admin authorization are implemented
- [ ] Server-side price, stock, expiry, discount, and order validation is implemented
addresses
notifications
returns
sales
audit_logs
```

The final schema must support:

- [ ] Product search
- [ ] Brand
- [ ] Generic
- [ ] Manufacturer
- [ ] Categories
- [ ] Pricing
- [ ] Discounts
- [ ] Stock
- [ ] Batch tracking
- [ ] Expiry tracking
- [ ] Orders
- [ ] Delivery cycles
- [ ] Customer history
- [ ] Returns
- [ ] Reports
- [ ] Audit history

---

# 34. Security

Security must NOT depend only on the mobile application.

Implement Supabase Row Level Security.

Customer:

```text
Can view own data
Can create own orders
Can view own orders
Can manage own addresses
```

Customer must NOT be able to:

```text
Modify product prices
Modify stock
Confirm orders
Modify another customer's data
Access admin data
```

Admin:

```text
Can manage products
Can manage inventory
Can manage orders
Can manage customers
Can view reports
Can manage returns
Can view audit logs
```

Sensitive operations should be protected server-side.

---

# 35. Product Image Architecture

Product images should be stored using:

```text
Supabase Storage
```

The database should store the image reference rather than storing image files directly inside PostgreSQL.

Example:

```text
Storage
└── products/
    ├── product-001.webp
    ├── product-002.webp
    └── product-003.webp
```

Database:

```text
products
└── image_url
```

---

# 36. Frontend Development Order

Do NOT build the entire application randomly.

Follow this sequence.

## Phase 1 — Foundation

- [x] Expo project configured
- [x] TypeScript configured
- [x] Expo Router configured
- [x] Folder structure established
- [x] Design constants created
- [x] Supabase client prepared
- [x] Basic navigation working

## Phase 2 — Authentication UI

- [x] Welcome
- [x] Login
- [x] Register
- [x] Forgot password
- [x] Reset password

## Phase 3 — Customer UI

- [ ] Home
- [ ] Products
- [ ] Search
- [ ] Categories
- [ ] Manufacturers
- [ ] Product Details
- [ ] Cart
- [ ] Checkout
- [ ] Delivery Cycle
- [ ] Orders
- [ ] Order Details
- [ ] Account
- [ ] Profile
- [ ] Addresses
- [ ] Notifications
- [ ] Settings

## Phase 4 — Admin UI

- [ ] Dashboard
- [ ] Product Management
- [ ] Add Product
- [ ] Edit Product
- [ ] Inventory
- [ ] Batches
- [ ] Expiry
- [ ] Stock Adjustment
- [ ] Orders
- [ ] Customers
- [ ] Reports
- [Returns
- [ ] Audit Log

---

# 37. Backend Development Order

After the frontend structure is stable:

## Phase 1 — Supabase

- [ ] Create Supabase project
- [ ] Configure environment variables
- [ ] Configure Auth
- [ ] Create database
- [ ] Create Storage buckets
- [ ] Enable required extensions/features

## Phase 2 — Database

- [ ] Create tables
- [ ] Create relationships
- [ ] Add primary keys
- [ ] Add foreign keys
- [ ] Add indexes
- [ ] Add constraints
- [ ] Add timestamps
- [ ] Add status fields

## Phase 3 — Security

- [ ] Enable RLS
- [ ] Customer policies
- [ ] Admin policies
- [ ] Storage policies
- [ ] Test unauthorized access

## Phase 4 — Business Logic

- [ ] Product operations
- [ ] Search
- [ ] Cart
- [ ] Delivery cycle
- [ ] Order creation
- [ ] Order consolidation
- [ ] Admin approval
- [ ] Inventory updates
- [ ] Batch tracking
- [ ] Expiry validation
- [ ] Discount calculations
- [ ] Returns
- [ ] Reports
- [ ] Audit logging

---

# 38. Critical Order Logic

Never trust calculations performed only on the mobile client.

The backend should verify:

```text
Product exists
Product is active
Product is not expired
Stock is available
Price is current
Discount is valid
Quantity is valid
Customer is authorized
Order belongs to customer
```

The final order total should be calculated/validated server-side.

---

# 39. 24-Hour Delivery Cycle Logic

The backend should determine the active delivery cycle.

Conceptually:

```text
Customer
   ↓
Active Delivery Cycle
   ↓
Multiple Order/Additions
   ↓
One Consolidated Delivery
```

The application should prevent accidental creation of multiple delivery charges for the same active cycle.

The exact implementation should be finalized in:

```text
docs/business-logic.md
```

before production implementation.

---

# 40. Testing Checklist

## Authentication

- [ ] Valid login
- [ ] Invalid login
- [ ] Logout
- [ ] Password reset
- [ ] Session persistence
- [ ] Unauthorized route protection

## Products

- [ ] Search
- [ ] Brand search
- [ ] Generic search
- [ ] Manufacturer search
- [ ] Category filtering
- [ ] Product details
- [ ] Product image loading
- [ ] Out-of-stock products
- [ ] Expired products

## Cart

- [ ] Add product
- [ ] Remove product
- [ ] Change quantity
- [ ] Correct subtotal
- [ ] Correct discount
- [ ] Correct total

## Orders

- [ ] Create order
- [ ] Pending status
- [ ] Add products to active cycle
- [ ] Consolidate orders
- [ ] Admin approval
- [ ] Status updates
- [ ] Delivery completion
- [ ] Cash on Delivery

## Inventory

- [ ] Stock increase
- [ ] Stock decrease
- [ ] Batch handling
- [ ] Expiry handling
- [ ] Multiple users modifying stock
- [ ] Prevent negative stock

## Admin

- [ ] Product creation
- [ ] Product editing
- [ ] Price changes
- [ ] Discount changes
- [ ] Order approval
- [ ] Customer management
- [ ] Reports
- [ ] Returns
- [ ] Audit logs

---

# 41. Performance Testing

Test the application with realistic data.

Target dataset:

```text
~5,000 products
```

Test:

- [ ] Product search speed
- [ ] Product list loading
- [ ] Image loading
- [ ] Category filtering
- [ ] Manufacturer filtering
- [ ] Cart performance
- [ ] Order creation
- [ ] Admin product management
- [ ] Database queries
- [ ] Network failure recovery

Do not load all 5,000 products and images into memory simultaneously.

Use:

- [ ] Pagination
- [ ] Query limits
- [ ] Database indexes
- [ ] Optimized images
- [ ] Lazy loading where appropriate

---

# 42. Error Handling

The application must handle:

```text
Internet unavailable
Supabase unavailable
Timeout
Database error
Invalid product
Out of stock
Expired product
Authentication failure
Permission denied
Duplicate submission
Order conflict
Session expiration
```

Every major screen should have:

```text
Loading State
Empty State
Error State
Success State
```

---

# 43. Offline / Weak Internet Considerations

The application targets mobile users.

The frontend should handle poor connectivity gracefully.

Minimum requirements:

- [ ] Detect network failure
- [ ] Show useful error message
- [ ] Prevent accidental duplicate submission
- [ ] Disable repeated submit actions
- [ ] Retry safe operations
- [ ] Preserve unsent local state where appropriate

Do not pretend the application is fully offline unless offline synchronization is explicitly implemented.

---

# 44. Android Build

Use Expo EAS.

Development:

```text
Expo Development Build
```

Testing:

```text
Android APK / internal build
```

Production:

```text
Android App Bundle (AAB)
```

Build checklist:

- [ ] App name
- [ ] Package identifier
- [ ] Version
- [ ] Version code
- [ ] App icon
- [ ] Splash screen
- [ ] Android permissions
- [ ] Environment variables
- [ ] Production Supabase configuration
- [ ] EAS configuration
- [ ] Release build

---

# 45. APK Testing

Before giving the APK to the client:

- [ ] Install on Android device
- [ ] Fresh installation
- [ ] Login
- [ ] Register
- [ ] Search
- [ ] Browse products
- [ ] Add to cart
- [ ] Checkout
- [ ] Create order
- [ ] Add additional products
- [ ] Verify delivery cycle
- [ ] Admin login
- [ ] Admin approval
- [ ] Inventory update
- [ ] Product creation
- [ ] Product editing
- [ ] Reports
- [ ] Logout
- [ ] Reopen application
- [ ] Verify session
- [ ] Test poor internet
- [ ] Test server failure
- [ ] Test duplicate submission

---

# 46. Production Stability Checklist

Before release:

- [ ] No critical crashes
- [ ] No unauthorized database access
- [ ] RLS verified
- [ ] Admin routes protected
- [ ] Customer routes protected
- [ ] Database backups configured
- [ ] Product images optimized
- [ ] Database indexes verified
- [ ] Error handling complete
- [ ] Loading states complete
- [ ] Empty states complete
- [ ] Duplicate order prevention tested
- [ ] Stock consistency tested
- [ ] Price consistency tested
- [ ] Discount calculations tested
- [ ] Batch handling tested
- [ ] Expiry handling tested
- [ ] Audit logging verified

---

# 47. Development Responsibility

## Frontend Developer

Responsible for:

- [ ] Expo setup
- [ ] Navigation
- [ ] Customer screens
- [ ] Admin screens
- [ ] Components
- [ ] Design implementation
- [ ] Loading states
- [ ] Error states
- [ ] Client-side validation
- [ ] API/service integration

## Backend Developer

Responsible for:

- [ ] Supabase
- [ ] PostgreSQL schema
- [ ] Authentication
- [ ] RLS
- [ ] Storage
- [ ] Database indexes
- [ ] Business logic
- [ ] Order system
- [ ] Delivery cycle
- [ ] Inventory
- [ ] Batch
- [ ] Expiry
- [ ] Reports
- [ ] Audit logging
- [ ] Server-side validation

## Project Integration

Both developers must agree on:

- [ ] Database schema
- [ ] Type definitions
- [ ] Service contracts
- [ ] Order status values
- [ ] Delivery cycle behavior
- [ ] Error formats
- [ ] Authentication behavior

---

# 48. Development Rules

## Rule 1

Do not put backend/database logic directly into screens.

Bad:

```text
screen
  ↓
huge Supabase query
  ↓
business logic
```

Preferred:

```text
screen
  ↓
hook
  ↓
service
  ↓
Supabase
```

## Rule 2

Do not duplicate components.

If multiple screens use the same product card:

```text
src/components/products/ProductCard.tsx
```

Use that component everywhere.

## Rule 3

Do not hardcode business rules into the UI.

For example:

```text
24-hour order cycle
```

must not exist only inside React code.

The backend must enforce the actual rule.

## Rule 4

Never trust client-side prices or stock.

The server/database must verify them.

## Rule 5

Every database modification should have a clear reason and ownership.

---

# 49. Git Workflow

Use branches:

```text
main
develop
feature/customer-home
feature/product-system
feature/cart
feature/orders
feature/admin
feature/inventory
feature/reports
```

Basic workflow:

```text
Create branch
    ↓
Implement feature
    ↓
Test
    ↓
Commit
    ↓
Pull Request
    ↓
Review
    ↓
Merge
```

Commit examples:

```text
feat: add customer home screen
feat: add product search
feat: implement cart
feat: add delivery cycle
feat: add admin product management
fix: prevent duplicate order submission
fix: correct discount calculation
```

---

# 50. Final End-to-End Development Path

```text
DESIGN
  ↓
Design System
  ↓
Expo Foundation
  ↓
Navigation
  ↓
Authentication UI
  ↓
Customer Frontend
  ↓
Admin Frontend
  ↓
Supabase Setup
  ↓
Database Schema
  ↓
Authentication
  ↓
RLS
  ↓
Storage
  ↓
Product Backend
  ↓
Search Backend
  ↓
Cart Backend
  ↓
Delivery Cycle
  ↓
Order Backend
  ↓
Admin Approval
  ↓
Inventory
  ↓
Batch
  ↓
Expiry
  ↓
Discount
  ↓
Customers
  ↓
Returns
  ↓
Reports
  ↓
Audit Logs
  ↓
Frontend + Backend Integration
  ↓
Testing
  ↓
Performance Testing
  ↓
Security Testing
  ↓
Android APK
  ↓
Real Device Testing
  ↓
Bug Fixing
  ↓
Production Build
  ↓
Play Store Release
```

---

# 51. Definition of Done

A feature is NOT considered complete simply because the UI exists.

A feature is complete when:

- [ ] UI implemented
- [ ] Navigation implemented
- [ ] Loading state implemented
- [ ] Empty state implemented
- [ ] Error state implemented
- [ ] Backend implemented
- [ ] Database implemented
- [ ] RLS/security implemented
- [ ] Validation implemented
- [ ] Real data tested
- [ ] Edge cases tested
- [ ] Android tested
- [ ] Code reviewed
- [ ] Documentation updated

---

# 52. Current Priority

The immediate priority is the mobile application.

The product showcase website is already completed.

Current development priority:

```text
1. Customer frontend
2. Admin frontend
3. Supabase backend
4. Frontend/backend integration
5. Testing
6. Android APK
7. Production stability
```

Do not expand the project scope unnecessarily.

Build the required system first.

Polish second.

Optimize third.

Release only after the critical business flows are stable.

```

One correction from the earlier tree: I also fixed the small structural issue around the customer tabs. The five persistent screens belong under `(customer)/(tabs)`, while screens such as search, checkout, product details, delivery cycle, and order details sit outside the tab group.

Also, I deliberately kept **PostgreSQL as "PostgreSQL through Supabase"**, not as a separate service. That distinction matters for whoever takes over the backend.
```
