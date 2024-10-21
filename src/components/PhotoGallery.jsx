import { useCallback, useMemo, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Photo from "./Photo";
import LoadingIndicator from "./LoadingIndicator";
import { getImages } from "../api/api";
import { firstLetterToUpperCase } from "../utils";

export default function PhotoGallery({ query }) {
  // Observer to check if the last element is in view
  const observer = useRef(new IntersectionObserver(() => {}));

  // Fetch data
  const { data, error, fetchNextPage, hasNextPage, isFetching, isLoading } =
    useInfiniteQuery({
      queryKey: ["images", query],
      queryFn: ({ pageParam = 1 }) => getImages({ query, pageParam }),
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.results.length ? allPages.length + 1 : undefined;
      },
    });

  // Check if the last element is in view
  const lastElementRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetching) {
          fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [fetchNextPage, hasNextPage, isFetching, isLoading]
  );

  // Combine all pages into a single array
  const images = useMemo(() => {
    return data?.pages.reduce((acc, page) => {
      return [...acc, ...page.results];
    }, []);
  }, [data]);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!images) {
    return <div>No images found</div>;
  }

  return (
    <Stack justifyContent="center" margin={{ xs: 4, sm: 6, md: 8 }}>
      <Stack alignItems="center">
        <Typography variant="h4" fontWeight={600} textAlign="center" my={4}>
          Photo Gallery
        </Typography>
        <Grid container spacing={2}>
          {images &&
            images.map((image, index) => {
              return (
                <Grid
                  key={image.id}
                  size={{ xs: 12, sm: 6, md: 3 }}
                  ref={images.length === index + 1 ? lastElementRef : null}
                >
                  <Photo
                    id={image.id}
                    url={image.urls.regular}
                    title={
                      image.alt_description
                        ? firstLetterToUpperCase(image.alt_description)
                        : "Image Title"
                    }
                    author={image.user.name}
                    description={
                      image.description
                        ? firstLetterToUpperCase(image.description)
                        : firstLetterToUpperCase(image.alt_description)
                    }
                  />
                </Grid>
              );
            })}
          {isFetching && <LoadingIndicator />}
          {!hasNextPage && (
            <Stack width="100%" alignItems="center" marginTop={2}>
              <p>You have reached the end of the list.</p>
            </Stack>
          )}
        </Grid>
      </Stack>
    </Stack>
  );
}
