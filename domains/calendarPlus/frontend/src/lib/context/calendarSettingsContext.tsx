import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CalendarSettings {
	monthView: boolean;
	weekView: boolean;
	dayView: boolean;
	agendaView: boolean;
}

export interface CalendarSettingsContextType {
	settings: CalendarSettings;
	setSettings: (settings: CalendarSettings) => void;
}

// Create the context with default values
const CalendarSettingsContext = createContext<CalendarSettingsContextType | undefined>(undefined);

export const CalendarSettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [settings, setSettings] = useState<CalendarSettings>({
		monthView: true,
		weekView: true,
		dayView: true,
		agendaView: true,
	});

	useEffect(() => {
		//// Get the available settings here and set in state it...
		// setSettings({});
	}, []);

	return (
		<CalendarSettingsContext.Provider value={{ settings, setSettings }}>
			{children}
		</CalendarSettingsContext.Provider>
	);
};

// Custom hook for consuming the context
export const useCalendarSettings = (): CalendarSettingsContextType => {
	const context = useContext(CalendarSettingsContext);
	if (!context) {
		throw new Error('useCalendarSettings must be used within a CalendarSettingsProvider');
	}
	return context;
};
