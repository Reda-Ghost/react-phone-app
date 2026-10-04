import { useMemo, useReducer } from "react";

const products = [
  {
    id: 1,
    brand: "Apple",
    name: "iPhone 17 Pro",
    storage: "256GB",
    price: 1199,
    image:
      "https://macapples.ru/images/iphone-17-pro-review/iphone-17-pro-display.webp",
  },
  {
    id: 2,
    brand: "Samsung",
    name: "Galaxy S25 Ultra",
    storage: "256GB",
    price: 1299,
    image:
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    brand: "Apple",
    name: "iPhone 16 Pro Max",
    storage: "512GB",
    price: 1399,
    image:
      "https://at-store.ru/uploadedFiles/eshopimages/big/33cbaf5c-743b-4189-b272-79b03f23.jpg",
  },
  {
    id: 4,
    brand: "Samsung",
    name: "Galaxy S25+",
    storage: "256GB",
    price: 999,
    image:
      "https://imgproxy.onliner.by/oY4ywgAL_R9gfXJrcP7Lewz_YS4JKZ8oGQaaEUNrV4k/w:700/h:550/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2UvMjAyNS80/N2IwM2FkZTYxYzY0/ODhkYTU1MDIyMDZl/YjU5MTI4My5qcGc",
  },
];

const purchasedProducts = [];

function reducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingItem = state.purchasedProducts.find(
        (item) => item.id === action.payload.id,
      );

      if (!existingItem) {
        return {
          ...state,
          purchasedProducts: [...state.purchasedProducts, action.payload],
        };
      }

      return state;
    }

    case "REMOVE_FROM_CART": {
      return {
        ...state,
        purchasedProducts: state.purchasedProducts.filter(
          (item) => item.id !== action.payload.id,
        ),
      };
    }

    case "INCREASE_QUANTITY":
      return {
        ...state,
        purchasedProducts: state.purchasedProducts.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      };

    case "DECREASE_QUANTITY":
      return {
        ...state,
        purchasedProducts: state.purchasedProducts.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.max(1, item.quantity - 1) }
            : item,
        ),
      };

    case "CLEAR_CART":
      return {
        ...state,
        purchasedProducts: [],
      };

    default:
      return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, {
    products,
    purchasedProducts,
  });

  const totalPrice = useMemo(() => {
    return state.purchasedProducts.reduce(
      (accumulator, item) => accumulator + item.price * item.quantity,
      0,
    );
  }, [state.purchasedProducts]);

  const totalItems = useMemo(() => {
    return state.purchasedProducts.reduce(
      (accumulator, item) => accumulator + item.quantity,
      0,
    );
  }, [state.purchasedProducts]);

  return (
    <section className="bg-light min-vh-100 py-5">
      <div className="container">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-5">
          <div>
            <h1 className="fw-bold mb-1">Phone Store</h1>
            <p className="text-muted mb-0">Find your next smartphone</p>
          </div>

          <div className="bg-dark text-white rounded-pill px-3 py-2">
            <i className="bi bi-cart3 me-2"></i>
            Cart
            <span className="badge bg-primary ms-2">{totalItems}</span>
          </div>
        </div>

        <div className="row g-4">
          {/* PRODUCTS */}
          <div className="col-lg-8">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3 className="fw-bold mb-0">Latest Phones</h3>

              <span className="text-muted">
                {state.products.length} products
              </span>
            </div>

            <div className="row g-4">
              {state.products.map((product) => {
                const isPurchased = state.purchasedProducts.some(
                  (item) => item.id === product.id,
                );

                return (
                  <div
                    className="col-md-6"
                    key={product.id}
                  >
                    <div className="card border-0 shadow-sm h-100 rounded-4 overflow-hidden">
                      {/* Image */}
                      <div className="bg-white text-center p-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="img-fluid"
                          style={{
                            height: "240px",
                            width: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </div>

                      {/* Product info */}
                      <div className="card-body p-4">
                        <small className="text-muted fw-semibold">
                          {product.brand}
                        </small>

                        <h4 className="fw-bold mt-1 mb-2">{product.name}</h4>

                        <div className="d-flex gap-2 mb-3">
                          <span className="badge bg-light text-dark border">
                            {product.storage}
                          </span>

                          <span className="badge bg-light text-dark border">
                            5G
                          </span>
                        </div>

                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <small className="text-muted">Starting from</small>

                            <h4 className="fw-bold text-success mb-0">
                              ${product.price}
                            </h4>
                          </div>

                          <button
                            className={`btn px-4 rounded-pill ${
                              isPurchased ? "btn-success" : "btn-dark"
                            }`}
                            disabled={isPurchased}
                            onClick={() =>
                              dispatch({
                                type: "ADD_TO_CART",
                                payload: {
                                  ...product,
                                  quantity: 1,
                                },
                              })
                            }
                          >
                            {isPurchased ? (
                              <>
                                <i className="bi bi-check-lg me-1"></i>
                                Added
                              </>
                            ) : (
                              <>
                                <i className="bi bi-cart-plus me-1"></i>
                                Add
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CART */}
          <div className="col-lg-4">
            <div className="card border-0 shadow-sm rounded-4 sticky-lg-top">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <h3 className="fw-bold mb-1">Your Cart</h3>
                    <small className="text-muted">
                      {totalItems} item{totalItems !== 1 ? "s" : ""}
                    </small>
                  </div>

                  {state.purchasedProducts.length > 0 && (
                    <button
                      className="btn btn-sm btn-outline-danger rounded-pill"
                      onClick={() => dispatch({ type: "CLEAR_CART" })}
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Empty cart */}
                {state.purchasedProducts.length === 0 && (
                  <div className="text-center py-5">
                    <div
                      className="bg-light rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                      style={{
                        width: "70px",
                        height: "70px",
                      }}
                    >
                      <i className="bi bi-cart-x fs-2 text-muted"></i>
                    </div>

                    <h5 className="fw-bold">Your cart is empty</h5>

                    <p className="text-muted small mb-0">
                      Add a phone to start shopping.
                    </p>
                  </div>
                )}

                {/* Cart items */}
                <div className="d-flex flex-column gap-3">
                  {state.purchasedProducts.map((purchased) => (
                    <div
                      className="border rounded-4 p-3"
                      key={purchased.id}
                    >
                      <div className="d-flex gap-3">
                        <img
                          src={purchased.image}
                          alt={purchased.name}
                          style={{
                            width: "70px",
                            height: "70px",
                            objectFit: "contain",
                          }}
                          className="bg-light rounded-3"
                        />

                        <div className="flex-grow-1">
                          <div className="d-flex justify-content-between">
                            <div>
                              <h6 className="fw-bold mb-1">{purchased.name}</h6>

                              <small className="text-muted">
                                {purchased.storage}
                              </small>
                            </div>

                            <button
                              className="btn btn-sm text-danger  p-0"
                              onClick={() =>
                                dispatch({
                                  type: "REMOVE_FROM_CART",
                                  payload: purchased,
                                })
                              }
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="bi bi-trash"
                                viewBox="0 0 16 16"
                              >
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                              </svg>
                            </button>
                          </div>

                          <div className="d-flex justify-content-between align-items-center mt-3">
                            <div className="d-flex align-items-center border rounded-pill">
                              <button
                                className="btn btn-sm rounded-circle"
                                onClick={() =>
                                  dispatch({
                                    type: "DECREASE_QUANTITY",
                                    payload: purchased,
                                  })
                                }
                              >
                                −
                              </button>

                              <span className="fw-bold px-2">
                                {purchased.quantity}
                              </span>

                              <button
                                className="btn btn-sm rounded-circle"
                                onClick={() =>
                                  dispatch({
                                    type: "INCREASE_QUANTITY",
                                    payload: purchased,
                                  })
                                }
                              >
                                +
                              </button>
                            </div>

                            <strong>
                              ${purchased.price * purchased.quantity}
                            </strong>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Total */}
                {state.purchasedProducts.length > 0 && (
                  <>
                    <hr className="my-4" />

                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="text-muted">Subtotal</span>

                      <span className="fw-semibold">${totalPrice}</span>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <span className="text-muted">Shipping</span>

                      <span className="text-success fw-semibold">Free</span>
                    </div>

                    <div className="bg-dark text-white rounded-4 p-3">
                      <div className="d-flex justify-content-between align-items-center">
                        <span>Total</span>

                        <h3 className="fw-bold mb-0">${totalPrice}</h3>
                      </div>
                    </div>

                    <button className="btn btn-primary w-100 rounded-pill py-3 mt-3 fw-semibold">
                      Checkout
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
