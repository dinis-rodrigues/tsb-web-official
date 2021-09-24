export interface MenuItem {
    title:string;
    type:string;
    megaMenu?:boolean;
    megaMenuType?:string;
    children?: MenuItem[];
    path?:string;
    icon?:string;
    active?:boolean;
    sidebarTitle?:string;
}
