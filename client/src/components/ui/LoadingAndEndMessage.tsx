import { LoaderCircle } from "lucide-react";
import React from "react";

interface LoadingAndEndMessageProps {
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
}

const LoadingAndEndMessage = ({
  isFetchingNextPage,
  hasNextPage,
}: LoadingAndEndMessageProps) => {
  return (
    <div className="flex flex-col gap-3">
      {isFetchingNextPage && (
        <LoaderCircle
          className="animate-spin mx-auto text-primary-color "
          size={24}
        />
      )}

      {!hasNextPage && (
        <p className="text-center text-text-gray text-sm p-4">
          No hay más usuarios
        </p>
      )}
    </div>
  );
};

export default LoadingAndEndMessage;
