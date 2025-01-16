<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the website, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'wordpress' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', '' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         '? 70rbGexo46L]s>^*?oGcFHYa^*Q=WPl?>Q?D 3JP{R X{D_#9an/*ld$YD82G@' );
define( 'SECURE_AUTH_KEY',  'oOg~5:W8t3T+6;G]F:Q43MJkI]KeStVCG3AX;m3Hsn)]OF&h>jLFuIOs@^`{,Mxd' );
define( 'LOGGED_IN_KEY',    '!!7K>~C&Ik-;k]A(AvnpbQci%y,Ai8LKOV]VC6#rW1cdG(P^1FDIFF:?SJulX.`s' );
define( 'NONCE_KEY',        's}JzH+h0?w@W{gH&G.(Za$<d N4F%zI|uuaWPT6P`<)qCv/beQVVz?viTN,7Y%p#' );
define( 'AUTH_SALT',        '@T~>eT}n:}<3<)`POr TeG800e|NofXt$:} 9^Cq1CbalT&<&21_4C_w.e/,AB(/' );
define( 'SECURE_AUTH_SALT', ':hsMB;~lT$9P4WZYd<]2mS6e!$TvW*Y3_h$LTdE>1wX&7c9VtX#Huda0=ZRy.(sV' );
define( 'LOGGED_IN_SALT',   'UcI+~(KN9.>Pq$y&hT&[BlV%W]&!*obhjyarw_=j/N1w3`s[1f/*C7BeY{nAVZV;' );
define( 'NONCE_SALT',       'c^WTLy0w6eL(4Wamfot<AVBf`Pe3pxh^I=DFSYsh6K3;WJ@9Xe3,u1BOOG4cAD>i' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 *
 * At the installation time, database tables are created with the specified prefix.
 * Changing this value after WordPress is installed will make your site think
 * it has not been installed.
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/#table-prefix
 */
$table_prefix = 'wp_';

define( 'WP_ENVIRONMENT_TYPE', 'local' );
/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/
 */
define( 'WP_DEBUG', true );
define( 'WP_DEBUG_LOG', true );
define( 'WP_DEBUG_DISPLAY', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
