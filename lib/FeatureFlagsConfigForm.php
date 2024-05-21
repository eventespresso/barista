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
		$feature_flags              = $feature_flags_config->getFeatureFlags();
		$feature_flags_form_options = $feature_flags_config->getFeatureFlagsFormOptions();

		$subsections = [
			'header' => new EE_Form_Section_HTML(EEH_HTML::h3(__('Feature Flags', 'event_espresso'))),
		];
		foreach ($feature_flags_form_options as $id => $feature_flags_form_option) {
			$subsections[ $id ] = new EE_Switch_Input(
				[
					'default'         => $feature_flags->{$id}
						? EE_Switch_Input::OPTION_ON
						: EE_Switch_Input::OPTION_OFF,
					'html_name'       => $id,
					'html_label_text' => $feature_flags_form_option['html_label_text'],
					'html_help_text'  => $feature_flags_form_option['help_text']
						. ($feature_flags_form_option['overridden_by'] ?? ''),
					'disabled'        => $feature_flags_form_option['overridden'] ?? false,
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
