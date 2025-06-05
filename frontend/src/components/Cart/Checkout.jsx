import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PayPalButton from "./PayPalButton";

const cart = {
  products: [
    {
      ProductId: 1,
      name: "T-Shirt",
      size: "M",
      color: "Red",
      quantity: 1,
      price: 150,
      image: "https://picsum.photos/200?random=1",
    },
    {
      ProductId: 2,
      name: "Skirt",
      size: "M",
      color: "Blue",
      quantity: 6,
      price: 100,
      image: "https://picsum.photos/200?random=2",
    },
  ],
  totalPrice: 250,
};
const Checkout = () => {
  const navigate = useNavigate();
  const [checkoutId, setCheckoutId] = useState(null);
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });
  const handleCreateCheckout = (e) => {
    e.preventDefault();
    setCheckoutId(123);
  };
  const handlePaymentSuccess = (details) => {
    console.log("Payment successful", details);
    navigate("/order-confirmation");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter">
      {/* Left Section */}
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-2xl uppercase mb-6"> Checkout</h2>
        <form onSubmit={handleCreateCheckout}>
          <h3 className="text-lg mb-4">Contact Details</h3>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value="user@example.com"
              className="w-full p-2 border rounded"
              disabled
            />
          </div>
          <h3 className="text-lg mb-4">Delivery</h3>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">First Name</label>
              <input
                type="text"
                value={shippingAddress.firstName}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    firstName: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Last Name</label>
              <input
                type="text"
                value={shippingAddress.lastName}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    lastName: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Address</label>
            <input
              type="text"
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  address: e.target.value,
                })
              }
              value={shippingAddress.address}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">City</label>
              <input
                type="text"
                value={shippingAddress.city}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    city: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Postal code</label>
              <input
                type="text"
                value={shippingAddress.postalCode}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    postalCode: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Country</label>
            <input
              type="text"
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  country: e.target.value,
                })
              }
              value={shippingAddress.country}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Phone number</label>
            <input
              type="text"
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  phone: e.target.value,
                })
              }
              value={shippingAddress.phone}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mt-6">
            {!checkoutId ? (
              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded"
              >
                Continue to Payment
              </button>
            ) : (
              <div>
                <h3 className="text-lg mb-4">Pay with PayPal</h3>
                {/* PayPal component */}
                <PayPalButton
                  amount={100}
                  onSuccess={handlePaymentSuccess}
                  onError={(err) => alert("Payment failed. Try again")}
                />
              </div>
            )}
          </div>
        </form>
      </div>
      {/* Right section */}
      <div className="bg-gray-0 p-6 rounded-lg">
        <h3 className="text-lg mb-4 ">Order summary</h3>
        <div className="border-t py-4 mb-4">
          {cart.products.map((product, index) => (
            <div
              key={index}
              className="flex items-start justify-between py-2 border-b"
            >
              {/* Left Side: Image + Info */}
              <div className="flex items-start">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-24 object-cover mr-4"
                />
                <div>
                  <h3 className="text-md font-medium">{product.name}</h3>
                  <p className="text-gray-500">Size: {product.size}</p>
                  <p className="text-gray-500">Price: ${product.price}</p>
                </div>
              </div>

              {/* Right Side: Price */}
              <p className="text-xl font-semibold ml-auto">
                ${product.price?.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center text-lg mb-4">
          <p>Subtotal</p>
          <p>${cart.totalPrice?.toLocaleString()}</p>
        </div>
        <div className="flex justify-between items-center text-lg">
          <p>Shipping</p>
          <p>FREE</p>
        </div>
        <div className="flex justify-between items-center text-lg mt-4 border-t pt-4">
          <p>Total</p>
          <p>${cart.totalPrice?.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
