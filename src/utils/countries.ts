import { all, whereNumeric } from 'iso-3166-1';
import { Country } from 'iso-3166-1/dist/iso-3166';

const NUMERIC_TO_EXCLUDE = [
    '010',
    '336',
    '239',
    '260',
    '334',
    '744',
    '581',
    '849',
];

const ADDITIONAL_COUNTRIES: Country[] = [
    {
        numeric: '926',
        alpha2: 'KV',
        alpha3: '',
        country: 'Kosovo',
    },
    {
        numeric: '927',
        alpha2: 'TS',
        alpha3: '',
        country: 'Transnistria',
    },
];

const ADDITIONAL_COUNTRIES_BY_NUMERIC: Record<string, Country> =
    ADDITIONAL_COUNTRIES.reduce(
        (acc, country) => {
            acc[country.numeric] = country;
            return acc;
        },
        {} as Record<string, Country>,
    );

const NAME_OVERRIDES: Record<string, string> = {
    '826': 'United Kingdom',
    '410': 'South Korea',
    '643': 'Russia',
    '158': 'Taiwan',
};

export const fromNumeric = (numeric: string | number): Country | undefined => {
    if (!numeric) return undefined;
    numeric = String(numeric).padStart(3, '0');
    if (numeric in ADDITIONAL_COUNTRIES_BY_NUMERIC) {
        return ADDITIONAL_COUNTRIES_BY_NUMERIC[numeric];
    }
    return whereNumeric(numeric);
};

export const getCountryList = () => {
    const baseList = all().filter((country) => {
        return !NUMERIC_TO_EXCLUDE.includes(country.numeric);
    });
    baseList.push(...ADDITIONAL_COUNTRIES);
    return baseList.sort((a, b) => {
        return a.country.localeCompare(b.country);
    });
};

export const getCountryName = (country: Country | undefined) =>
    country && country?.numeric in NAME_OVERRIDES
        ? NAME_OVERRIDES[country.numeric]
        : (country?.country ?? 'Unknown Country');

export const getCountryFlagUrl = (country: Country | undefined) =>
    `assets/flags/${country?.alpha2?.toLowerCase()}.svg`;
