export const convertCurrencyToNumber = (currencyString: string) => {
    const numericValue = currencyString.replace(/[^0-9,-]+/g, '');

    const formattedValue = numericValue.replace(',', '.');
    return formattedValue === '' ? 0 : parseFloat(formattedValue);
}

export const formatRupiah = (number: number) => {
    return `Rp. ${new Intl.NumberFormat('id-ID').format(number || 0)}`
}

export const formatDateToIndonesian = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    };
  
    // Use 'id-ID' locale for Indonesian language
    return date.toLocaleDateString('id-ID', options);
  };

  // Implementasi manual dari fungsi groupBy
export function groupByToArray<T>(array: T[], keyGetter: (item: T) => string) {
    const groupedObject = array.reduce((result, currentItem) => {
        const key = keyGetter(currentItem);
        if (!result[key]) {
            result[key] = {
                key: key,
                items: []
            };
        }
        result[key].items.push(currentItem);
        return result;
    }, {} as { [key: string]: { key: string; items: T[] } });

    // Mengubah objek menjadi array
    return Object.values(groupedObject);
}