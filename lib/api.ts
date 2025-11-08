import axios from "axios"

const api=axios.create({
    baseURL:"http://localhost:3001/api"
})

export default api


export const fetchDestinations=async({page=1,search=""}={})=>{
    const response=await api.get("/front/destinations",{
        params:{
            page,
            search:search || undefined,
            
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