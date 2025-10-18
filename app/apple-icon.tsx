import { ImageResponse } from 'next/og'
 
export const size = {
  width: 180,
  height: 180,
}
export const contentType = 'image/png'
 
// Image generation
export default function AppleIcon() {
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
            borderRadius: '40px',
          }}
        >
          <span 
            style={{
              fontSize: '90px',
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
