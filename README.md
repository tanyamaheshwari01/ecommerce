# 🛍️ E-Commerce Storefront (Frontend)

A modern, responsive e-commerce storefront built using **Next.js**, **React**, and **TypeScript**.  
This project focuses on frontend architecture, API integration, state management, and user experience.

---

## 🚀 Tech Stack

- **Next.js (App Router)**
- **React**
- **TypeScript**
- **Context API** (Global State)
- **REST API Integration**
- **CSS (Inline styles)**

---

## 🎯 Features

### 🛒 Product Catalog
- Fetches products from a public REST API
- Displays products in a responsive grid
- Shows:
  - Product image
  - Title
  - Price
  - Category
  - Rating

### 🔍 Search
- Search products by name
- Case-insensitive search using `includes()`
- Displays “No products found” message for empty results

### 🧩 Filters & Sorting
- Filter products by category
- Sort products by:
  - Price (Low → High)
  - Price (High → Low)
  - Rating

### 📄 Product Details
- Dynamic product detail page
- Product image
- Description
- Rating display

### 🛒 Cart (Frontend Only)
- Add / remove products
- Increase / decrease quantity
- Cart summary with total items & total price
- Cart data persists using `localStorage`

### ⚠️ Error & Empty States
- Handles API loading and error states
- Displays user-friendly messages
- Custom 404 page for invalid routes

### 📱 Responsive Design
- Fully responsive for mobile, tablet, and desktop
- Flexible grid layout using CSS Grid

---

## 🧠 State Management

- **Context API** is used for:
  - Cart state
  - Search state
- Avoids prop drilling
- Clean and scalable architecture

---

## 📂 Pages

- `/` → Home / Product Listing
- `/product/[id]` → Product Details Page
- `/cart` → Cart Page
- `not-found.tsx` → Custom 404 Page

---

## 🧪 Handling Edge Cases

- Invalid URL → **404 Page Not Found**
- Search with no results → **“No products found”**
- API failure → **Error message shown**
- Empty cart → Graceful UI state

---

## 🛠️ Installation & Run Locally

```bash
# Clone the repository
git clone https://github.com/your-username/ecommerce-storefront.git

# Go to project directory
cd ecommerce-storefront

# Install dependencies
npm install

# Run development server
npm run dev
