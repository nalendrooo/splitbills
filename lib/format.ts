export const convertCurrencyToNumber = (currencyString: string) => {
    const numericValue = currencyString.replace(/[^0-9,-]+/g, '');

    const formattedValue = numericValue.replace(',', '.');
    return formattedValue === '' ? 0 : parseFloat(formattedValue);
}

export const formatRupiah = (number: number) => {
    return `Rp. ${new Intl.NumberFormat('id-ID').format(number || 0)}`
}