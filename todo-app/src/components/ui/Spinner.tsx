export default function Spinner({ size = 24 }: { size?: number }) {
  return (
    <div role='status' className='flex items-center justify-center'>
      <div
        className='animate-spin rounded-full border-2 border-muted border-t-transparent'
        style={{ width: size, height: size }}
      />
      <span className='sr-only'>Loading...</span>
    </div>
  );
}
