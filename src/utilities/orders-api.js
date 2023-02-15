export function setItemQtyInCart(itemId, newQty) {
    return(
       sendRequest(`${BASE_URL}/cart/qty`, 'PUT', { productId, newQty }),
       sendRequest(`${BASE_URL}/cart/qty`, 'PUT', { serviceId, newQty })
    );
}
  
export function checkout() {
    return sendRequest(`${BASE_URL}/cart/checkout`, 'POST');
}
  
export function getOrderHistory() {
    return sendRequest(`${BASE_URL}/history`);
}