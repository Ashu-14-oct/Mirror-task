# Mirror E-Commerce API

Mirror E-Commerce API is a Node.js-based RESTful API designed for managing products and variants in an e-commerce system. It provides essential features such as product creation, updating, deletion, and searching. The API follows a test-driven development (TDD) approach, ensuring robustness and reliability.

## Features

- **Product and Variant Operations:**
  - Create, update, delete, and retrieve products.
  - Products have attributes like name, description, and price.
  - Variants can be associated with products, having details like SKU, additional cost, and stock count.

- **Search Functionality:**
  - Search products by name, description, or variant name.

## Getting Started

Follow these steps to set up and run the Mirror E-Commerce API on your local machine.

### Prerequisites

- Node.js installed
- MongoDB Atlas

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/ashu-14-oct/Mirror-task.git

2. **Navigate to the project directory**

   ```bash
   cd Mirror-task

3. **Install dependencies:**

   ```bash
   npm install

4. **Configure MongoDB connection:**

   - Edit config/mongoose.js and set your MongoDB connection URI.

5. **Run the server:**

   ```bash
   npm install

### Usage

- Create a Product: `POST /products`
- Get All Products: `GET /products`
- Get a Product by ID: `GET /products/:productId`
- Update a Product: `PUT /products/:productId`
- Delete a Product: `DELETE /products/:productId`
- Search Products: `GET /products/search?q=query`


