import React from 'react';
import { Icon as ChakraIcon } from '@chakra-ui/core';

import { IconProps } from './types';

const Icon: React.FC<IconProps> = props => <ChakraIcon {...props} />;

export default Icon;
