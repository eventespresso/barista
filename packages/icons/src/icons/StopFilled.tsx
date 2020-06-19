// GENERATE BY ./scripts/generate.ts
// DON NOT EDIT IT MANUALLY

import * as React from 'react'
import StopFilledSvg from '../svg/src/asn/StopFilled';
import AntdIcon, { AntdIconProps } from '../components/AntdIcon';

const StopFilled = (
  props: AntdIconProps,
  ref: React.MutableRefObject<HTMLSpanElement>,
) => <AntdIcon {...props} ref={ref} icon={StopFilledSvg} />;

StopFilled.displayName = 'StopFilled';
export default React.forwardRef<HTMLSpanElement, AntdIconProps>(StopFilled);