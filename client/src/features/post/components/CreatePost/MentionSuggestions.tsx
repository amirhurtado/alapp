
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Lock } from "lucide-react";
import type { MentionableUser } from "@/actions/user/getUser"; 
import Avatar from "@/components/ui/Avatar";

interface MentionSuggestionsProps {
  suggestions: MentionableUser[];
  isLoading: boolean;
  onSelect: (username: string) => void;
}

const MentionSuggestions = ({ suggestions, isLoading, onSelect }: MentionSuggestionsProps) => {
  if (isLoading) {
    return (
      <Card className="absolute top-full mt-2 w-full max-w-sm z-20">
        <CardContent className="p-2">
          <div className="flex items-center justify-center p-4">
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (suggestions.length === 0) {
    return null; // No mostrar nada si no hay sugerencias
  }

  return (
    <Card className="absolute top-full w-full max-w-sm z-20">
      <CardContent className=" max-h-60 overflow-y-auto">
        <p className="text-xs mb-2">Usuarios a etiquetar: </p>
        <ul className="flex flex-col gap-1">
          {suggestions.map((user) => (
            <li key={user.id}>
              <button
                type="button"
                onClick={() => user.isFollowedByYou && onSelect(user.name)}
                disabled={!user.isFollowedByYou}
                className="w-full text-left p-4 flex items-center gap-3 rounded-md transition-colors hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Avatar src={user.imageUrl} />
                <div className="flex-1">
                  <p className="font-semibold text-sm">{user.displayName}</p>
                  <p className="text-xs text-muted-foreground">@{user.name}</p>
                </div>
                {!user.isFollowedByYou && (
                  <Lock className="h-4 w-4 text-muted-foreground" />
                )}
              </button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default MentionSuggestions;