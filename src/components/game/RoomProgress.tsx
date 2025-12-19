import { cn } from '@/lib/utils';

interface RoomProgressProps {
  currentRoom: number;
  totalRooms: number;
}

export const RoomProgress = ({ currentRoom, totalRooms }: RoomProgressProps) => {
  return (
    <div className="fixed top-6 left-6 z-50">
      <div className="flex items-center gap-2 bg-card/90 backdrop-blur-sm border border-border rounded-xl px-4 py-3">
        {Array.from({ length: totalRooms }).map((_, index) => (
          <div
            key={index}
            className={cn(
              "w-3 h-3 rounded-full transition-all duration-300",
              index + 1 < currentRoom && "bg-success glow-success",
              index + 1 === currentRoom && "bg-primary glow-primary",
              index + 1 > currentRoom && "bg-muted"
            )}
          />
        ))}
        <span className="ml-2 text-sm font-medium text-muted-foreground">
          Salle {currentRoom}/{totalRooms}
        </span>
      </div>
    </div>
  );
};
