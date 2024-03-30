"use-client";
import { isEqual } from "lodash";
import { create } from "zustand";
import { persist, subscribeWithSelector } from "zustand/middleware";

export interface TSettings {
	themeMode: "light" | "system" | "dark";
	themeLayout: "vertical" | "horizontal" | "mini";
	themeColorPresets: "default" | "purple" | "blue" | "orange" | "rose" | "zinc";
	themeStretch: boolean;
}

type TSettingsAction = {
	_hasHydrated: boolean;
	setHasHydrated: (state: boolean) => void;
	update: <Key extends keyof TSettings>(name: Key, value: TSettings[Key]) => void;
	reset: () => void;
	canReset: () => boolean;
};

const defaultSettings = {
	themeMode: "light", // 'light' | 'dark'
	themeLayout: "vertical", // 'vertical' | 'horizontal' | 'mini'
	themeColorPresets: "default", // 'default' | 'purple' | 'blue' | 'orange' | 'rose' | 'zinc'
	themeStretch: false,
} as const;

export const useSettings = create<TSettings & TSettingsAction>()(
	persist(
		subscribeWithSelector((set, get) => ({
			...defaultSettings,
			_hasHydrated: false,
			setHasHydrated: (state) => {
				set({
					_hasHydrated: state,
				});
			},
			canReset: () => {
				const { themeMode, themeLayout, themeColorPresets, themeStretch } = get();
				return !isEqual({ themeMode, themeLayout, themeColorPresets, themeStretch }, defaultSettings);
			},
			reset: () => {
				set((state) => ({
					...defaultSettings,
					...state,
				}));
			},
			update: (name, value) => {
				set(() => ({ [name]: value }));
			},
		})),
		{
			name: "settings",
			// skipHydration: true,
			onRehydrateStorage: () => (state) => {
				if (state) {
					localStorage.setItem("color-scheme", state.themeColorPresets);
				}
				return (_: any, error: Error) => {
					if (error) {
						console.log("an error happened during hydration", error);
					} else {
						console.log("hydration finished");
					}
				};
			},
		},
	),
);
