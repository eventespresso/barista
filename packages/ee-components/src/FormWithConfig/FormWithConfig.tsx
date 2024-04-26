import { EspressoForm, EspressoFormProps, FormConfig } from '@eventespresso/form';
import { useConfig } from '@eventespresso/services';
import { useMemoStringify } from '@eventespresso/hooks';

const FormWithConfig = <FormValues extends Record<string, any>>({
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
