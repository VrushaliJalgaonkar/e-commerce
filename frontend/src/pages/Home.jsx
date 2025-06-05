import Hero from "../components/Layout/Hero";
import FeaturedCollection from "../components/Products/FeaturedCollection";
import FeaturesSection from "../components/Products/FeaturesSection";
import GenderCollection from "../components/Products/GenderCollection";
import NewArrivals from "../components/Products/NewArrivals";
import ProductDetails from "../components/Products/ProductDetails";
import ProductGrid from "../components/Products/ProductGrid";

const placeholderProducts = [
  {
    _id: 1,
    name: "Product 1",
    price: 100,
    images: [
      {
        url: "https://picsum.photos/500/500?random=14",
      },
    ],
  },
  {
    _id: 2,
    name: "Product 2",
    price: 500,
    images: [
      {
        url: "https://picsum.photos/500/500?random=15",
      },
    ],
  },
  {
    _id: 3,
    name: "Product 3",
    price: 200,
    images: [
      {
        url: "https://picsum.photos/500/500?random=16",
      },
    ],
  },
  {
    _id: 4,
    name: "Product 4",
    price: 700,
    images: [
      {
        url: "https://picsum.photos/500/500?random=17",
      },
    ],
  },
  {
    _id: 5,
    name: "Product 5",
    price: 100,
    images: [
      {
        url: "https://picsum.photos/500/500?random=18",
      },
    ],
  },
  {
    _id: 6,
    name: "Product 6",
    price: 500,
    images: [
      {
        url: "https://picsum.photos/500/500?random=19",
      },
    ],
  },
  {
    _id: 7,
    name: "Product 7",
    price: 200,
    images: [
      {
        url: "https://picsum.photos/500/500?random=20",
      },
    ],
  },
  {
    _id: 8,
    name: "Product 8",
    price: 700,
    images: [
      {
        url: "https://picsum.photos/500/500?random=21",
      },
    ],
  },
];
const Home = () => {
  return (
    <div>
      <Hero />
      <GenderCollection />
      <NewArrivals />
      {/* Best seller */}
      <h2 className="text-3xl text-center font-bold mb-4">Best Seller</h2>
      <ProductDetails />
      <div className="container mx-auto">
        <h2 className="text-3xl text-center font-bold mb-4">
          Top Wears for Women
        </h2>
        <ProductGrid products={placeholderProducts} />
      </div>
      <FeaturedCollection />
      <FeaturesSection />
    </div>
  );
};

export default Home;
