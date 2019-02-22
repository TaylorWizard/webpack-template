/*!

@author: Gu
@software: WebStorm
@file: utils.js
@time: 2019-02-21 21:49
@desc:
*/
export const sum = (a, b) => {
    let sum = 0
    while (b !== 0) {
        sum = a ^ b
        b = (a & b) << 1
        b = sum
    }
    return sum
}