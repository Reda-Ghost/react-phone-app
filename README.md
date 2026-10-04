# 📱 Phone Store — React

A simple phone store application built with **React** as a practice project for managing application state with `useReducer` and calculating derived data with `useMemo`.

## 🚀 Features

* 📱 Display available phones
* 🛒 Add phones to the shopping cart
* ➕ Increase product quantity
* ➖ Decrease product quantity
* 🗑️ Remove products from the cart
* 🔄 Clear the entire cart
* 💰 Calculate the total cart price
* 📊 Manage cart state with `useReducer`
* ⚡ Optimize total price calculation with `useMemo`
* 📱 Responsive UI using Bootstrap

## 🛠️ Technologies

* React
* JavaScript
* Bootstrap
* Vite
* React Hooks

  * `useReducer`
  * `useMemo`

## 🧠 React Concepts Practiced

This project was created to practice important React concepts:

### `useReducer`

The application uses `useReducer` to manage the products and shopping cart state.

The reducer handles actions such as:

```text
ADD_TO_CART
REMOVE_FROM_CART
INCREASE_QUANTITY
DECREASE_QUANTITY
CLEAR_CART
```

### `useMemo`

`useMemo` is used to calculate the total price of the cart based on the selected products and their quantities.

```js
const totalPrice = useMemo(() => {
  return state.purchasedProducts.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );
}, [state.purchasedProducts]);
```

## 📂 Project Structure

```text
src/
├── App.jsx
├── main.jsx
└── ...
```

The main application logic is currently implemented in `App.jsx`.

## ⚙️ Installation

Clone the repository:

```bash
git clone YOUR_REPOSITORY_URL
```

Go to the project directory:

```bash
cd phone-store
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Then open the local URL provided by Vite in your browser.

## 🎯 Purpose

This project is part of my React learning journey.

The main goal was to practice managing more complex state with `useReducer`, working with arrays and objects immutably, handling cart operations, and using `useMemo` for derived values.

## 🔮 Future Improvements

Possible Next improvements for the project:

* Connect the application to a real API
* Add phone images and more product information
* Add product search
* Add product filtering
* Add sorting by price
* Add React Context for global state management
* Add React Router
* Add localStorage for cart persistence
* Add unit tests

## 👨‍💻 Author

**Reda**

Frontend Developer 
