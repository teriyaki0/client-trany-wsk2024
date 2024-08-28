import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardHeader,
  Avatar,
  Box,
  Skeleton,
} from "@mui/material";

const SkeletonPost = () => {
  return (
    <Box
      sx={{
        display: "flex",
        marginTop: "30px",
        marginBottom: "30px",
      }}
    >
      <Card
        sx={{
          width: "700px",
        }}
      >
        <CardHeader
          avatar={<Skeleton variant="circular" width={40} height={40} />}
          title={<Skeleton variant="text" width={100} />}
          subheader={<Skeleton variant="text" width={160} />}
        />
        <Skeleton variant="rectangular" height={400} />
        <CardContent>
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="text" width="80%" />
          <Skeleton variant="text" width="90%" />
        </CardContent>
      </Card>
    </Box>
  );
};

export default SkeletonPost;
