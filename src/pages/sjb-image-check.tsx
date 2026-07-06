// TEMPORARY PAGE — delete after confirming image mapping
export default function SjbImageCheck() {
  const images = [
    { num: 1, slot: '/airo-assets/images/products/sjb-img-1', file: '11.34.49' },
    { num: 2, slot: '/airo-assets/images/products/sjb-img-2', file: '11.37.53' },
    { num: 3, slot: '/airo-assets/images/products/sjb-img-3', file: '11.42.58' },
    { num: 4, slot: '/airo-assets/images/products/sjb-img-4', file: '11.42.59' },
    { num: 5, slot: '/airo-assets/images/products/sjb-img-5', file: '11.45.41' },
    { num: 6, slot: '/airo-assets/images/products/sjb-img-6', file: '11.45.42' },
    { num: 7, slot: '/airo-assets/images/products/sjb-img-7', file: '11.54.55' },
    { num: 8, slot: '/airo-assets/images/products/sjb-img-8', file: '11.54.55 (1)' },
  ];
  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <h1 className="text-2xl font-black mb-2">Image Mapping Check</h1>
      <p className="text-slate-500 mb-6 text-sm">Tell me which number = CRCA / SS / FRP / GRP / PC</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((img) => (
          <div key={img.num} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <img src={img.slot} alt={`Image ${img.num}`} className="w-full aspect-square object-cover" />
            <div className="p-2 text-center">
              <p className="font-black text-lg text-orange-500">#{img.num}</p>
              <p className="text-xs text-slate-400">{img.file}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
