// src/hooks/useFormatDateLabel.ts
import { useCallback } from "react";

/**
 * Hook personalizado que devuelve una función para formatear fechas para labels de chat.
 * @returns Una función que formatea una fecha a "Hoy", "Ayer" o "dd/mm/aaaa".
 */
export const useFormatDateLabel = () => {
  const formatDateLabel = useCallback((dateInput: Date | string): string => {
    const date = new Date(dateInput);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    // Normaliza las fechas a la medianoche para comparar solo el día.
    today.setHours(0, 0, 0, 0);
    yesterday.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);

    if (date.getTime() === today.getTime()) {
      return "Hoy";
    }

    if (date.getTime() === yesterday.getTime()) {
      return "Ayer";
    }

    return date.toLocaleDateString("es-CO", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }, []); // El array de dependencias está vacío porque la función no depende de props o estado.

  return formatDateLabel;
};