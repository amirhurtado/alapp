import React from "react";

interface ColorPaletteProps {
  selectedColor: string;
  onColorSelect: (color: string) => void;
}

const gradients = [
  {
    id: "blue-purple",
    class: "bg-gradient-to-r from-blue-500 to-purple-500",
  },
  {
    id: "pink-orange",
    class: "bg-gradient-to-r from-pink-500 to-orange-500",
  },
  {
    id: "green-blue",
    class: "bg-gradient-to-r from-green-400 to-blue-500",
  },
  {
    id: "yellow-orange-red",
    class: "bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500",
  },
  {
    id: "cyan-blue",
    class: "bg-gradient-to-r from-cyan-500 to-blue-500",
  },
];

const ColorPalette = ({ selectedColor, onColorSelect }: ColorPaletteProps) => {
    console.log("ACA LLEGA", selectedColor)
  return (
    <div className="flex gap-3">
      {gradients.map((gradient) => {
        // La condición ahora es más completa
        const isSelected =
          selectedColor === gradient.id ||
          (!selectedColor && gradient.id === "blue-purple");

        return (
          <div
            key={gradient.id}
            onClick={() => onColorSelect(gradient.id)}
            className={`w-8 h-8 rounded-full cursor-pointer transition-transform transform hover:scale-110 ${
              gradient.class
            } ${
              isSelected
                ? "border-2 border-white"
                : "border-2 border-transparent"
            }`}
          />
        );
      })}
    </div>
  );
};

export default ColorPalette;