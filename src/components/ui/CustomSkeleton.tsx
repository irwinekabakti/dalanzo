import { FC } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import { RootState, useAppSelector } from "../../store";

interface MediaProps {
  loading?: boolean;
}

const MediaSkeleton: FC<MediaProps> = ({ loading }) => {
  const { products } = useAppSelector((state: RootState) => state.AllProducts);

  return (
    <>
      {(loading ? Array.from(new Array(3)) : products).map((item, index) => (
        <Box key={index} className="mx-auto" sx={{ width: 300, my: 5 }}>
          {item ? (
            <img
              className="mx-auto"
              style={{ width: 210, height: 118 }}
              alt={item.title}
              src={item.src}
            />
          ) : (
            <Skeleton variant="rectangular" width={300} height={150} />
          )}
          {item ? (
            <Box sx={{ pr: 2 }}>
              <Typography gutterBottom variant="body2">
                {item.title}
              </Typography>
              <Typography
                variant="caption"
                sx={{ display: "block", color: "text.secondary" }}
              >
                {item.description}
              </Typography>
            </Box>
          ) : (
            <Box sx={{ pt: 0.5 }}>
              <Skeleton />
              <Skeleton width="60%" />

              <div className="flex justify-between mt-4">
                <Skeleton width="20%" />
                <Skeleton width="20%" />
              </div>
            </Box>
          )}
        </Box>
      ))}
    </>
  );
};

export default MediaSkeleton;
