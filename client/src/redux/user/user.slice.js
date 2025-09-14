import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoggedIn: false,
    user: {},
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        //for login
        setUser: (state, action) => {
            const payload = action.payload
            state.isLoggedIn = true
            state.user = payload
        },
        //for logout
        removeUser: (state, action) => {
            state.isLoggedIn = false
            state.user = {}
        }

    },
})

export const { setUser, removeUser } = userSlice.actions
export default userSlice.reducer

