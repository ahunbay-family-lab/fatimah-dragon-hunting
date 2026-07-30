import { DragonHuntGame } from "@/components/game/DragonHuntGame";

export default function Home() {
  return (
    <div className="flex min-h-full flex-1 flex-col items-center justify-center bg-gradient-to-br from-stone-900 via-emerald-950 to-stone-950 px-4 py-8">
      <DragonHuntGame />
    </div>
  );
}
