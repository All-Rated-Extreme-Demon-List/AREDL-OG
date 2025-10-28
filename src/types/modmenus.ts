export const mod_menus = [
    'None',
    'Mega Hack v8',
    'Mega Hack v7',
    'Mega Hack v6',
    'QOLMod',
    'Eclipse',
    'iCreate',
    'Prism Menu',
    'GDHM',
    'Other (specify in notes)',
] as const;

export type ModMenu = (typeof mod_menus)[number];
