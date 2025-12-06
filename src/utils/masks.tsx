import { baseURL } from '@/services/api';
import { parseISO } from 'date-fns';

export const unMask = (value: string) => {
  return value?.replace(/\D/g, '');
};

export const maskNumber = (value: string) => {
  return value?.replace(/\D/g, '');
};

export const maskCNPJ = (value: string) => {
  return value
    ?.replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2');
};

export const maskCEP = (cep: string) => {
  cep = cep.replace(/\D/g, '');
  const match = cep.match(/^(\d{1,5})(\d{0,3})$/);
  if (match) {
    cep = `${match[1]}${match[2] ? '-' : ''}${match[2]}`;
    return cep;
  }
  return cep;
};

export const maskPhone = (value: string) => {
  if (value.length > 10) {
    return value
      ?.replace(/[^0-9]/g, '')
      .replace(/^(\d{2})(\d{5})(\d{4})$.*/, '($1) $2-$3');
  }

  return value
    ?.replace(/[^0-9]/g, '')
    .replace(/^(\d{2})(\d{4})(\d{4})$.*/, '($1) $2-$3');
};

export const maskCPF = (value: string) => {
  return value
    ?.replace(/^(\d{3})(\d)/, '$1.$2')
    .replace(/^(\d{3}).(\d{3})(\d)/, '$1.$2.$3')
    .replace(/.(\d{3})(\d)/, '.$1-$2');
};

export const maskRG = (value: string) => {
  return value
    ?.replace(/\D/g, '')
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/.(\d{3})(\d)/, '.$1-$2');
};

export const cardDateMask = (value: string) => {
  return value?.replace(/[^0-9/]/g, '').replace(/^(\d{2})(\d)/, '$1/$2');
};

export const secondCardDateMask = (value: string) => {
  return value
    ?.replace(/[^0-9/]/g, '')
    .replace(/^(\d{2})(\d)/, '$1/$2')
    .replace(/\/(\d{4})/, '/$1');
};

export const cardNumberMask = (value: string) => {
  return value
    ?.replace(/[^\d\s]/g, '')
    .replace(/^(\d{4})(\d)/, '$1 $2')
    .replace(/^(\d{4})\s(\d{4})(\d)/, '$1 $2 $3')
    .replace(/^(\d{4})\s(\d{4})\s(\d{4})(\d)/, '$1 $2 $3 $4');
};

export const timeZone = (date: string) => {
  const timezoned = date.split('Z')[0];
  const parsedISO = parseISO(timezoned);
  const timeZoneDate = new Date(parsedISO).toLocaleString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
  });
  return timeZoneDate;
};

export const forceTimeZone = (date: string) => {
  const timezoned = date.split('Z')[0];
  const parsedISO = parseISO(timezoned);
  return parsedISO;
};

export const notAllowReservedCharacters = (value: string) => {
  return value?.replace(/[^a-zA-Z0-9\u00C0-\u00FF\s]/g, '');
};

export const CPForCNPJMask = (value: string) => {
  const unmasked = unMask(value);

  if (unmasked.length === 11) {
    return value
      ?.replace(/^(\d{3})(\d)/, '$1.$2')
      .replace(/^(\d{3}).(\d{3})(\d)/, '$1.$2.$3')
      .replace(/.(\d{3})(\d)/, '.$1-$2');
  }
  if (unmasked.length === 14) {
    return value
      ?.replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2');
  }

  return unmasked;
};

const formatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export const formatCurrency = (value?: number | null) => {
  if (!value) return formatter.format(0);

  return formatter.format(value);
};

export const unmaskCurrency = (value: string) => {
  if (!value) return 0;
  const valueFormatted = value
    .replace(',', '')
    .replace('.', '')
    .replace(/\D/g, '');

  return Number(valueFormatted) / 100;
};

export const maskCurrency = (value: string) => {
  const valueFormatted = unmaskCurrency(value);

  const masked = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valueFormatted);
  return masked;
};

export const formatTotalThings = (totalThings: number) => {
  return totalThings === 0
    ? '0'
    : totalThings < 10
      ? `0${totalThings || 0}`
      : `${totalThings || 0}`;
};

export const maskPercentage = (value: string): string => {
  if (!value) return '';

  const numeric = value.replace(/[^\d.,]/g, '').replace(',', '.');

  const parts = numeric.split('.');
  const clean =
    parts.length > 2 ? `${parts[0]}.${parts.slice(1).join('')}` : numeric;

  return clean ? `${clean}%` : '';
};

export const maskLetters = (value: string) => {
  return value?.replace(/[^a-zA-Z\u00C0-\u00FF\s]/g, '');
};

export const maskPhotoUrl = (url: string) => {
  return `${baseURL?.replace('/api', '')}${url}`;
};
