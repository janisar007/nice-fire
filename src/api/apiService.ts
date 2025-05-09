import { baseService } from "./baseService";

export const apiService = {
  createPost: (formData: any) => {
    return baseService.post("/admin/create/post", formData);
  },

  getSinglePost: async (post_id: string) => {
    return baseService
      .get(
        `/admin/get/singlepost?org_id=${localStorage.getItem(
          "orgId"
        )}&user_id=${localStorage.getItem("userId")}&post_id=${post_id}`
      )
      .then((response) => response.data) // Extract and return the data
      .catch((error) => {
        console.error("Error fetching post:", error);
        throw error; // Re-throw the error after logging
      });
  },

  getAllUserPost: async () => {
    return baseService
      .get(
        `/admin/get/alluserpost?org_id=${localStorage.getItem('orgId')}&user_id=${localStorage.getItem('userId')}`
      )
      .then((response) => response.data) // Extract and return the data
      .catch((error) => {
        console.error("Error fetching post:", error);
        throw error; // Re-throw the error after logging
      });
  },
};




// export async function apiUpdatePost(post_id:string) { // org done
//     return ApiService.fetchData<any>({
//         url: `admin/update/post`,
//         method: 'put',
//         data: { user_id: localStorage.getItem('userId'), org_id:localStorage.getItem('orgId'), post_id:post_id },
//     }).then((response) => {
//         return response.data
//     })
// }

// export async function apiDeleteSinglePost(post_id:string) { // org done
//     return ApiService.fetchData<any>({
//         url: `admin/delete/singlepost`,
//         method: 'delete',
//         data: { user_id: localStorage.getItem('userId'),
//             org_id:localStorage.getItem('orgId'),
//             post_id:post_id,
//          },
//     }).then((response) => {
//         return response.data
//     })
// }
