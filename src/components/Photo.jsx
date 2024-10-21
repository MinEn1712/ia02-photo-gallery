import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export default function Photo({ id, url, title, author, description }) {
  return (
    <Link to={`/photos/${id}`} style={{ textDecoration: "none" }}>
      <Card sx={{ width: "100%", minHeight: 400 }}>
        <CardMedia sx={{ height: 200 }} image={url} alt={description} />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            fontWeight={600}
            component="div"
          >
            {title}
          </Typography>
          <Typography variant="body1">
            <b>Author:</b> {author}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}
