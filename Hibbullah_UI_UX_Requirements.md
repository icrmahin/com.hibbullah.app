# Hibbullah Mobile App — UI/UX Requirements

## 1. Purpose

Hibbullah is a single-pharmacy medicine ordering and management app.

The UI must feel:
- Minimal
- Premium
- Trustworthy
- Medical
- Calm
- Fast
- Easy to understand

The design should follow Apple Human Interface Guidelines principles: clarity, hierarchy, simplicity, consistency, flexibility, accessibility, and careful use of color/materials.

References:
- https://developer.apple.com/design/human-interface-guidelines/
- https://developer.apple.com/design/human-interface-guidelines/design-principles

## 2. Brand

Use the Hibbullah brand palette consistently.

| Token | Value | Usage |
|---|---|---|
| Primary Green | `#023719` | Primary actions and important brand elements |
| Gold | `#A97104` | Secondary emphasis and highlights |
| White | `#FFFFFF` | Light surfaces and contrast |
| Black | `#000000` | Primary dark text/surfaces |

Derived neutral colors may be created for background, secondary background, text hierarchy, separators, and disabled states.

Status colors may be used when necessary, but status must never depend on color alone.

Do not use random gradients.

## 3. Design Principles

### Simplicity
Every element must earn its place. Do not fill empty space with decorative cards, gradients, illustrations, or unnecessary text.

### Hierarchy
Users should immediately understand:
1. Where they are
2. What matters most
3. What they can do
4. What happens next

### Familiarity
Use familiar mobile patterns: standard navigation, back behavior, scrolling, search, forms, confirmation, and system gestures.

### Consistency
The same action should look and behave the same throughout the app.

### Craft
Refine spacing, typography, alignment, icons, image cropping, and interaction states.

### Accessibility
Do not rely only on color. Important states should also use text, icons, shapes, or position.

## 4. Visual Direction

The application should feel like a modern premium utility rather than a generic pharmacy template.

Avoid:
- Excessive cards
- Excessive shadows
- Oversized rounded rectangles
- Random gradients
- Decorative blobs
- Excessive glass effects
- Excessive gold or green
- Tiny text
- Dense screens
- Unnecessary borders
- Generic dashboard aesthetics

Prefer:
- Generous spacing
- Strong typography
- Clean surfaces
- Subtle separators
- Restrained rounding
- Clear primary actions
- Good product imagery
- Simple iconography
- Quiet backgrounds
- Obvious hierarchy

Apple-style means using design principles, not copying Apple's branding or proprietary UI.

## 5. Layout

Use a consistent spacing system:

`4, 8, 12, 16, 20, 24, 32, 40, 48`

Use larger spacing between major sections and smaller spacing between related elements.

Respect:
- Safe areas
- Device width
- Keyboard
- Status bar
- Navigation bars

The layout must work on small and large Android phones.

## 6. Typography

Typography should create clear hierarchy.

Use a limited set of sizes and weights.

Hierarchy:
- Screen title: large and strong
- Section title: medium/large and semibold
- Product name: clear and readable
- Price: strong visual priority
- Secondary information: smaller but readable
- Supporting text: minimal

Avoid too many font sizes, excessive bold, all-caps UI, and extremely thin text.

## 7. Icons

Use one consistent icon system.

Icons must:
- Have consistent visual weight
- Have consistent sizing
- Align correctly with text
- Communicate meaning clearly

Do not mix unrelated icon styles.

Interactive icon buttons need sufficiently large touch targets.

## 8. Navigation

Primary customer navigation:

**Home | Products | Orders | Cart | Account**

The selected tab must be clearly identifiable without relying only on color.

Use standard back navigation for hierarchical screens.

Examples:
- Home → Product → Product Details
- Products → Category → Product Details
- Orders → Order Details
- Account → Addresses

Do not overcrowd headers with actions.

# 9. Customer Screens

## Welcome
Include:
- Logo
- Short value proposition
- Login/Register/Continue actions

Keep it clean. Avoid unnecessary onboarding carousels.

## Login / Register

Use:
- Clear labels
- Useful placeholders
- Correct keyboard types
- Visible validation
- Clear errors
- Loading state
- Disabled state while submitting

Password fields should provide visibility control.

## Home

Recommended hierarchy:
1. Greeting/context
2. Search
3. Important categories/access
4. Product of the Day
5. Trending
6. Discounts
7. New Products
8. Manufacturers
9. Other useful content

