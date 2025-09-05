interface EventActionProps {
  confirmed: boolean;
}

export const EventAction = ({ confirmed }: EventActionProps) => {
  return (
    <button className="p-2 bg-icon-green rounded-lg cursor-pointer transition-all hover:opacity-[0.9] scale-[0.95] duration-200 ease-in ">
      <p className="text-xs text-black">Confirmar asistencia</p>
    </button>
  );
};
