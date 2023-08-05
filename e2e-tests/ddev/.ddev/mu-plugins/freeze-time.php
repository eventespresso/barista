<?php

/*
 * Plugin Name: Freeze Time (JavaScript)
 * Description: Part of E2E environment, fixes time for browsers to a deterministic point in time to make relative time predictable, see issue #1247 under Barista repo. For server-side time fixing, see wp-config.php. MU plugin is *not* suitable for overriding server-side time as we need to override time *before* WordPress initiation sequence starts.
 */

function freeze_time(): void
{
  $template = file_get_contents(__DIR__ . '/freeze-time.js');
  $script = sprintf($template, 'August 05 2023 00:00:00');

  echo '<script>';
  echo $script . PHP_EOL;
  echo '</script>' . PHP_EOL;
}

// ensure highest level of override, before *anything* else gets a chance to start, run, etc.
$priority = PHP_INT_MIN;

// keep in mind that for normal plugins, this is NOT how you do it
// but in the context of E2E it is important to fix time to a
// specific point so that relative time like last month is always
// the same
add_action('admin_enqueue_scripts', 'freeze_time', $priority);
add_action('wp_head', 'freeze_time', $priority);
