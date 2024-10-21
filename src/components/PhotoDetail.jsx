import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LoadingIndicator from "./LoadingIndicator";
import { getPhotoById } from "../api/api";
import { firstLetterToUpperCase } from "../utils";

export default function PhotoDetail() {
  const { id } = useParams();
  const { data, error, isLoading } = useQuery(["photo", id], () =>
    getPhotoById(id)
  );

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>No photo found</div>;
  }

  return (
    <Stack justifyContent="center" padding={{ xs: 4, sm: 6, md: 8 }} mb={4}>
      <Stack
        width="100%"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        my={4}
      >
        <Link to="/photos" style={{ textDecoration: "none", color: "black" }}>
          <ArrowBackIcon color="black" />
        </Link>
        <Typography variant="h4" fontWeight={600} textAlign="center">
          Photo Detail
        </Typography>
        <FavoriteBorderIcon />
      </Stack>
      <Stack width="100%" alignItems="center">
        <img
          src={data.urls.regular}
          alt={data.description}
          style={{ width: "50%", height: "auto" }}
        />
        <Typography
          gutterBottom
          variant="h5"
          fontWeight={600}
          textAlign="center"
          my={2}
        >
          {data.alt_description
            ? firstLetterToUpperCase(data.alt_description)
            : "Image Title"}
        </Typography>
        <Stack width="100%" gap={2} mt={2}>
          <Stack textAlign="center" px={{ xs: 4, sm: 8, md: 16 }}>
            <Typography variant="h6" fontWeight={600}>
              Author
            </Typography>
            <Typography variant="body1">{data.user.name}</Typography>
          </Stack>
          <Stack textAlign="center" px={{ xs: 4, sm: 8, md: 16 }}>
            <Typography variant="h6" fontWeight={600}>
              Description
            </Typography>
            <Typography variant="body1">
              {data.description
                ? firstLetterToUpperCase(data.description)
                : firstLetterToUpperCase(data.alt_description)}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
