/**
 * Configuration for Admin Authentication
 * 
 * We use a "friendly" username-based login system for admins.
 * This configuration defines the hidden email domain that usernames
 * are mapped to behind the scenes before authenticating with Supabase.
 */

export const ADMIN_EMAIL_DOMAIN = '@gmail.com';

/**
 * Converts a friendly username into a full email address for Supabase Auth.
 * Example: "admin" -> "admin@gmail.com"
 */
export const formatUsernameToEmail = (username: string): string => {
  const cleanUsername = username.trim().toLowerCase();
  
  return `${cleanUsername}${ADMIN_EMAIL_DOMAIN}`;
};

/**
 * Extracts the friendly username from a full email address.
 * Example: "admin@gmail.com" -> "admin"
 */
export const extractUsernameFromEmail = (email: string | undefined): string => {
  if (!email) return '';
  
  if (email.endsWith(ADMIN_EMAIL_DOMAIN)) {
    return email.replace(ADMIN_EMAIL_DOMAIN, '');
  }
  
  // Fallback if domain doesn't match exactly but contains @
  return email.split('@')[0] || '';
};
