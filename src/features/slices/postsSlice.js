import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    posts : [],
    loading : false, 
    hasErrors : false
}

const postsSlice = createSlice({
    name : 'posts',
    initialState,
    reducers : {
        getPosts : (state, action) => {
            state.loading  = action.payload
        },
        getPostsSuccess : (state, action) => {
            const {hasErrors , loading, posts} = action.payload
            state.posts = posts
            state.loading = loading
            state.hasErrors = hasErrors
        },
        getPostsFailure : (state, action) => {
            const {hasErrors , loading} = action.payload
            state.hasErrors = hasErrors
            state.loading = loading
        }
    }
})

// const postsSlice = createSlice({
//     name: 'posts',
//     initialState,
//     reducers: {
//       getPosts: (state) => {
//         state.loading = true
//       },
//       getPostsSuccess: (state, { payload }) => {
//         state.posts = payload
//         state.loading = false
//         state.hasErrors = false
//       },
//       getPostsFailure: (state) => {
//         state.loading = false
//         state.hasErrors = true
//       },
//     },
// })

export const {getPosts, getPostsFailure, getPostsSuccess} = postsSlice.actions

// export const postsSelector = (state) => state.posts    this line does not work for me 

export default postsSlice.reducer

// Async thunk 
export function fetchPosts() {
    return async (dispatch) => {
        dispatch(getPosts(true))
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts')
            if (!response.ok) {
              throw new Error('Failed to fetch posts');
            }
            const data = await response.json()

            dispatch(getPostsSuccess({
              posts : data,
              loading : false,
              hasErrors : false 
            }))
        } catch (error) {
            dispatch(getPostsFailure({
                loading : false,
                hasErrors : true 
            }))
        }
    }
}

// export function fetchPosts() {
//     return async (dispatch) => {
//       dispatch(getPosts())
  
//       try {
//         const response = await fetch('https://jsonplaceholder.typicode.com/posts')
//         const data = await response.json()
  
//         dispatch(getPostsSuccess(data))
//       } catch (error) {
//         console.log("error",error);
//         dispatch(getPostsFailure())
//       }
//     }
// }

