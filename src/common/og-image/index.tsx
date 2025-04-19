import { Resvg } from '@resvg/resvg-js';
import satori, { type Font } from 'satori';
import path from 'path';
import fs from 'fs';

const blogURL = 'blog.evecalm.com';

const logoURL = `data:image/png;base64,${fs.readFileSync(path.resolve('./assets/logo.png')).toString('base64')}`;

export const ogFontFallback: Font[] = [
  {
    name: 'Inter',
    data: fs.readFileSync(path.resolve('./assets/Inter_18pt-Regular.ttf')),
    weight: 400,
    style: 'normal',
  },
  {
    name: 'Noto Sans SC',
    data: fs.readFileSync(path.resolve('./assets/NotoSansSC-Regular.ttf')),
    weight: 400,
    style: 'normal',
  },
];

export async function generateOgImage({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  const svg = await satori(
    <div style={{
      width: '1200px',
      height: '630px',
      backgroundColor: '#f1f5f9',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'Inter, \"Noto Sans SC\"',
    }}>
      <div style={{
        width: '1100px',
        height: '500px',
        backgroundColor: '#ffffff',
        borderRadius: '24px',
        padding: '60px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <img src={logoURL} width={60} height={60} />
          <span style={{ fontSize: 24, color: '#94a3b8' }}>{blogURL}</span>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ fontSize: 54, fontWeight: 700, color: '#0f172a', lineHeight: 1.3 }}>{title}</div>
          <div style={{ fontSize: 28, color: '#475569', marginTop: 24 }}>{description}</div>
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: ogFontFallback,
    }
  );

  const resvg = new Resvg(svg);
  const png = resvg.render().asPng();
  return png;
}
