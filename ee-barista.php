<?php
/**
 * The plugin main file.
 *
 * @package     Event Espresso Barista
 * @author      Seth Shoultes
 * @copyright   (c) 2008-2018 Event Espresso  All Rights Reserved.
 * @license     {@link http://eventespresso.com/support/terms-conditions/}
 * @see         Plugin Licensing
 * @link        {@link http://www.eventespresso.com}
 * Plugin Name: Event Espresso Barista
 * Plugin URI: http://eventespresso.com/?ee_ver=ee4&utm_source=ee4_plugin_admin&utm_medium=link&utm_campaign
 * =wordpress_plugins_page&utm_content=support_link
 * Description: Serving up fresh brewed Event Espresso Packages for your development pleasure
 * Version: 0.0.1
 * Author: Event Espresso
 * Author URI: http://eventespresso.com/?ee_ver=ee4&utm_source=ee4_plugin_admin&utm_medium=link&utm_campaign
 * =wordpress_plugins_page&utm_content=support_link
 * License: GPLv3
 * Text Domain: event_espresso
 * GitHub Plugin URI: https://github.com/eventespresso/packages
 */

defined('ABSPATH') || die();

define('EE_BARISTA_BASENAME', plugin_basename(__FILE__));
define('EE_BARISTA_DIR', trailingslashit(plugin_dir_path(__FILE__)));
define('EE_BARISTA_URL', trailingslashit(plugins_url('', __FILE__)));

add_action(
    'AHEE__EE_System__load_espresso_addons',
    function () {
        require_once __DIR__ . '/lib/Barista.php';
        $barista = new Barista();
        $barista->initialize();
        add_filter(
            'FHEE__EventEspresso_core_domain_services_capabilities_FeatureFlags',
            function ($capabilities) {
                return array_merge($capabilities, [
                    'use_advanced_event_editor'  => true,
                    'ee_event_editor_bulk_edit'    => true,
                    'use_default_ticket_manager' => true,
                    'use_event_description_rte'  => true,
                    'use_experimental_rte'       => true,
                    'use_reg_form_builder'       => true,
                    'use_reg_options_meta_box'   => true,
                ]);
            }
        );
    }
);

add_filter('FHEE__load_Barista', '__return_false');
