/**
 * Public Routes
 * Don't require authentication
 * @type {string[]}
 */
export const publicRoutes = ['/', '/review'];

/**
 * Protected Routes
 * Require authentication
 * will redirect to the login page if the user is not authenticated
 * will be redirected to the dashboard if the user is authenticated
 * @type {string[]}
 */
export const authRoutes = ['/auth/login', '/auth/register'];

/**
 * API Routes
 * routes that start with 'apiAuthPrefix' will be used for authentication purpose
 * @type {string}
 */
export const apiAuthPrefix = '/api/auth';

/**
 * Default Login Redirect
 * Redirect to this page after login
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = '/dashboard';
