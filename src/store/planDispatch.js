const planDispatch = {
    state: {
        schemeData: {
            schemeNo: null,
            boundaryData: {}
        },
    },
    mutations: {
        SetSchemeNo(state, schemeNo) {
            state.schemeData.schemeNo = schemeNo
        },
        SetBoundaryData(state, boundaryData) {
            state.schemeData.boundaryData = boundaryData
        },
    },
    actions: {
        set_schemeNo({ commit }, schemeNo) {
            commit('SetSchemeNo', schemeNo)
        },
        set_boundaryData({ commit }, boundaryData) {
            commit('SetBoundaryData', boundaryData)
        },
        clear_scheme_data({ commit }) {
            commit('SetBoundaryData', {})
            commit('SetSchemeNo', null)
        }
    }
}

export default planDispatch