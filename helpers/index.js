export const formatearDinero = cantidad => {
    // ISO 4217 para la divisa y  Language Tags (BCP 47) para en-US
    return cantidad.toLocaleString('en-US', {
        style: 'currency',
        currency: 'COP',

    })
}