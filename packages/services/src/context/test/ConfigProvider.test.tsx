import { act, render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import '@testing-library/jest-dom/extend-expect';

import { ConfigDataProps } from '@eventespresso/config';
import { mockEspressoDomData } from '@eventespresso/config/src/test/data';
import { ConfigConsumer, ConfigProvider } from '../ConfigProvider';
import { configMocks } from './data';

describe('ConfigProvider', () => {
	beforeEach(() => {
		window.eventEspressoData = mockEspressoDomData;
	});

	afterEach(() => {
		delete window.eventEspressoData;
	});

	it('checks for brandName, user, and site locale in config data', async () => {
		await act(async () => {
			const { getByText } = render(
				<MockedProvider mocks={configMocks}>
					<ConfigProvider>
						<ConfigConsumer>
							{(configData: ConfigDataProps): JSX.Element => {
								const brandName = configData?.brandName;
								const userLocale = configData?.locale?.user;
								const siteLocale = configData?.locale?.site;
								return (
									<>
										<span>{`Brand name: ${brandName}`}</span>
										<span>{`User locale: ${userLocale}`}</span>
										<span>{`Site locale: ${siteLocale}`}</span>
									</>
								);
							}}
						</ConfigConsumer>
					</ConfigProvider>
				</MockedProvider>
			);

			expect(getByText(/^Brand name:/).textContent).toBe(
				'Brand name: ' + mockEspressoDomData.config.coreDomain.brandName
			);

			expect(getByText(/^User locale:/).textContent).toBe(
				'User locale: ' + mockEspressoDomData.config.locale.user
			);

			expect(getByText(/^Site locale:/).textContent).toBe(
				'Site locale: ' + mockEspressoDomData.config.locale.site
			);
		});
	});
});
