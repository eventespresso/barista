<?php

class Barista
{

    /**
     * @var array
     */
    private $entry_points;

    /**
     * @var array
     */
    private $manifest;

    /**
     * @var array
     */
    private $styles = [];

    public function initialize()
    {
        add_action('wp_default_scripts', [$this, 'registerScripts']);
        add_action('wp_default_styles', [$this, 'registerPackagesStyles']);
        add_action('admin_enqueue_scripts', [$this, 'addAssets']);
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
    public function url($path)
    {
        return EE_BARISTA_URL . $path;
    }


    /**
     * @return array
     */
    protected function getEntryPoints()
    {
        if (!$this->entry_points) {
            $this->entry_points = array_keys($this->getManifest('entrypoints'));
        }
        return $this->entry_points;
    }


    /**
     * @param string $key
     * @return mixed
     */
    protected function getManifest($key = 'files')
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
     *
     */
    protected function overrideScript($scripts, $handle, $src, $deps = [], $ver = false, $in_footer = false)
    {
        $script = $scripts->query($handle, 'registered');
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

        $script = $scripts->query($handle, 'registered');
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
    protected function overrideStyle($styles, $handle, $src, $deps = [], $ver = false, $media = 'all')
    {
        $style = $styles->query($handle, 'registered');
        if ($style) {
            $styles->remove($handle);
        }
        $this->styles[ $handle ] = true;
        $styles->add($handle, $src, $deps, $ver, $media);
    }


    /**
     * Registers all the WordPress packages scripts that are in the standardized
     * `build/` location.
     *
     * @param WP_Scripts $scripts WP_Scripts instance.
     * @since 0.0.1
     *
     */
    public function registerScripts($scripts)
    {
        $asset_files  = $this->getManifest();
        $entry_points = $this->getEntryPoints();

        foreach ($entry_points as $entry_point) {
            $handle = 'eventespresso-' . $entry_point;

            // Get the path from root directory as expected by `$this->url`.
            $package_path = 'build' . $asset_files[ $entry_point . '.js' ];

            $dependencies = [];

            if (! empty($asset_files[ $entry_point . '.php' ])) {
                $asset_file   = EE_BARISTA_DIR . 'build' . $asset_files[ $entry_point . '.php' ];
                $asset        = file_exists($asset_file) ? require($asset_file) : null;
                $dependencies = isset($asset['dependencies']) ? $asset['dependencies'] : $dependencies;
            }
            
            // remove cyclical dependencies, if any
            if (($key = array_search($handle, $dependencies, true)) !== false) {
                unset($dependencies[ $key ]);
            }
            $version = isset($asset['version']) ? $asset['version'] : filemtime(EE_BARISTA_DIR . $package_path);

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
    public function registerPackagesStyles($styles)
    {
        $asset_files  = $this->getManifest();
        $entry_points = $this->getEntryPoints();

        foreach ($entry_points as $entry_point) {
            $handle = 'eventespresso-' . $entry_point;

            $dependencies = []; // May be we need it some day ¯\_(ツ)_/¯

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


    public function addAssets()
    {
        // Enqueue the empty style with all the barista syles as deps.
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
