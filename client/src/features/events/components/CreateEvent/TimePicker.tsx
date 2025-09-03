"use client";

import * as React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface TimePickerProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

export function TimePicker({ date, setDate }: TimePickerProps) {


  return (
    <DatePicker
      selected={date}
      onChange={(newDate) => setDate(newDate as Date)}
      showTimeSelect 
      showTimeSelectOnly 
      timeIntervals={15} 
      timeCaption="Hora"
      dateFormat="h:mm aa" 
      className="w-full border-b rounded-lg bg-input py-2 px-3 font-poppins text-sm text-text-gray text-center"
    />
  );
}
