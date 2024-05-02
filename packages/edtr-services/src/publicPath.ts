/* eslint-disable
no-unused-vars,
no-native-reassign,
no-global-assign,
@typescript-eslint/no-unused-vars,
no-var
*/

import {} from '@eventespresso/config';

declare var __webpack_public_path__: string;

const assetsUrl = window.baristaAssetsUrl || window?.eventEspressoData?.config?.coreDomain?.distributionAssetsUrl;

__webpack_public_path__ = assetsUrl;

export default __webpack_public_path__;
