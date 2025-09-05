interface EventActionProps {
  confirmed: boolean;
  onAction?: () => void;
}

export const EventAction = ({ confirmed, onAction }: EventActionProps) => {
  return (
    <>
      {confirmed ? (
        <button className="text-xs text-red-400 cursor-pointer hover:underline" onClick={onAction}>
          Cancelar asistencia
        </button>
      ) : (
        <button
          className="p-2 bg-icon-green rounded-lg cursor-pointer transition-all hover:opacity-[0.9] scale-[0.95] duration-200 ease-in "
          onClick={onAction}
        >
          <p className="text-xs text-black">Confirmar asistencia</p>
        </button>
      )}
    </>
  );
};