Do not make every section visually identical.

## Search

States:
- Idle
- Typing
- Loading
- Results
- No results
- Error

No-results example:
**No medicines found**
Try a brand, generic name, or manufacturer.

## Products

Provide clear browsing with search and useful filters.

The catalog may contain approximately 5,000 products. Use efficient list rendering and pagination/infinite loading.

## Product Card

Prioritize:
1. Image
2. Product name
3. Generic/manufacturer
4. Current price
5. Discount
6. Availability
7. Quick add where appropriate

Do not overload cards with every database field.

## Product Details

Hierarchy:
1. Product image
2. Product name
3. Generic name
4. Manufacturer
5. Important information
6. Price
7. Discount
8. Availability
9. Quantity
10. Add to Bag

If unavailable, clearly say so and disable purchasing.

## Cart

The user should immediately understand:
- What they are buying
- Quantity
- Price
- Discount
- Total
- Next action

Provide clear quantity controls, removal, summary, and checkout action.

## Checkout

Keep it short:

1. Delivery address
2. Products
3. Price summary
4. Discount
5. Delivery charge if applicable
6. Total
7. Cash on Delivery
8. Place Order

Prevent duplicate submission and show loading feedback.

## Delivery Cycle

The 24-hour service cycle should clearly show:
- Cycle status
- Timing
- Included orders/items
- Subtotal
- Discount
- Delivery charge
- Total
- Current state

Use simple customer language.

## Orders

Useful statuses:
- Pending
- Approved
- Processing
- Out for Delivery
- Delivered
- Cancelled
- Returned

Each order card should show:
- Reference
- Date/time
- Item count
- Total
- Status

## Order Details

Show:
- Current status
- Products
- Quantities
- Prices
- Discount
- Delivery charge
- Total
- Delivery address
- Order date
- Relevant updates

Do not rely only on colored badges.

## Account

Group:
- Profile
- Addresses
- Notifications
- Settings
- Order history
- Help
- Logout

Avoid a huge list of unrelated settings.

# 10. Admin UI/UX

Admin is mobile-first.

Prioritize operational clarity over decoration.

## Admin Dashboard

Recommended hierarchy:
1. Pending orders
2. Orders needing attention
3. Today's sales
4. Low stock
5. Expiring products
6. Recent activity

Do not create a desktop dashboard squeezed onto a phone.

## Admin Products

Provide:
- Search
- Product list
- Add product
- Edit product
- Enable/disable product

Forms should be divided into logical sections.

## Add/Edit Product

Group fields:

### Basic
- Product name
- Brand
- Generic
- Manufacturer
- Category

### Product information
- Strength
- Form
- Description

### Pricing
- Price
- Discount

### Inventory
- Stock
- Batch
- Expiry

### Media
- Product image

## Inventory

Admin should quickly understand:
- Available stock
- Low stock
- Out of stock
- Expiring
- Expired

Use search and filters rather than showing everything simultaneously.

## Batch / Expiry

Show:
- Product
- Batch number
- Quantity
- Expiry date
- Status

Make expiring/expired products obvious without relying only on color.

## Orders

Optimize for quick decisions.

Immediately show:
- Customer
- Items
- Amount
- Time
- Status
- Required action

Destructive actions should have confirmation.

## Customers

Customer list:
- Search
- Name
- Contact
- Order summary
- Relevant status

Customer details:
- Profile
- Orders
- Due/transaction history
- Relevant activity

## Returns

Clearly connect:
- Original order
- Product
- Quantity
- Reason
- Adjustment
- Inventory effect

Confirm before final submission.

## Reports

Prioritize readability.

Use:
- Concise statistics
- Date filters
- Simple charts only when useful
- Readable lists/tables

## Audit

Keep it simple:
- Who
- What
- When
- Affected record

Detailed information can be available on demand.

# 11. Shared Components

Create reusable components:

- Button
- IconButton
- Input
- SearchBar
- Header
- SectionHeader
- ProductCard
- ProductImage
- Price
- DiscountBadge
- StatusBadge
- QuantitySelector
- OrderCard
- EmptyState
- ErrorState
- LoadingState
- ConfirmationModal
- BottomActionBar
- ListSeparator

Components should support normal, pressed, disabled, loading, and error states where relevant.

# 12. Interaction States

Every interactive component needs appropriate states.

