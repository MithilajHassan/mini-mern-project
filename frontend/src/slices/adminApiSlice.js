import { apiSlice } from "./apiSlice";

const ADMIN_URL = '/api/admin'

const adminApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        adminLogin:builder.mutation({
            query:(data)=>({
              url:`${ADMIN_URL}`,
              method:'POST',
              body:data
            })
        }),
        dashboard:builder.mutation({
            query:(data)=>{
                let url = `${ADMIN_URL}/dashboard`
                if(data){
                    url = `${ADMIN_URL}/dashboard?search=${data.search}`
                }
                return {
                    url,
                    method:'GET',
                }
            }
        }),
        manageBlock:builder.mutation({
            query:(data)=>({
                url:`${ADMIN_URL}/manageblock`,
                method:'PUT',
                body:data
            })
        }),
        adminLogout:builder.mutation({
            query:()=>({
               url:`${ADMIN_URL}/adminlogout`,
               method:'POST' 
            })
        })
    })
})

export const { 
    useAdminLoginMutation,
    useDashboardMutation,
    useManageBlockMutation,
    useAdminLogoutMutation,
} = adminApiSlice