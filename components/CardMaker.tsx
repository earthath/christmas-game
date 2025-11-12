import { useState, useRef } from 'react';
import { ArrowLeft, Download, Mail as MailIcon, Share2, RotateCcw } from 'lucide-react';
import html2canvas from 'html2canvas';

interface CardMakerProps {
  onBack: () => void;
}

type Tab = 'background' | 'text' | 'image' | 'decoration' | 'options';
type Template = 'classic' | 'winter' | 'elegant' | 'postcard';

export function CardMaker({ onBack }: CardMakerProps) {
  const [activeTab, setActiveTab] = useState<Tab>('background');
  const [template, setTemplate] = useState<Template>('classic');
  const [bgColor, setBgColor] = useState('#C8102E');
  const [message, setMessage] = useState('Merry Christmas!');
  const [textColor, setTextColor] = useState('#FFFFFF');
  const [textSize, setTextSize] = useState(32);
  const [textAlign, setTextAlign] = useState<'left' | 'center' | 'right'>('center');
  const [font, setFont] = useState('Poppins');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [imageOpacity, setImageOpacity] = useState(100);
  const [imageSize, setImageSize] = useState(100);
  const [decorations, setDecorations] = useState<Array<{ emoji: string; x: number; y: number }>>([]);
  const [stampImage, setStampImage] = useState<string | null>(null);
  const [toAddress, setToAddress] = useState('');
  
  const cardRef = useRef<HTMLDivElement>(null);

  const colors = ['#C8102E', '#0F5132', '#FFB81C', '#FFFFFF', '#1E3A8A', '#9333EA', '#DC2626', '#059669'];
  const fonts = ['Poppins', 'Dancing Script', 'Kalam', 'Georgia'];
  const emojiDecorations = ['🎄', '⛄', '🎅', '🎁', '❄️', '⭐', '🔔', '🦌', '🕯️', '🍪', '🎶', '✨'];

  const templates = [
    { id: 'classic' as Template, name: 'Classic', bg: '#C8102E' },
    { id: 'winter' as Template, name: 'Winter', bg: '#1E3A8A' },
    { id: 'elegant' as Template, name: 'Elegant', bg: '#0F5132' },
    { id: 'postcard' as Template, name: 'Postcard', bg: '#FFFFFF' },
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStampUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setStampImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addDecoration = (emoji: string) => {
    setDecorations([
      ...decorations,
      { emoji, x: Math.random() * 70 + 15, y: Math.random() * 70 + 15 },
    ]);
  };

  const downloadCard = async () => {
    if (!cardRef.current) return;
    const canvas = await html2canvas(cardRef.current);
    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'christmas-card.png';
    link.href = url;
    link.click();
  };

  const shareCard = async () => {
    if (!cardRef.current) return;
    const canvas = await html2canvas(cardRef.current);
    canvas.toBlob((blob) => {
      if (blob && navigator.share) {
        const file = new File([blob], 'christmas-card.png', { type: 'image/png' });
        navigator.share({ files: [file], title: 'Christmas Card' }).catch(() => {});
      }
    });
  };

  const resetCard = () => {
    setTemplate('classic');
    setBgColor('#C8102E');
    setMessage('Merry Christmas!');
    setTextColor('#FFFFFF');
    setTextSize(32);
    setTextAlign('center');
    setFont('Poppins');
    setUploadedImage(null);
    setDecorations([]);
    setStampImage(null);
    setToAddress('');
  };

  const tabs = [
    { id: 'background' as Tab, label: 'Background' },
    { id: 'text' as Tab, label: 'Text' },
    { id: 'image' as Tab, label: 'Image' },
    { id: 'decoration' as Tab, label: 'Decorations' },
    { id: 'options' as Tab, label: 'Options' },
  ];

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 mb-6 px-4 py-2 rounded-xl backdrop-blur-xl bg-white/8 border border-white/12 hover:bg-white/12 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <h2 className="text-3xl sm:text-4xl text-[#FFB81C] mb-8">✉️ Christmas Card Maker</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Preview */}
          <div className="flex flex-col items-center">
            <div
              ref={cardRef}
              className="w-full max-w-[600px] aspect-[5/4] rounded-2xl overflow-hidden relative shadow-2xl"
              style={{
                backgroundColor: template === 'postcard' ? '#FFFFFF' : bgColor,
                fontFamily: font,
              }}
            >
              {uploadedImage && (
                <img
                  src={uploadedImage}
                  alt="Uploaded"
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ opacity: imageOpacity / 100, transform: `scale(${imageSize / 100})` }}
                />
              )}

              {template === 'postcard' ? (
                <div className="h-full flex">
                  {/* Left side - Message */}
                  <div className="flex-1 p-8 flex items-center justify-center">
                    <p
                      style={{
                        color: '#000000',
                        fontSize: `${textSize}px`,
                        textAlign: textAlign,
                      }}
                    >
                      {message}
                    </p>
                  </div>

                  {/* Vertical divider */}
                  <div className="w-px bg-gray-300" />

                  {/* Right side - Address */}
                  <div className="flex-1 p-8 relative">
                    <textarea
                      value={toAddress}
                      onChange={(e) => setToAddress(e.target.value)}
                      placeholder="To:&#10;Name&#10;Address&#10;City, State ZIP"
                      className="w-full h-3/4 bg-transparent border-none resize-none text-black placeholder-gray-400 focus:outline-none"
                      style={{ fontFamily: font === 'Dancing Script' || font === 'Kalam' ? font : 'Poppins' }}
                    />
                    
                    {/* Stamp area */}
                    <div className="absolute top-8 right-8 w-16 h-16 border-2 border-dashed border-gray-400 flex items-center justify-center">
                      {stampImage ? (
                        <img src={stampImage} alt="Stamp" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-2xl">🎄</span>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center p-8 relative">
                  <p
                    style={{
                      color: textColor,
                      fontSize: `${textSize}px`,
                      textAlign: textAlign,
                    }}
                  >
                    {message}
                  </p>
                </div>
              )}

              {decorations.map((dec, i) => (
                <div
                  key={i}
                  className="absolute text-4xl cursor-move"
                  style={{ left: `${dec.x}%`, top: `${dec.y}%` }}
                >
                  {dec.emoji}
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="backdrop-blur-xl bg-white/8 border border-white/12 rounded-2xl p-6 max-h-[600px] overflow-y-auto">
            {/* Tabs */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                    activeTab === tab.id
                      ? 'bg-[#C8102E] text-white'
                      : 'bg-white/8 hover:bg-white/12'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="space-y-4">
              {activeTab === 'background' && (
                <>
                  <div>
                    <label className="block mb-2 text-sm">Template</label>
                    <div className="grid grid-cols-2 gap-2">
                      {templates.map((t) => (
                        <button
                          key={t.id}
                          onClick={() => {
                            setTemplate(t.id);
                            setBgColor(t.bg);
                          }}
                          className={`p-3 rounded-lg border-2 transition-all ${
                            template === t.id
                              ? 'border-[#C8102E] bg-white/12'
                              : 'border-white/12 bg-white/8 hover:bg-white/12'
                          }`}
                        >
                          {t.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {template !== 'postcard' && (
                    <div>
                      <label className="block mb-2 text-sm">Background Color</label>
                      <div className="grid grid-cols-4 gap-2">
                        {colors.map((color) => (
                          <button
                            key={color}
                            onClick={() => setBgColor(color)}
                            className={`w-full aspect-square rounded-lg border-2 transition-all ${
                              bgColor === color ? 'border-white scale-110' : 'border-white/20'
                            }`}
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}

              {activeTab === 'text' && (
                <>
                  <div>
                    <label className="block mb-2 text-sm">Message</label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full p-3 rounded-lg bg-white/8 border border-white/12 text-white resize-none focus:outline-none focus:border-white/20"
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm">Text Size: {textSize}px</label>
                    <input
                      type="range"
                      min="16"
                      max="64"
                      value={textSize}
                      onChange={(e) => setTextSize(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm">Text Color</label>
                    <div className="grid grid-cols-4 gap-2">
                      {colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setTextColor(color)}
                          className={`w-full aspect-square rounded-lg border-2 transition-all ${
                            textColor === color ? 'border-white scale-110' : 'border-white/20'
                          }`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm">Font</label>
                    <select
                      value={font}
                      onChange={(e) => setFont(e.target.value)}
                      className="w-full p-3 rounded-lg bg-white/8 border border-white/12 text-white focus:outline-none focus:border-white/20"
                    >
                      {fonts.map((f) => (
                        <option key={f} value={f} style={{ fontFamily: f }}>
                          {f}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm">Alignment</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['left', 'center', 'right'] as const).map((align) => (
                        <button
                          key={align}
                          onClick={() => setTextAlign(align)}
                          className={`p-3 rounded-lg border transition-all ${
                            textAlign === align
                              ? 'border-[#C8102E] bg-white/12'
                              : 'border-white/12 bg-white/8 hover:bg-white/12'
                          }`}
                        >
                          {align}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'image' && (
                <>
                  <div>
                    <label className="block mb-2 text-sm">Upload Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="w-full p-3 rounded-lg bg-white/8 border border-white/12 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#C8102E] file:text-white hover:file:bg-[#A00D25] cursor-pointer"
                    />
                  </div>

                  {uploadedImage && (
                    <>
                      <div>
                        <label className="block mb-2 text-sm">Opacity: {imageOpacity}%</label>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={imageOpacity}
                          onChange={(e) => setImageOpacity(Number(e.target.value))}
                          className="w-full"
                        />
                      </div>

                      <div>
                        <label className="block mb-2 text-sm">Size: {imageSize}%</label>
                        <input
                          type="range"
                          min="50"
                          max="150"
                          value={imageSize}
                          onChange={(e) => setImageSize(Number(e.target.value))}
                          className="w-full"
                        />
                      </div>
                    </>
                  )}

                  {template === 'postcard' && (
                    <div>
                      <label className="block mb-2 text-sm">Stamp Image</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleStampUpload}
                        className="w-full p-3 rounded-lg bg-white/8 border border-white/12 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#C8102E] file:text-white hover:file:bg-[#A00D25] cursor-pointer"
                      />
                    </div>
                  )}
                </>
              )}

              {activeTab === 'decoration' && (
                <div>
                  <label className="block mb-2 text-sm">Add Decorations</label>
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                    {emojiDecorations.map((emoji) => (
                      <button
                        key={emoji}
                        onClick={() => addDecoration(emoji)}
                        className="aspect-square text-3xl p-2 rounded-lg bg-white/8 hover:bg-white/12 border border-white/12 hover:border-white/20 transition-all"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setDecorations([])}
                    className="mt-4 w-full p-3 rounded-lg bg-white/8 hover:bg-white/12 border border-white/12 transition-all"
                  >
                    Clear Decorations
                  </button>
                </div>
              )}

              {activeTab === 'options' && (
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={downloadCard}
                    className="flex items-center justify-center gap-2 p-4 rounded-lg bg-[#C8102E] hover:bg-[#A00D25] transition-all"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                  <button
                    onClick={shareCard}
                    className="flex items-center justify-center gap-2 p-4 rounded-lg bg-[#0F5132] hover:bg-[#0A3D24] transition-all"
                  >
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                  <button
                    onClick={resetCard}
                    className="flex items-center justify-center gap-2 p-4 rounded-lg bg-white/8 hover:bg-white/12 border border-white/12 transition-all col-span-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reset Card
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