Button:
- Normal
- Pressed
- Disabled
- Loading

Input:
- Normal
- Focused
- Filled
- Error
- Disabled

Product:
- Available
- Low stock
- Unavailable

Order:
- Pending
- Approved
- Processing
- Delivery
- Delivered
- Cancelled
- Returned

Do not design only the successful state.

# 13. Loading

Avoid blank screens while data loads.

Use lightweight skeletons or activity indicators.

Avoid large layout jumps.

Do not create elaborate skeleton animations.

# 14. Empty States

Every major list needs an intentional empty state.

Examples:
- Cart: "Your bag is empty."
- Orders: "No orders yet."
- Search: "No medicines found."
- Inventory: "No products match this filter."

Provide a useful recovery action when appropriate.

# 15. Error States

Use understandable messages.

Avoid:
"Error 500."

Prefer:
"Something went wrong."
"Please try again."

Provide Retry/Back where appropriate.

Never leave users with an infinite loading spinner after a failed request.

# 16. Forms

Forms should:
- Use correct keyboard types
- Validate input
- Show errors near the field
- Preserve entered values when possible
- Prevent duplicate submission
- Handle keyboard visibility properly

Use `KeyboardAvoidingView` or an equivalent native approach where necessary.

# 17. Touch & Accessibility

Interactive areas must be comfortable to tap.

Provide adequate spacing between controls.

Do not place destructive actions immediately beside each other.

Text/icons must maintain readable contrast.

Important information must not depend only on color.

# 18. Motion

Motion should be restrained.

No external animation library is required.

Use native React Native capabilities when small interactions need motion.

Motion should:
- Communicate state changes
- Provide feedback
- Support navigation
- Never delay normal actions

Do not animate everything.

# 19. Materials / Glass

Do not turn the entire application into a glass UI.

If translucent/material effects are used, reserve them for appropriate navigation or functional surfaces.

Content cards should normally remain solid and readable.

Avoid stacking translucent surfaces.

Legibility comes first.

# 20. Responsive Behavior

Test:
- Small phones
- Standard phones
- Large phones

Avoid fixed widths that cause clipping.

Use flexible layouts.

Text must not overflow.

Buttons must remain accessible.

# 21. Performance UX

The app should feel fast.

Requirements:
- Efficient list rendering
- Optimized images
- No unnecessary full-catalog loading
- No obvious UI freezes
- Immediate feedback for actions
- Efficient data loading

A 5,000-product catalog must not freeze the application.

# 22. No-Backend Demo

The current frontend uses local/mock data.

The demo must support BOTH:

### Customer mode
Complete customer flow.

### Admin mode
Complete admin flow.

Both should behave like a real application using local demo data.

The mock data layer should later be replaceable with Supabase services without rebuilding the screens.

# 23. Backend Readiness

Keep:
- Types
- Services
- UI components
- Screens

properly separated.

Do not scatter mock data directly throughout every screen.

# 24. Final UI Quality Checklist

### Visual
- Consistent spacing
- Consistent typography
- Consistent icons
- Consistent buttons
- Consistent radius
- Clear hierarchy
- No random gradients
- No unnecessary decoration
- Brand colors used intentionally

### UX
- Every screen has a clear purpose
- Navigation is predictable
- Primary actions are obvious
- Forms are easy to complete
- Loading states exist
- Empty states exist
- Error states exist
- Destructive actions are protected

### Mobile
- Safe areas handled
- Keyboard does not cover fields
- Touch targets are comfortable
- No clipped text
- Works across screen sizes

### Performance
- Large lists use efficient rendering
- Images are optimized
- No unnecessary full-catalog loading
- No obvious freezes

### Accessibility
- Sufficient contrast
- Color is not the only status indicator
- Text is readable
- Controls are appropriately sized

### Native
- Android Expo Go works
- Android emulator works
- Icons render correctly
- Navigation works
- No native red-screen errors

# 25. Design Standard

The final result should feel intentionally designed from scratch.

It should NOT look like:
- A default React Native template
- A generic pharmacy template
- An AI-generated dashboard
- A collection of unrelated cards
- A visually impressive concept that is difficult to use

Target:

**Simple enough to understand immediately.  
Polished enough to feel trustworthy.  
Structured enough to scale.  
Fast enough to use every day.**

The design should prioritize purpose, agency, familiarity, flexibility, simplicity, craft, and delight, consistent with Apple's current design principles.
