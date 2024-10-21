import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";

export default function LoadingIndicator() {
  return (
    <Stack width="100%" justifyContent="center" alignItems="center">
      <CircularProgress color="black" />
    </Stack>
  );
}
