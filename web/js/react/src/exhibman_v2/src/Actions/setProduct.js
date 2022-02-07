const setProduct = id =>{
    return{
        type: 'SET_PRODUCT',
        payload: id
    };
};

export default setProduct;