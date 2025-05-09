import { useEffect, useState } from "react";
import RecipeReviewCard from "../../../components/mui/RecipeReviewCard";
import { Button, Grid, ListItem } from "@mui/material";
import { apiService } from "../../../api/apiService";
const YourPost = () => {
  // const role = localStorage.getItem('role') || ''

  const list = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const [allPosts, setAllPosts] = useState<any>();
  const [postLoading, setPostLoading] = useState<any>(false);

  useEffect(() => {
    const fetchData = async () => {
      setPostLoading(true);

      try {
        const res = await apiService.getAllUserPost();
        console.log(res);

        setAllPosts(res.data);
      } catch (error: any) {
        console.log(error);

        throw new Error(error);
      } finally {
        setPostLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col h-full">

        <div className="flex flex-row-reverse w-full">
        <Button href="/newpost" variant="contained">
            Add New Post
        </Button>

        </div>

      <div className="flex flex-wrap gap-4">
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {allPosts &&
            allPosts?.map((post: any) => {
              return (
                <Grid size={4} key={post._id}>
                  <ListItem>
                    <RecipeReviewCard post={post} />
                  </ListItem>
                </Grid>
              );
            })}
        </Grid>
      </div>
    </div>
  );
};

export default YourPost;
