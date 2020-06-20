module.exports = (product, parse) => {
    let output = product.replace(/{%PRODUCT_NAME%}/g, parse.productName)
    output = output.replace(/{%ID%}/g, parse.id)
    output = output.replace(/{%IMAGE%}/g, parse.image)
    output = output.replace(/{%FROM%}/g, parse.from)
    output = output.replace(/{%NUTRIENTS%}/g, parse.nutrients)
    output = output.replace(/{%QUANTITY%}/g, parse.quantity)
    output = output.replace(/{%PRICE%}/g, parse.price)
    output = output.replace(/{%DESCRIPTION%}/g, parse.description)
    output = output.replace(/{%PRODUCT_NAME%}/g, parse.productName)
    
    if(!output.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic')
    return output
}