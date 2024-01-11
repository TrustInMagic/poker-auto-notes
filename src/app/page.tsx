import Player from '@/components/Player/Player';

export default function Home() {
  return (
    <div className='app'>
      <div className='table'>
        <Player position={1} />
        <Player position={2} />
        <Player position={3} />
        <Player position={4} />
        <Player position={5} />
      </div>
    </div>
  );
}
