import { House, Bell, MessageSquare, Pointer, User, Search} from 'lucide-react';

export const getMenuItems = ( username: string) =>[
    {
        id: 1,
        name: "Principal",
        arialLaberl: "ir a principal",
        link: "/",
        icon: House
    },
    {
        id: 2,
        name: "Buscar",
        arialLaberl: "ir a principal",
        link: "/",
        icon: Search
    },
    {
        id: 3,
        name: "Notificaciones",
        arialLaberl: "ir a notificaciones",
        link: "/notifications",
        icon: Bell
    },
    {
        id: 4,
        name: "Mensajes",
        arialLaberl: "ir a mensajes",
        link: "/messages",
        icon: MessageSquare
    },
     {
        id: 5,
        name: "Interacciones",
        arialLaberl: "ir a interacciones",
        link: `/${username}/interactions`,
        icon: Pointer
    },
    {
        id: 6,
        name: "Perfil",
        arialLaberl: "ir a perfil",
        link: `/${username}`,
        icon: User
    }
]


export const GoogleIcon = () => {
  return (
    <svg
      className="w-5 h-5 md:w-6 md:h-6"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 533.5 544.3"
    >
      <path
        fill="#4285f4"
        d="M533.5 278.4c0-17.7-1.4-35.4-4.3-52.5H272v99.3h146.9c-6.3 33.9-25 62.5-53.2 81.6l85.7 66.4c50-46.1 78.1-114 78.1-194.8z"
      />
      <path
        fill="#34a853"
        d="M272 544.3c71.6 0 131.7-23.6 175.6-64.2l-85.7-66.4c-23.8 16-54.3 25.4-89.9 25.4-69.1 0-127.7-46.6-148.6-109.4l-89.6 69.1c43.6 86.1 133.1 145.5 238.2 145.5z"
      />
      <path
        fill="#fbbc05"
        d="M123.4 329.7c-10.6-31.9-10.6-66.5 0-98.4l-89.6-69.1c-39.1 76.3-39.1 160.6 0 236.9l89.6-69.4z"
      />
      <path
        fill="#ea4335"
        d="M272 107.7c37.3-.6 73.3 13.6 100.5 39.8l75.1-75.1C405.4 25 340.5-1.3 272 0 166.9 0 77.3 59.4 33.8 145.5l89.6 69.1c21-62.7 79.5-107.2 148.6-107z"
      />
    </svg>
  );
};
