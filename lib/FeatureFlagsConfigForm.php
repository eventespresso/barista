<?php

namespace EventEspresso\Barista;

use EE_Admin_Two_Column_Layout;
use EE_Form_Section_HTML;
use EE_Form_Section_Proper;
use EE_Submit_Input;
use EE_Switch_Input;
use EEH_HTML;
use EventEspresso\core\domain\services\capabilities\FeatureFlagsConfig;

/**
 * Class FeatureFlagsConfigForm
 *
 * @since $VID:$
 */
class FeatureFlagsConfigForm extends EE_Form_Section_Proper
{
	public function __construct(FeatureFlagsConfig $feature_flags_config)
	{
		$feature_flags = $feature_flags_config->getFeatureFlags();
		$feature_flags_form_options = [
			FeatureFlagsConfig::USE_EVENT_EDITOR_BULK_EDIT => [
				'name' => esc_html__('Event Editor Bulk Edit','event_espresso'),
				'html_label_text' => esc_html__('Use Event Editor Bulk Edit','event_espresso'),
				'help_text' => sprintf(
					esc_html__(
						'Whether to enable the Bulk Edit feature in the Advanced Event Editor (EDTR).%1$s%2$sPLEASE NOTE: Bulk Editing is ALWAYS enabled if the Recurring Events Manager add-on is active.%3$s%1$s default: Enabled for Caffeinated sites, disabled for Decaf or Multisite installs',
						'event_espresso'
					),
					'<br/>',
					'<strong>',
					'</strong>'
				)
			],
			FeatureFlagsConfig::USE_DEFAULT_TICKET_MANAGER => [
				'name' => esc_html__('Default Ticket Manager','event_espresso'),
				'html_label_text' => esc_html__('Use Default Ticket Manager','event_espresso'),
				'help_text' => esc_html__(
					'Whether to enable the new Default Ticket Manager in the EDTR. default: Enabled',
					'event_espresso'
				)
			],
			FeatureFlagsConfig::USE_EVENT_DESCRIPTION_RTE => [
				'name' => esc_html__('Event Description RTE','event_espresso'),
				'html_label_text' => esc_html__('Use Rich Text Editor for Event Description','event_espresso'),
				'help_text' => esc_html__(
					'Whether to enable the Rich Text Editor for the Event Description field in the EDTR or use tinymce. default: Disabled',
					'event_espresso'
				)
			],
			FeatureFlagsConfig::USE_EXPERIMENTAL_RTE => [
				'name' => esc_html__('Rich Text Editor','event_espresso'),
				'html_label_text' => esc_html__('Use Rich Text Editor for other RTE fields','event_espresso'),
				'help_text' => esc_html__(
					'Whether to enable the Rich Text Editor for all other RTE fields in the EDTR. default: Disabled',
					'event_espresso'
				)
			],
			FeatureFlagsConfig::USE_REG_FORM_BUILDER => [
				'name' => esc_html__('Registration Form Builder','event_espresso'),
				'html_label_text' => esc_html__('Use Registration Form Builder','event_espresso'),
				'help_text' => esc_html__(
					'Whether to enable the new Registration Form Builder in the EDTR or continue using the legacy Question Groups and Registration Form admin pages. default: Disabled',
					'event_espresso'
				)
			],
			FeatureFlagsConfig::USE_REG_OPTIONS_META_BOX => [
				'name' => esc_html__('Registration Options','event_espresso'),
				'html_label_text' => esc_html__('Use Registration Options','event_espresso'),
				'help_text' => esc_html__(
					'Whether to enable the new Registration Options meta box in the EDTR or continue using the legacy Event Registration Options. default: Disabled',
					'event_espresso'
				)
			],
		];

		$subsections = [
			'header' => new EE_Form_Section_HTML(EEH_HTML::h3(__('Feature Flags', 'event_espresso')))
		];
		foreach ($feature_flags_form_options as $id => $feature_flags_form_option) {
			$subsections[$id] = new EE_Switch_Input(
				[
					'default'        => $feature_flags->{$id}
						? EE_Switch_Input::OPTION_ON
						: EE_Switch_Input::OPTION_OFF,
					'html_name'       => $id,
					'html_label_text' => $feature_flags_form_option['html_label_text'],
					'html_help_text'  => $feature_flags_form_option['help_text'],
				],
				[
					EE_Switch_Input::OPTION_OFF => sprintf(
						esc_html__('%1$s is DISABLED', 'event_espresso'),
						$feature_flags_form_option['name']
					),
					EE_Switch_Input::OPTION_ON  => sprintf(
						esc_html__('%1$s is ENABLED', 'event_espresso'),
						$feature_flags_form_option['name']
					),
				]
			);
		}
		$subsections[''] = new EE_Submit_Input(
			['default' => esc_html__('Update Feature Flags', 'event_espresso')]
		);
		parent::__construct(
			[
				'name'            => 'BaristaAdminPageConfig',
				'layout_strategy' => new EE_Admin_Two_Column_Layout(),
				'subsections'     => $subsections,
			]
		);
	}
}
