import { format, formatDistanceToNow, parseISO } from 'date-fns';

export function formatDate(dateString: string): string {
  return format(parseISO(dateString), 'MMM d, yyyy');
}

export function formatDateTime(dateString: string): string {
  return format(parseISO(dateString), 'MMM d, yyyy h:mm a');
}

export function formatRelativeTime(dateString: string): string {
  return formatDistanceToNow(parseISO(dateString), { addSuffix: true });
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

export function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    accommodation: '🏨',
    experience: '🎭',
    attraction: '🏛️',
    transportation: '🚐',
    festival: '🎉',
    wellness: '🧘',
  };
  return icons[category] || '📍';
}

export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    accommodation: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    experience: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    attraction: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200',
    transportation: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    festival: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
    wellness: 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200',
  };
  return colors[category] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    approved: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    rejected: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    draft: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
    new: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    read: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
    replied: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    closed: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
}
