import axios from "axios"

const api=axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "https://india-thailand-api-8.onrender.com/api"
    // baseURL:"http://127.0.0.1:3001/api"
})

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api

export const googleAuthApi = async (idToken: string) => {
  return api.post("/auth/google", { idToken });
};


export const fetchDestinations=async({page=1,search="",limit=0}={})=>{
    const response=await api.get("/front/destinations",{
        params:{
            page,
            search:search || undefined,
            limit:limit || undefined,
        }
    })
    return response.data
}
export const fetchTourPackages=async({page=1,search=""}={})=>{
    const response=await api.get("/front/package",{
        params:{
            page,
            search:search || undefined,
            
        }
    })
    return response.data
}


export const fetchTourByPackage = async ({
  SlugOrId,
  page = 1,
  search = "",
}: {
  SlugOrId: string | string[]; // 👈 allow both
  page?: number;
  search?: string;
}) => {
  const slugValue = Array.isArray(SlugOrId) ? SlugOrId[0] : SlugOrId;

  const response = await api.get(`/front/tours/by-package/${slugValue}`, {
    params: { page, search: search || undefined },
  });

  return response.data;
};


export const fetchTourDetails=async(SlogOrId:String)=>{
  const response=await api.get(`/front/tours/${SlogOrId}`)
  return response.data
}


// export const fetchTourByDestination=async(SlugOrId:String)=>{
//   const response=await api.get(`/front/by-destination/${SlugOrId}`)
//   return response.data
// }
export const fetchTourByDestination = async ({
  SlugOrId,
  page = 1,
  search = "",
}: {
  SlugOrId: string | string[]; // 👈 allow both
  page?: number;
  search?: string;
}) => {
  const slugValue = Array.isArray(SlugOrId) ? SlugOrId[0] : SlugOrId;

  const response = await api.get(`/front/by-destination/${SlugOrId}`, {
    params: { page, search: search || undefined },
  });

  return response.data;
};


export const fetchAllBlog=async({page=1,search=""}={})=>{
    const response=await api.get("/front/blog",{
        params:{
            page,
            search:search || undefined,
            
        }
    })
    return response.data
}

export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("image", file);
  // const token = JSON.parse(localStorage.getItem("user") || "{}")?.token || "";
  const res = await api.post(
    "/upload-image",
    formData,
      );
  return res.data.imageUrl || res.data.path || res.data.data?.url;
};