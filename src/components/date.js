import { format } from 'date-fns';

// Fonction pour formater la date
export function formatModifiedDate(isoDate) {
  return format(new Date(isoDate), 'MMM dd, yyyy');
}