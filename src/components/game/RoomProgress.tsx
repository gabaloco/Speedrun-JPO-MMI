import { cn } from '@/lib/utils';

interface RoomProgressProps {
  currentRoom: number;
  totalRooms: number;
}

export const RoomProgress = ({ currentRoom, totalRooms }: RoomProgressProps) => {
  return (
    <div className="fixed top-6 left-6 z-50">
      <div className="flex items-center gap-2 bg-white border-3 border-black shadow-[4px_4px_0px_0px_#602EFF] px-4 py-3">
        {Array.from({ length: totalRooms }).map((_, index) => (
          <div
            key={index}
            className={cn(
              "w-4 h-4 border-2 border-black transition-all duration-300",
              index + 1 < currentRoom && "bg-green-500",
              index + 1 === currentRoom && "bg-[#602EFF]",
              index + 1 > currentRoom && "bg-gray-200"
            )}
          />
        ))}
        <span className="ml-2 text-sm font-bold text-black uppercase">
          Salle {currentRoom}/{totalRooms}
        </span>
      </div>
    </div>
  );
};
