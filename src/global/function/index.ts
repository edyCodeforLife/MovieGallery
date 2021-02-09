export const formattedDate = (
    _date: any,
    lang: string,
    withTime?: boolean,
    short?: boolean,
    withoutYear?: boolean
) => {
    const date = new Date(_date);

    const months: any = {
        idn: [
            'Januari',
            'Februari',
            'Maret',
            'April',
            'Mei',
            'Juni',
            'Juli',
            'Agustus',
            'September',
            'Oktober',
            'November',
            'Desember',
        ],
        en: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ],
    };

    const monthsShort: any = {
        idn: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
        en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    };

    if (!isNaN(date.getTime())) {
        let year: any = date.getFullYear(),
            month = date.getMonth(),
            day = date.getDate(),
            hour = date.getHours(),
            minute = date.getMinutes();

        if (String(minute).length < 2) (minute as any) = '0' + minute;

        let monthName = months[lang][month];
        if (short) monthName = monthsShort[lang][month];
        if (lang === 'idn')
            return `${day < 10 ? '0' + day : day} ${monthName} ${withoutYear ? '' : year} ${
                withTime ? hour + ':' + minute : ''
            }`;
        else
            return `${monthName} ${day < 10 ? '0' + day : day}${withoutYear ? ' ' : ', ' + year} ${
                withTime ? hour + ':' + minute : ''
            }`;
    }
    return undefined;
};

export const QrsToObj = (str) => {
    let search = str.substring(1);
    return search
        ? JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g, '":"') + '"}', function(
              key,
              value
          ) {
              return key === '' ? value : decodeURIComponent(value);
          })
        : {};
};