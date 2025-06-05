import { useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";
import FilterSidebar from "../components/Products/FilterSidebar";
import SortOptions from "../components/Products/SortOptions";
import ProductGrid from "../components/Products/ProductGrid";

const Collection = () => {
  const [products, setProducts] = useState([]);
  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const handleClickOutside = (e) => {
    //Close sidebar if clicked outside
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsSidebarOpen(false);
    }
  };
  //   useEffect(() => {
  //     //Add event listener for clicks
  //     document.addEventListener("mousedown", handleClickOutside);
  //     //Clean event listener
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   });
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      const fetchedProducts = [
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
      setProducts(fetchedProducts);
    }, 1000);
  }, []);
  return (
    <div className="flex flex-col lg:flex-row">
      {/* Mobile filter button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden border p-2 flex justify-center items-center"
      >
        <FaFilter className="mr-2" /> Filters
      </button>
      {/* Filter Sidebar */}
      <div
        ref={sidebarRef}
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}
      >
        <FilterSidebar />
      </div>
      <div className="flex-grow p-4">
        <h2 className="text-2xl uppercase mb-4">All Collection</h2>
        {/* Sort options */}
        <SortOptions />
        {/* Product Grid */}
        <ProductGrid products={products} />
      </div>
    </div>
  );
};

export default Collection;
