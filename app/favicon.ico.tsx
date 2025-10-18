import { ImageResponse } from 'next/og'
 
export const size = {
  width: 48,
  height: 48,
}
export const contentType = 'image/png'
 
// Image generation
export default function Favicon() {
  return new ImageResponse(
    (
        <div 
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
            borderRadius: '8px',
          }}
        >
          <span 
            style={{
              fontSize: '28px',
              fontWeight: 'bold',
              color: 'white',
              fontFamily: 'system-ui, -apple-system, sans-serif',
            }}
          >
            H
          </span>
        </div>
    ),
    {
      ...size,
    }
  )
}
