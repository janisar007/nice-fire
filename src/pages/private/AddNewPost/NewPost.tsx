import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Chip,
  Autocomplete,
  Typography,
  Paper,
  Grid,
} from "@mui/material";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import ImageUpload from "../../../components/utills/ImageUpload"; // Adjust the import path as needed
import Toast from "../../../components/mui/components/Toast";
import useToast from "../../../components/mui/hooks/useToast";

import { apiService } from "../../../api/apiService";

interface PostFormData {
  title: string;
  description: string;
  post_images: string[]; // Changed from File[] to string[]
  org_id: string;
  user_id: string;
  category: string[];
  tags: string[];
  location: string;
}

const NewPost = () => {
  const org_id: any = localStorage.getItem("orgId");
  const user_id: any = localStorage.getItem("userId");

  const [formData, setFormData] = useState<PostFormData>({
    title: "",
    description: "",
    post_images: [],
    org_id: org_id,
    user_id: user_id,
    category: [],
    tags: [],
    location: "",
  });

  const { toastOpen, toastMessage, toastType, showToast, hideToast } =
    useToast();

  const [tagInput, setTagInput] = useState<string>("");
  // const [noteInput, setNoteInput] = useState<string>('')

  // const statusOptions = ['draft', 'published', 'archived']
  const categoryOptions = ["news", "event", "announcement", "update", "other"];
  // const stateOptions = ['active', 'inactive', 'pending']

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (urls: string[]) => {
    setFormData((prev) => ({ ...prev, post_images: urls }));
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput)) {
      setFormData((prev) => ({ ...prev, tags: [...prev.tags, tagInput] }));
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would typically send the data to your API

    try {
      const res: any = await apiService.createPost(formData);

      console.log(res);

      if (res.data.code === 200) {
        showToast("Post created successfully!", "success");
        setFormData({
          title: "",
          description: "",
          post_images: [],
          org_id: org_id,
          user_id: user_id,
          category: [],
          tags: [],
          location: "",
        });
      } else {
        showToast(res.errorMessage, "error");
      }
    } catch (error: any) {
      console.log(error);

      showToast(error.message, "error");

      throw new Error(error);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Paper elevation={3} sx={{ p: 4, maxWidth: 800, mx: "auto" }}>
        <Typography variant="h5" gutterBottom>
          Create New Post
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Title */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Grid>

            {/* Description */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={4}
                required
              />
            </Grid>

            {/* Images */}
            <Grid item xs={12}>
              <ImageUpload onUploadComplete={handleImageUpload} />
            </Grid>

            {/* Category */}
            <Grid item xs={12} md={6}>
              <Autocomplete
                multiple
                options={categoryOptions}
                value={formData.category}
                onChange={(_, newValue) => {
                  setFormData((prev) => ({
                    ...prev,
                    category: newValue,
                  }));
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Category" />
                )}
              />
            </Grid>

            {/* Tags */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <TextField
                  fullWidth
                  label="Tags"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
                />
                <Button onClick={handleAddTag}>Add</Button>
              </Box>
              <Box sx={{ mt: 1 }}>
                {formData.tags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    onDelete={() => handleRemoveTag(tag)}
                    sx={{ mr: 1, mb: 1 }}
                  />
                ))}
              </Box>
            </Grid>

            {/* Location and State */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
              />
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button type="submit" variant="contained" size="large" fullWidth>
                Create Post
              </Button>
            </Grid>
          </Grid>
        </form>

        <Toast
          open={toastOpen}
          message={toastMessage}
          severity={toastType}
          onClose={hideToast}
        />
      </Paper>
    </LocalizationProvider>
  );
};

export default NewPost;
