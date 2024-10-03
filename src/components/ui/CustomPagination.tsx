/*
import { FC } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useAppDispatch, useAppSelector } from "../../store";
import { setCurrentPage } from "../../store/slice/products-slice";

interface CustomPaginationProps {
  totalItems: number;
  itemsPerPage: number;
}

const CustomPagination: FC<CustomPaginationProps> = ({
  totalItems,
  itemsPerPage,
}) => {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector((state) => state.product.currentPage);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    dispatch(setCurrentPage(page));
  };

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
*/
