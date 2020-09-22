import { USER_LOGGED_IN } from "../Actions/types";


const states = {
    userloggedin: false
};

export default (state = states, action) => {
    switch (action.type) {
        case USER_LOGGED_IN:
            return { ...state, userloggedin: true }
        default: {
            return state
        }
    }
}