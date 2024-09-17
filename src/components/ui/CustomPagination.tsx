import { FC } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { RootState, useAppDispatch, useAppSelector } from "../../store";
import { setCurrentPage } from "../../store/slice/products-slice";

const CustomPagination: FC = () => {
  const dispatch = useAppDispatch();
  const { products, currentPage, itemsPerPage } = useAppSelector(
    (state: RootState) => state.product
  );

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    dispatch(setCurrentPage(value));
  };

  const totalPages = Math.ceil(products.length / itemsPerPage);

  return (
    <div className="flex justify-center my-4">
      <Stack spacing={2}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
        />
      </Stack>
    </div>
  );
};

export default CustomPagination;
