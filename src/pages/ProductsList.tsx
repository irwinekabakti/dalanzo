import { FC, useEffect, useRef, useState } from "react";
import {
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  TextField,
  InputAdornment,
} from "@mui/material";
import MediaSkeleton from "../components/ui/CustomSkeleton";
import Hero from "../components/Hero";
import MediaCard from "../components/ui/MediaCard";
import { getAllProducts } from "../store/asyncThunk/products-thunk";
import { fetchCategories } from "../store/asyncThunk/categories-thunk";
import { STATUS } from "../utils/status";
import { useAppDispatch, useAppSelector } from "../store";
import { ProductProps } from "../types/type";
import { IoSearch } from "react-icons/io5";
import { setSearchProducts } from "../store/slice/products-slice";
import { setSelectedCategory } from "../store/slice/categories-slice";

const ProductsList: FC = () => {
  const dispatch = useAppDispatch();
  const { products, status, error } = useAppSelector(
    (state) => state.AllProducts
  );
  const { categories, status: categoryStatus } = useAppSelector(
    (state) => state.categoriesProducts
  );
  const searchTerm = useAppSelector(
    (state) => state.AllProducts.searchProducts
  );
  const selectedCategory = useAppSelector(
    (state) => state.categoriesProducts.selectedCategory
  );

  const [filteredProducts, setFilteredProducts] = useState(products || []);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchProducts(e.target.value));
  };

  const handleCategoryChange = (e: SelectChangeEvent<string>) => {
    dispatch(setSelectedCategory(e.target.value));
  };

  useEffect(() => {
    if (categoryStatus === STATUS.IDLE) {
      dispatch(fetchCategories());
    }
    if (status === STATUS.IDLE) {
      dispatch(getAllProducts());
    }
  }, [dispatch, categoryStatus, status]);

  useEffect(() => {
    if (products) {
      const filtered = products.filter((product: ProductProps) => {
        const isInCategory =
          selectedCategory === "all" ||
          product.category.toLowerCase() === selectedCategory.toLowerCase();
        const matchesSearch = product.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

        return isInCategory && matchesSearch;
      });
      setFilteredProducts(filtered);
    }
  }, [searchTerm, products, selectedCategory]);

  if (status === STATUS.LOADING) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 my-4 mx-4 md:mx-8">
        {[...Array(12)].map((_, index) => (
          <Box sx={{ overflow: "hidden" }} key={index}>
            <MediaSkeleton loading />
          </Box>
        ))}
      </div>
    );
  }

  if (status === STATUS.FAILED) {
    return <div>Error loading products: {error}</div>;
  }

  return (
    <>
      <Hero />

      <div className="py-4 block md:flex justify-between mx-4 md:mx-8">
        <TextField
          inputRef={searchInputRef}
          placeholder="Search products..."
          variant="outlined"
          onChange={handleSearchInputChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IoSearch />
              </InputAdornment>
            ),
          }}
          sx={{
            width: { xs: "100%", sm: "100%", md: 300 },
            mr: { xs: 0, sm: 2 },
            mb: { xs: 2, sm: 0 },
          }}
        />

        <FormControl
          sx={{
            width: { xs: "100%", sm: "100%", md: 300 },
          }}
        >
          <InputLabel id="category-select-label">Category</InputLabel>
          <Select
            labelId="category-select-label"
            id="category-select"
            value={selectedCategory}
            label="Category"
            onChange={handleCategoryChange}
          >
            <MenuItem value="all">All Categories</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div className="mx-auto">
        {filteredProducts.length === 0 ? (
          <div className="flex justify-center items-center my-60">
            <h1 className="text-red-600 text-2xl md:text-4xl">
              Item not found
            </h1>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 my-4 mx-4 md:mx-8">
            <MediaCard productsFilter={filteredProducts} />
          </div>
        )}
      </div>
    </>
  );
};

export default ProductsList;
