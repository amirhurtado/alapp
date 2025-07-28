import { House, Telescope, Bell, MessageSquare, User} from 'lucide-react';

export const menuItems = [
    {
        id: 1,
        name: "Principal",
        link: "/",
        icon: House
    },
    {
        id: 2,
        name: "Explorar",
        link: "/explore",
        icon: Telescope

    },
    {
        id: 3,
        name: "Notificaciones",
        link: "/notifications",
        icon: Bell
    },
    {
        id: 4,
        name: "Mensajes",
        link: "/messages",
        icon: MessageSquare
    },
    {
        id: 5,
        name: "Perfil",
        link: "/profile",
        icon: User
    }
]