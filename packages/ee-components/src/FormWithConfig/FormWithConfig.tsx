import { EspressoForm, EspressoFormProps, FormConfig } from '@eventespresso/form';
import { useConfig } from '@eventespresso/services';
import { useMemoStringify } from '@eventespresso/utils';
import type { AnyObject } from '@eventespresso/utils';

const FormWithConfig = <FormValues extends AnyObject>({
	columns,
	...props
}: EspressoFormProps<FormValues>): JSX.Element => {
	const configuration = useConfig();
	const dateTimeFormats = configuration?.dateTimeFormats;
	const locale = configuration?.locale;

	const config = useMemoStringify<FormConfig>({ ...dateTimeFormats, locale: locale?.user });

	return <EspressoForm columns={columns} config={config} {...(props as unknown as any)} />;
};

export default FormWithConfig;
