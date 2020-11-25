import { Injectable } from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  target?: boolean;
  name: string;
  type?: string;
  children?: ChildrenItems[];
}

export interface MainMenuItems {
  state: string;
  main_state?: string;
  target?: boolean;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

export interface Menu {
  label: string;
  main: MainMenuItems[];
}

const MENUITEMS = [
  {
    label: 'Main',
    main: [
      {
        state: 'admin-dashboard',
        name: 'Dashboard',
        type: 'link',
        icon: 'ti-home',
      },
      {
        state: 'admin-locations',
        name: 'Available Locations',
        type: 'link',
        icon: 'ti-location-pin',
      },
      {
        state: 'admin-restaurants',
        name: 'Restaurants',
        type: 'link',
        icon: 'ti-notepad',
      },
      {
        state: 'admin-drivers',
        name: 'Users',
        type: 'link',
        icon: 'ti-truck',
      },
    ],
  },
  {
    label: 'Manage',
    main: [
      {
        state: 'admin-notification',
        name: 'Notification',
        type: 'link',
        icon: 'ti-bell',
      },
      {
        state: 'admin-chats',
        name: 'Support',
        type: 'link',
        icon: 'ti-comments-smiley',
      },
    ],
  },
  {
    label: 'Forms',
    main: [
      {
        state: 'forms',
        name: 'Form Components',
        type: 'link',
        icon: 'ti-layers',
      },
    ],
  },
  {
    label: 'Tables',
    main: [
      {
        state: 'bootstrap-table',
        name: 'Bootstrap Table',
        type: 'link',
        icon: 'ti-receipt',
      },
    ],
  },
  {
    label: 'Map',
    main: [
      {
        state: 'map',
        name: 'Maps',
        type: 'link',
        icon: 'ti-map-alt',
      },
    ],
  },
  {
    label: 'Pages',
    main: [
      {
        state: 'auth',
        short_label: 'A',
        name: 'Authentication',
        type: 'sub',
        icon: 'ti-id-badge',
        children: [
          {
            state: 'login',
            type: 'link',
            name: 'Login',
            target: true,
          },
        ],
      },
    ],
  },
  {
    label: 'Other',
    main: [
      {
        state: '',
        name: 'Menu Levels',
        type: 'sub',
        icon: 'ti-direction-alt',
        children: [
          {
            state: '',
            name: 'Menu Level 2.1',
            target: true,
          },
          {
            state: '',
            name: 'Menu Level 2.2',
            type: 'sub',
            children: [
              {
                state: '',
                name: 'Menu Level 2.2.1',
                target: true,
              },
              {
                state: '',
                name: 'Menu Level 2.2.2',
                target: true,
              },
            ],
          },
          {
            state: '',
            name: 'Menu Level 2.3',
            target: true,
          },
          {
            state: '',
            name: 'Menu Level 2.4',
            type: 'sub',
            children: [
              {
                state: '',
                name: 'Menu Level 2.4.1',
                target: true,
              },
              {
                state: '',
                name: 'Menu Level 2.4.2',
                target: true,
              },
            ],
          },
        ],
      },
      {
        state: 'simple-page',
        name: 'Simple Page',
        type: 'link',
        icon: 'ti-layout-sidebar-left',
      },
    ],
  },
];

@Injectable()
export class MenuItems {
  getAll(): Menu[] {
    return MENUITEMS;
  }
}
