export function FloatingTrees() {
  const trees = [
    { left: '5%', top: '15%', delay: '0s', duration: '4s' },
    { left: '85%', top: '25%', delay: '1s', duration: '5s' },
    { left: '10%', top: '60%', delay: '2s', duration: '4.5s' },
    { left: '90%', top: '70%', delay: '0.5s', duration: '5.5s' },
  ];

  return (
    <>
      {trees.map((tree, i) => (
        <div
          key={i}
          className="fixed text-6xl opacity-[0.08] pointer-events-none animate-float"
          style={{
            left: tree.left,
            top: tree.top,
            animationDelay: tree.delay,
            animationDuration: tree.duration,
          }}
        >
          🎄
        </div>
      ))}
    </>
  );
}
