export default function TestVideo() {
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <h1 style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 10, color: 'white' }}>
        Test Video Page
      </h1>
      
      <video
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          position: 'absolute',
          top: 0,
          left: 0
        }}
        autoPlay
        loop
        muted
        controls
      >
        <source src="/img/videoseg.mp4" type="video/mp4" />
        Tu navegador no soporta video HTML5
      </video>
    </div>
  );
}