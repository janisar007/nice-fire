import { useState } from "react";
import type { ChangeEvent } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import type { UploadTask } from "firebase/storage";
import { storage } from "../../firebase";
import {
  Box,
  Button,
  CircularProgress,
  LinearProgress,
  Paper,
  Stack,
  Typography,
  Avatar,
  TextField,
  Grid,
} from "@mui/material";
import { CloudUpload, Delete } from "@mui/icons-material";

interface UploadProgress {
  file: File;
  progress: number;
  url?: string;
  error?: string;
  task?: UploadTask;
}

const ImageUpload = ({
  onUploadComplete,
}: {
  onUploadComplete?: (urls: string[]) => void;
}) => {
  const [uploads, setUploads] = useState<UploadProgress[]>([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);

      // Validate files
      const invalidFiles = files.filter((file) => {
        return !file.type.match("image.*") || file.size > 5 * 1024 * 1024;
      });

      if (invalidFiles.length > 0) {
        setError("Some files are invalid (must be images under 5MB)");
        return;
      }

      setError(null);

      // Add new files to upload queue
      const newUploads = files.map((file) => ({
        file,
        progress: 0,
      }));

      setUploads((prev) => [...prev, ...newUploads]);
    }
  };

  const handleUpload = async () => {
    if (uploads.length === 0) return;

    setIsUploading(true);
    setError(null);

    // Filter out already completed uploads
    const uploadsToProcess = uploads.filter((u) => !u.url && !u.error);

    try {
      const uploadPromises = uploadsToProcess.map((upload) => {
        return new Promise<string>(async (resolve, reject) => {
          const storageRef = ref(
            storage,
            `images/${Date.now()}_${upload.file.name}`
          );
          const uploadTask: UploadTask = uploadBytesResumable(
            storageRef,
            upload.file
          );

          // Update state with the task for potential cancellation
          setUploads((prev) =>
            prev.map((u) =>
              u.file === upload.file ? { ...u, task: uploadTask } : u
            )
          );

          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              );
              // Update progress for this file
              setUploads((prev) =>
                prev.map((u) =>
                  u.file === upload.file ? { ...u, progress } : u
                )
              );
            },
            (error) => {
              // Handle unsuccessful uploads
              setUploads((prev) =>
                prev.map((u) =>
                  u.file === upload.file ? { ...u, error: error.message } : u
                )
              );
              reject(error);
            },
            async () => {
              // Handle successful upload
              try {
                const downloadURL = await getDownloadURL(
                  uploadTask.snapshot.ref
                );
                setUploads((prev) =>
                  prev.map((u) =>
                    u.file === upload.file
                      ? {
                          ...u,
                          url: downloadURL,
                          progress: 100,
                        }
                      : u
                  )
                );
                resolve(downloadURL);
              } catch (error) {
                setUploads((prev) =>
                  prev.map((u) =>
                    u.file === upload.file
                      ? {
                          ...u,
                          error: "Failed to get download URL",
                        }
                      : u
                  )
                );
                reject(error);
              }
            }
          );
        });
      });

      // Wait for all uploads to complete
      const urls = await Promise.all(uploadPromises);

      // Filter out successful URLs and call the completion handler
      const successfulUrls = urls.filter((url) => typeof url === "string");
      if (onUploadComplete && successfulUrls.length > 0) {
        onUploadComplete(successfulUrls);
      }
    } catch (error) {
      setError("Some uploads failed. See individual files for details.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = (file: File) => {
    // Cancel the upload if it's in progress
    const uploadToRemove = uploads.find((u) => u.file === file);
    if (uploadToRemove?.task) {
      uploadToRemove.task.cancel();
    }

    setUploads((prev) => prev.filter((u) => u.file !== file));
    setError(null);
  };

  const handleRemoveAll = () => {
    // Cancel all in-progress uploads
    uploads.forEach((upload) => {
      if (upload.task && upload.progress < 100) {
        upload.task.cancel();
      }
    });

    setUploads([]);
    setError(null);
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 800, mx: "auto" }}>
      <Typography variant="h6" gutterBottom>
        Upload Images
      </Typography>

      <Stack spacing={3}>
        {/* Selected Files Preview */}
        {uploads.length > 0 && (
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Selected Files ({uploads.length}):
            </Typography>
            <Grid container spacing={2}>
              {uploads.map((upload, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Paper variant="outlined" sx={{ p: 1 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 1,
                        gap: 2, // Add some gap between items
                        width: "100%", // Ensure full width
                        position: "relative", // For absolute positioning if needed
                      }}
                    >
                      <Avatar
                        src={URL.createObjectURL(upload.file)}
                        variant="rounded"
                        sx={{
                          width: 60,
                          height: 60,
                          flexShrink: 0,
                        }} // Prevent shrinking
                      />
                      <Box
                        sx={{
                          flexGrow: 1,
                          minWidth: 0, // Important for text truncation
                          // overflow: 'hidden', // Prevent overflow
                        }}
                      >
                        <Typography variant="body2" noWrap>
                          {upload.file.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {(upload.file.size / 1024).toFixed(1)} KB
                        </Typography>
                      </Box>

                      <Button
                        size="small"
                        onClick={() => handleRemoveImage(upload.file)}
                        disabled={isUploading}
                        sx={{
                          flexShrink: 0, // Prevent shrinking
                          ml: "auto", // Push to the right
                        }}
                      >
                        <Delete fontSize="small" />
                      </Button>
                    </Box>

                    {upload.error ? (
                      <Typography color="error" variant="caption">
                        {upload.error}
                      </Typography>
                    ) : (
                      <LinearProgress
                        variant="determinate"
                        value={upload.progress}
                        color={upload.url ? "success" : "primary"}
                      />
                    )}

                    {upload.url && !isUploading && (
                      <TextField
                        value={upload.url}
                        size="small"
                        InputProps={{ readOnly: true }}
                        fullWidth
                        margin="dense"
                      />
                    )}
                  </Paper>
                </Grid>
              ))}
            </Grid>

            {uploads.length > 1 && (
              <Button
                onClick={handleRemoveAll}
                color="error"
                startIcon={<Delete />}
                sx={{ mt: 2 }}
                disabled={isUploading}
              >
                Remove All
              </Button>
            )}
          </Box>
        )}

        {/* Upload Controls */}
        <Box>
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="image-upload-input"
            type="file"
            onChange={handleImageChange}
            disabled={isUploading}
            multiple
          />
          <label htmlFor="image-upload-input">
            <Button
              component="span"
              variant="outlined"
              color="primary"
              startIcon={<CloudUpload />}
              disabled={isUploading}
              fullWidth
            >
              Choose Images
            </Button>
          </label>
        </Box>

        {/* Upload Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpload}
          disabled={isUploading || uploads.length === 0}
          fullWidth
          startIcon={
            isUploading ? <CircularProgress size={20} color="inherit" /> : null
          }
        >
          {isUploading
            ? `Uploading... (${
                uploads.filter((u) => u.progress === 100).length
              }/${uploads.length})`
            : "Upload Images"}
        </Button>

        {/* Overall Error Message */}
        {error && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )}

        {/* Summary when uploads complete */}
        {!isUploading && uploads.some((u) => u.url) && (
          <Box>
            <Typography variant="subtitle1">
              Upload Complete: {uploads.filter((u) => u.url).length}/
              {uploads.length} successful
            </Typography>
          </Box>
        )}
      </Stack>
    </Paper>
  );
};

export default ImageUpload;
