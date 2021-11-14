export default (state = initialState, action) => {
    switch (action.type) {
        case 'IS_AUTH':
            return {
                ...state,
                isAuth: action.payload
            }

            default:
                break;
    }
}