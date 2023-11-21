import GameBoard from "@/app/components/GameBoard/GameBoard";
import ShipSelector from "@/app/components/ShipSelector/ShipSelector";
import { BattleshipProvider } from "@/app/contexts/BattleshipContext";

export default function Home() {
  return (
    <main>
      <BattleshipProvider boardSize={10}>
        <div className="flex flex-1 justify-center">
          <div className="mt-10">
            <ShipSelector />
          </div>
          <GameBoard />
        </div>
      </BattleshipProvider>
    </main>
  );
}
