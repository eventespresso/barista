<?php

namespace EventEspresso\Barista;

use EE_Admin_Page;
use EE_Error;
use EE_Switch_Input;
use EEH_URL;
use EventEspresso\core\domain\services\capabilities\FeatureFlagsConfig;
use EventEspresso\core\services\database\WordPressOption;
use EventEspresso\core\services\loaders\LoaderFactory;
use Maintenance_Admin_Page;

/**
 * Class FeatureFlagsConfig
 * UI for managing Feature Flags configuration
 *
 * @since $VID:$
 */
class FeatureFlagsAdminPage
{
	public static function loadFeatureFlagsAdminPageConfig(array $page_config): array
	{
		$page_config['feature_flags_config'] = [
			'nav'           => [
				'label' => esc_html__('Feature Flags', 'event_espresso'),
				'icon'  => 'dashicons-flag',
				'order' => 100,
			],
			'require_nonce' => false,
		];
		return $page_config;
	}


	public static function loadFeatureFlagsAdminPageRoutes(array $page_routes): array
	{
		$page_routes['feature_flags_config']              = [
			'func'       => [FeatureFlagsAdminPage::class, 'loadFeatureFlagsConfigForm'],
			'capability' => 'manage_options',
		];
		$page_routes['process_feature_flags_config_form'] = [
			'func'       => [FeatureFlagsAdminPage::class, 'processFeatureFlagsConfigForm'],
			'capability' => 'manage_options',
			'noheader'   => true,
		];
		return $page_routes;
	}


	/**
	 * @param Maintenance_Admin_Page $admin_page
	 * @return void
	 * @throws EE_Error
	 */
	public static function loadFeatureFlagsConfigForm(Maintenance_Admin_Page $admin_page)
	{
		$form = new FeatureFlagsConfigForm(LoaderFactory::getShared(FeatureFlagsConfig::class));
		$admin_page->setAdminPageTitle(esc_html__('Feature Flags Configuration', 'event_espresso'));
		$admin_page->set_template_args(
			[
				'admin_page_content' => $form->form_open(
						EE_Admin_Page::add_query_args_and_nonce(
							['action' => 'process_feature_flags_config_form'],
							EE_MAINTENANCE_ADMIN_URL
						),
						'post'
					)
					. $form->get_html_and_js()
					. $form->form_close(),
			]
		);
		$admin_page->display_admin_page_with_no_sidebar();
	}


	/**
	 * @throws EE_Error
	 */
	public static function processFeatureFlagsConfigForm(Maintenance_Admin_Page $admin_page)
	{
		if ($_SERVER['REQUEST_METHOD'] === 'POST') {
			/** @var FeatureFlagsConfig $feature_flags_config */
			$feature_flags_config = LoaderFactory::getShared(FeatureFlagsConfig::class);
			$form                 = new FeatureFlagsConfigForm($feature_flags_config);
			$form->receive_form_submission($_REQUEST);
			if ($form->is_valid()) {
				$feature_flags_form_options = $form->valid_data();
				// $feature_flags = $feature_flags_config->getFeatureFlags();
				$success       = true;
				foreach ($feature_flags_form_options as $feature_flag => $value) {
					$result = WordPressOption::UPDATE_NONE;
					if ($feature_flag) {
						$result = $value === EE_Switch_Input::OPTION_ON
							? $feature_flags_config->enableFeatureFlag($feature_flag, true)
							: $feature_flags_config->disableFeatureFlag($feature_flag);
					}
					$success = $result === WordPressOption::UPDATE_ERROR ? $result : $success;
					if ($result === WordPressOption::UPDATE_ERROR) {
						EE_Error::add_error(
							sprintf(
								/* translators: %1$s: feature flag name */
								esc_html__(
									'An error occurred while trying to update the %1$s feature flag.',
									'event_espresso'
								),
								$feature_flag
							),
							__FILE__,
							__FUNCTION__,
							__LINE__
						);
						break;
					}
				}
				if ($success) {
					EE_Error::add_success(esc_html__('Feature Flags updated successfully.', 'event_espresso'));
				}
				EEH_URL::safeRedirectAndExit(
					EE_Admin_Page::add_query_args_and_nonce(
						[
							'page'   => 'espresso_maintenance_settings',
							'action' => 'feature_flags_config',
						],
						admin_url('admin.php')
					)
				);
			}
		}
	}
}
