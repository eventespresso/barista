<?php

namespace EventEspresso\Barista;

use WP_Scripts;
use WP_Styles;

class Barista
{
	private array $entry_points = [];

	private array $manifest = [];

	private array $styles = [];

	private array $edtr_domains = ['eventSmart'];
	private array $public_domains = ['calendar'];


	public function initialize()
	{
		if (isset($_SERVER['REQUEST_URI']) && strpos($_SERVER['REQUEST_URI'], 'wp-admin/themes.php') !== false) {
			return;
		}

		add_action('wp_default_scripts', [$this, 'registerScripts']);
		add_action('wp_default_styles', [$this, 'registerStyles']);
		add_action('wp_enqueue_scripts', [$this, 'addAssets']);
		add_action('wp_enqueue_scripts', [$this, 'enqueuePublicScripts']);
		add_action('admin_enqueue_scripts', [$this, 'addAssets']);
		add_action('admin_enqueue_scripts', [$this, 'enqueueEditorScripts']);
		add_filter('FHEE__FeatureFlagsConfig__getFeatureFlags__use_default_feature_flags', '__return_false');
		add_filter(
			'FHEE__Maintenance_Admin_Page__page_setup__page_config',
			[FeatureFlagsAdminPage::class, 'loadFeatureFlagsAdminPageConfig']
		);
		add_filter(
			'FHEE__Maintenance_Admin_Page__page_setup__page_routes',
			[FeatureFlagsAdminPage::class, 'loadFeatureFlagsAdminPageRoutes']
		);
	}


	/**
	 * Retrieves a URL to a file in the ee_barista plugin.
	 *
	 * @param string $path Relative path of the desired file.
	 *
	 * @return string       Fully qualified URL pointing to the desired file.
	 *
	 * @since 0.0.1
	 */
	public function url(string $path): string
	{
		return EE_BARISTA_URL . $path;
	}


	/**
	 * @return array
	 */
	protected function getEntryPoints(): array
	{
		if (! $this->entry_points) {
			$this->entry_points = array_keys($this->getManifest('entrypoints'));
		}
		return $this->entry_points;
	}


	/**
	 * @param string $key
	 * @return mixed
	 */
	protected function getManifest(string $key = 'files')
	{
		if (! $this->manifest) {
			$manifest_path = EE_BARISTA_DIR . 'build/asset-manifest.json';

			if (! file_exists($manifest_path)) {
				wp_die('No manifest file found. Try yarn dev');
			}

			// TODO May be use WP File system? ¯\_(ツ)_/¯
			$manifest_json  = file_get_contents($manifest_path);
			$this->manifest = json_decode($manifest_json, true);
		}

		if (empty($this->manifest[ $key ])) {
			wp_die(sprintf('No entry for %1$s found in manifest file.', $key));
		}

		return $this->manifest[ $key ];
	}


	/**
	 * Registers a script according to `wp_register_script`. Honors this request by
	 * reassigning internal dependency properties of any script handle already
	 * registered by that name. It does not deregister the original script, to
	 * avoid losing inline scripts which may have been attached.
	 *
	 * @param WP_Scripts       $scripts   WP_Scripts instance.
	 * @param string           $handle    Name of the script. Should be unique.
	 * @param string           $src       Full URL of the script, or path of the script relative to the WordPress root
	 *                                    directory.
	 * @param array            $deps      Optional. An array of registered script handles this script depends on.
	 *                                    Default empty array.
	 * @param string|bool|null $ver       Optional. String specifying script version number, if it has one, which is
	 *                                    added to the URL as a query string for cache busting purposes. If version is
	 *                                    set to false, a version number is automatically added equal to current
	 *                                    installed WordPress version. If set to null, no version is added.
	 * @param bool             $in_footer Optional. Whether to enqueue the script before </body> instead of in the
	 *                                    <head>. Default 'false'.
	 * @since 0.0.1
	 */
	protected function overrideScript(
		WP_Scripts $scripts,
		string $handle,
		string $src,
		array $deps = [],
		$ver = false,
		bool $in_footer = false
	) {
		$script = $scripts->query($handle);
		if ($script) {
			/*
			 * In many ways, this is a reimplementation of `wp_register_script` but
			 * bypassing consideration of whether a script by the given handle had
			 * already been registered.
			 */

			// See: `_WP_Dependency::__construct` .
			$script->src  = $src;
			$script->deps = $deps;
			$script->ver  = $ver;
			$script->args = $in_footer;
		} else {
			$scripts->add($handle, $src, $deps, $ver, $in_footer);
		}

		$script = $scripts->query($handle);
		if ($script) {
			/*
			* The script's `group` designation is an indication of whether it is
			* to be printed in the header or footer. The behavior here defers to
			* the arguments as passed. Specifically, group data is not assigned
			* for a script unless it is designated to be printed in the footer.
			*/
			// See: `wp_register_script` .
			unset($script->extra['group']);
			if ($in_footer) {
				$script->add_data('group', 1);
			}
		}
	}


