export const convertCurrencyToNumber = (currencyString: string) => {
    // Menghapus "Rp." dan semua karakter non-numeric
    const numericValue = currencyString.replace(/[^0-9,-]+/g, '');

    // Mengganti koma dengan titik desimal jika ada, untuk penanganan desimal
    const formattedValue = numericValue.replace(',', '.');

    // Mengonversi string yang sudah dibersihkan menjadi number
    return formattedValue === '' ? 0 : parseFloat(formattedValue);
}

export const formatRupiah = (number: number) => {
    return `Rp. ${new Intl.NumberFormat('id-ID').format(number || 0)}`
}