	/**
	 * Registers a style according to `wp_register_style`. Honors this request by
	 * de-registering any style by the same handler before registration.
	 *
	 * @param WP_Styles        $styles WP_Styles instance.
	 * @param string           $handle Name of the stylesheet. Should be unique.
	 * @param string           $src    Full URL of the stylesheet, or path of the stylesheet relative to the WordPress
	 *                                 root directory.
	 * @param array            $deps   Optional. An array of registered stylesheet handles this stylesheet depends on.
	 *                                 Default empty array.
	 * @param string|bool|null $ver    Optional. String specifying stylesheet version number, if it has one, which is
	 *                                 added to the URL as a query string for cache busting purposes. If version is set
	 *                                 to false, a version number is automatically added equal to current installed
	 *                                 WordPress version. If set to null, no version is added.
	 * @param string           $media  Optional. The media for which this stylesheet has been defined.
	 *                                 Default 'all'. Accepts media types like 'all', 'print' and 'screen', or media
	 *                                 queries like
	 *                                 '(orientation: portrait)' and '(max-width: 640px)'.
	 * @since 0.0.1
	 *
	 */
	protected function overrideStyle(
		WP_Styles $styles,
		string $handle,
		string $src,
		array $deps = [],
		$ver = false,
		string $media = 'all'
	) {
		$style = $styles->query($handle);
		if ($style) {
			$styles->remove($handle);
		}
		// save the handle to use for loading styles for dev env
		$this->styles[ $handle ] = true;

		$styles->add($handle, $src, $deps, $ver, $media);
	}


	/**
	 * Whether a domain depends upon eventEditor domain.
	 *
	 * @param string $entry_point
	 * @return bool
	 */
	private function dependsUponEdtr(string $entry_point): bool
	{
		return in_array($entry_point, $this->edtr_domains, true);
	}


	/**
	 * Registers all the WordPress packages scripts that are in the standardized
	 * `build/` location.
	 *
	 * @param WP_Scripts $scripts WP_Scripts instance.
	 * @since 0.0.1
	 */
	public function registerScripts(WP_Scripts $scripts)
	{
		$asset_files  = $this->getManifest();
		$entry_points = $this->getEntryPoints();

		foreach ($entry_points as $entry_point) {
			$asset = [];
			$handle = 'eventespresso-' . $entry_point;

			// Get the path from root directory as expected by `$this->url`.
			$package_path = 'build' . $asset_files[ $entry_point . '.js' ];

			$dependencies = [];

			if (! empty($asset_files[ $entry_point . '.php' ])) {
				$asset_file   = EE_BARISTA_DIR . 'build' . $asset_files[ $entry_point . '.php' ];
				$asset        = file_exists($asset_file) ? require($asset_file) : null;
				$dependencies = $asset['dependencies'] ?? $dependencies;
			}

			// remove cyclical dependencies, if any
			if (($key = array_search($handle, $dependencies, true)) !== false) {
				unset($dependencies[ $key ]);
			}
			if ($this->dependsUponEdtr($entry_point)) {
				$dependencies[] = 'eventespresso-eventEditor';
			}

			$version = $asset['version'] ?? '';
			$version = $version === '' && file_exists(EE_BARISTA_DIR . $package_path)
				? filemtime(EE_BARISTA_DIR . $package_path)
				: espresso_version();

			$this->overrideScript(
				$scripts,
				$handle,
				$this->url($package_path),
				$dependencies,
				$version,
				true
			);
		}
	}


	/**
	 * Registers all the packages and domain styles that are in the build folder.
	 *
	 * @param WP_Styles $styles WP_Styles instance.
	 * @since 0.0.1
	 */
	public function registerStyles(WP_Styles $styles)
	{
		$asset_files  = $this->getManifest();
		$entry_points = $this->getEntryPoints();

		foreach ($entry_points as $entry_point) {
			$handle = 'eventespresso-' . $entry_point;

			$dependencies = []; // Maybe we need it some day ¯\_(ツ)_/¯

			if (! empty($asset_files[ $entry_point . '.css' ])) {
				$css_relative_path = 'build' . $asset_files[ $entry_point . '.css' ];
				$css_absolute_path = EE_BARISTA_DIR . $css_relative_path;

				if (file_exists($css_absolute_path)) {
					$version = filemtime($css_absolute_path);
					$this->overrideStyle(
						$styles,
						$handle,
						$this->url($css_relative_path),
						$dependencies,
						$version
					);
				}
			}
		}
	}


	/**
	 * Enqueues assets that are loaded by exernal plugins/services.
	 */
	public function enqueueEditorScripts($hook)
	{
		global $post;

		$is_edtr_page = $post && $post->post_type === 'espresso_events';
		$is_edtr_page = $is_edtr_page && ($hook == 'post-new.php' || $hook == 'post.php');

		if (! $is_edtr_page) {
			return;
		}

		$scripts = ['esEdtrSlots'];

		foreach ($scripts as $handle) {
			$handle = 'eventespresso-' . $handle;
			if (wp_script_is($handle, 'registered')) {
				wp_enqueue_script($handle);
			}
		}
	}


	/**
	 * Enqueues assets that are loaded by exernal plugins/services.
	 */
	public function enqueuePublicScripts()
	{
		foreach ($this->public_domains as $handle) {
			$handle = 'eventespresso-' . $handle;
			if (wp_script_is($handle, 'registered')) {
				wp_enqueue_script($handle);
			}
		}
	}


	public function addAssets()
	{
		// Enqueue the empty style with all the barista styles as deps.
		wp_enqueue_style(
			'ee-barista',
			plugins_url('styles.css', __FILE__),
			array_keys($this->styles)
		);

		wp_add_inline_script(
			'eventespresso-i18n',
			sprintf('var baristaAssetsUrl = "%s";', $this->url('build/')),
			'before'
		);
	}
}
