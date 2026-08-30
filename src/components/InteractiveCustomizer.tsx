import { useState, useRef, useEffect } from 'react';
import { Sparkles, Sliders, Volume2, VolumeX, Plus, Check, ShoppingCart, HelpCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { Product, CartItem } from '../types';

interface CustomizerProps {
  coreProduct: Product;
  onAddToCart: (product: Product, selectedColor: string) => void;
}

interface LightingMode {
  id: string;
  name: string;
  description: string;
  gradient: string;
  glowColor: string;
  soundType: 'sunset' | 'forest' | 'cyber' | 'dawn';
}

const MODES: LightingMode[] = [
  {
    id: 'sunset',
    name: 'Sunset Radiance',
    description: 'Slow-pulsing twilight hues to trigger natural melatonin production.',
    gradient: 'from-orange-500 via-amber-500 to-rose-500',
    glowColor: 'rgba(249, 115, 22, 0.45)',
    soundType: 'sunset',
  },
  {
    id: 'forest',
    name: 'Midnight Forest',
    description: 'Deep therapeutic chlorophyl greens and blues to lower heart rate.',
    gradient: 'from-emerald-500 via-teal-600 to-blue-600',
    glowColor: 'rgba(16, 185, 129, 0.45)',
    soundType: 'forest',
  },
  {
    id: 'cyber',
    name: 'Cyber Ambient',
    description: 'Bright electric indigo and ultra-pink rays to enhance neural focus.',
    gradient: 'from-pink-500 via-purple-600 to-indigo-600',
    glowColor: 'rgba(236, 72, 153, 0.45)',
    soundType: 'cyber',
  },
  {
    id: 'dawn',
    name: 'Solar Dawn',
    description: 'Clean high-energy cyan and warm gold beams to ease morning fatigue.',
    gradient: 'from-yellow-400 via-teal-400 to-cyan-500',
    glowColor: 'rgba(34, 211, 238, 0.45)',
    soundType: 'dawn',
  },
];

export default function InteractiveCustomizer({ coreProduct, onAddToCart }: CustomizerProps) {
  const [selectedColor, setSelectedColor] = useState('Quartz Silver');
  const [currentMode, setCurrentMode] = useState<LightingMode>(MODES[0]);
  const [amplitude, setAmplitude] = useState(50);
  const [speed, setSpeed] = useState(40);
  const [hasEngraving, setHasEngraving] = useState(false);
  const [engravingText, setEngravingText] = useState('');
  const [hasExtraCare, setHasExtraCare] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  // Web Audio Synth reference
  const audioCtxRef = useRef<AudioContext | null>(null);
  const osc1Ref = useRef<OscillatorNode | null>(null);
  const osc2Ref = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const filterNodeRef = useRef<BiquadFilterNode | null>(null);

  // Cleanup synthesizer on unmount
  useEffect(() => {
    return () => {
      stopSynthesizer();
    };
  }, []);

  // Update oscillator parameters when speed, amplitude, or mode changes
  useEffect(() => {
    if (!isAudioPlaying || !gainNodeRef.current) return;

    const baseFreq = getFrequencyForMode(currentMode.id);
    const modFactor = amplitude / 50; // default 1
    const playbackSpeed = speed / 40; // default 1

    if (osc1Ref.current) {
      try {
        osc1Ref.current.frequency.setValueAtTime(baseFreq, audioCtxRef.current?.currentTime || 0);
      } catch {}
    }
    if (osc2Ref.current) {
      try {
        osc2Ref.current.frequency.setValueAtTime(baseFreq * 1.5 + (2 * modFactor), audioCtxRef.current?.currentTime || 0);
      } catch {}
    }
    if (filterNodeRef.current) {
      try {
        filterNodeRef.current.frequency.setValueAtTime(300 + (amplitude * 5), audioCtxRef.current?.currentTime || 0);
      } catch {}
    }
  }, [currentMode, amplitude, speed, isAudioPlaying]);

  const getFrequencyForMode = (modeId: string): number => {
    switch (modeId) {
      case 'sunset': return 110; // A2 (warm drone)
      case 'forest': return 73.42; // D2 (deep grounded drone)
      case 'cyber': return 130.81; // C3 (higher intellectual pitch)
      case 'dawn': return 146.83; // D3 (refreshing bright note)
      default: return 110;
    }
  };

  const startSynthesizer = () => {
    try {
      // Create audio context if not exists
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContextClass();
      }

      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      const ctx = audioCtxRef.current;
      
      // Main volume filter nodes
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 300 + (amplitude * 5);
      filterNodeRef.current = filter;

      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 1.5); // Fade in gracefully
      gainNodeRef.current = gainNode;

      // Two warm oscillators to create rich micro-tuned ambient chord
      const osc1 = ctx.createOscillator();
      osc1.type = 'triangle';
      osc1.frequency.value = getFrequencyForMode(currentMode.id);
      osc1Ref.current = osc1;

      const osc2 = ctx.createOscillator();
      osc2.type = 'sine';
      osc2.frequency.value = getFrequencyForMode(currentMode.id) * 1.5 + 2;
      osc2Ref.current = osc2;

      // Connections
      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc1.start();
      osc2.start();
      filterNodeRef.current = filter;
      setIsAudioPlaying(true);
    } catch (e) {
      console.warn("Audio Context init blocked or failed: ", e);
    }
  };

  const stopSynthesizer = () => {
    if (gainNodeRef.current && audioCtxRef.current) {
      const ctx = audioCtxRef.current;
      try {
        // Fade out before stopping to avoid speaker pops
        gainNodeRef.current.gain.setValueAtTime(gainNodeRef.current.gain.value, ctx.currentTime);
        gainNodeRef.current.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.3);
        
        setTimeout(() => {
          try {
            osc1Ref.current?.stop();
            osc2Ref.current?.stop();
            osc1Ref.current = null;
            osc2Ref.current = null;
          } catch {}
        }, 350);
      } catch {}
    }
    setIsAudioPlaying(false);
  };

  const toggleSoundscape = () => {
    if (isAudioPlaying) {
      stopSynthesizer();
    } else {
      startSynthesizer();
    }
  };

  // Compute final price
  const basePrice = coreProduct.price;
  const customizationPrice = (hasEngraving ? 20 : 0) + (hasExtraCare ? 15 : 0);
  const totalPrice = basePrice + customizationPrice;

  const handleAddToCartClick = () => {
    // Generate specialized product metadata for customized unit
    let title = coreProduct.name;
    let descriptionPlus = '';
    
    if (hasEngraving && engravingText.trim()) {
      title += ` (Engraved: "${engravingText}")`;
      descriptionPlus += `Custom engraving: "${engravingText.trim()}". `;
    }
    if (hasExtraCare) {
      title += ' + 3-Year Extra Care';
      descriptionPlus += '3-Year Extra Care warranty extension. ';
    }

    const customizedProduct: Product = {
      ...coreProduct,
      name: title,
      price: totalPrice,
      description: coreProduct.description + (descriptionPlus ? ` [Addons: ${descriptionPlus}]` : ''),
    };

    onAddToCart(customizedProduct, selectedColor);
  };

  return (
    <section id="customizer" className="py-20 bg-slate-900 border-y border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            Design Your Personal Acoustic Beacon
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Interact with our simulation engine. Customize light gradients, physical shell options, and ambient acoustics to construct the perfect desk centerpiece.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start" id="customizer-widget">
          
          {/* LEFT COLUMN: 3D-Simulation visual preview */}
          <div className="lg:col-span-7 bg-slate-950 p-6 sm:p-10 rounded-3xl border border-slate-800/80 shadow-2xl relative flex flex-col items-center justify-center min-h-[480px]">
            
            {/* Ambient light spill behind simulator */}
            <div 
              style={{ background: currentMode.glowColor }} 
              className="absolute inset-[15%] rounded-full blur-[80px] pointer-events-none transition-all duration-700"
            ></div>

            {/* Simulated projection light rays */}
            <div className="absolute top-20 w-64 h-64 flex flex-col items-center justify-end">
              <div className={`w-32 h-[120px] bg-gradient-to-t ${currentMode.gradient} opacity-20 blur-md rounded-full origin-bottom transform scale-75 translate-y-12 animate-pulse`}></div>
            </div>

            {/* Inside Customizer Interactive Device Stage */}
            <div className="relative z-10 w-64 h-80 flex flex-col items-center mt-6">
              
              {/* Projected Aura Soundwave Visualizer lines in center */}
              <div className="h-40 w-44 flex items-center justify-center relative mb-4">
                
                {/* Simulated Floating Clock */}
                <div className="absolute top-4">
                  <span className="block font-sans text-stone-200 text-[10px] font-semibold tracking-[0.2em] uppercase opacity-70">
                    AURA PROJECTION
                  </span>
                </div>

                {/* Vertical soundscape wave bars pulsing dynamically relative to amplitude and speed state */}
                <div className="flex items-end justify-center space-x-1.5 h-16 w-full px-4">
                  {[...Array(9)].map((_, i) => {
                    const waveHeight = (amplitude * 0.7) * (1 - Math.abs(4 - i) * 0.15) * (0.8 + Math.sin(Date.now()*0.003 + i)*0.2);
                    return (
                      <motion.div
                        key={i}
                        animate={{
                          height: [10, Math.max(12, Math.min(80, waveHeight)), 10],
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: Math.max(0.6, 2 - (speed / 50)),
                          delay: i * 0.08,
                          ease: "easeInOut",
                        }}
                        className={`w-1 bg-gradient-to-t ${currentMode.gradient} rounded-full opacity-80`}
                        style={{ height: '15px' }}
                      />
                    );
                  })}
                </div>

                {/* Outer magnetic sphere boundary simulation */}
                <div className="absolute inset-0 rounded-full border border-dashed border-cyan-500/10 animate-spin" style={{ animationDuration: '60s' }}></div>
              </div>

              {/* Physical Glass Capsule Custom Shell Base */}
              <div className="relative w-40 h-28 bg-slate-900/60 border border-slate-700/60 rounded-3xl backdrop-blur-md shadow-inner flex flex-col justify-between items-center py-2.5 overflow-hidden">
                <div className="absolute inset-x-0 bottom-0 h-10 bg-slate-950/20"></div>

                {/* Center glowing LED tube containing mode gradient */}
                <div className={`w-2.5 h-14 rounded-full bg-gradient-to-t ${currentMode.gradient} shadow-[0_0_15px_rgba(34,211,238,0.5)] transition-all duration-500`}></div>
                
                {/* Mechanical model serial label */}
                <div className="w-full flex justify-between items-center px-4">
                  <span className="font-mono text-[8px] text-slate-500 tracking-wider">SHELL: {selectedColor.toUpperCase()}</span>
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                  </div>
                </div>
              </div>

              {/* Dynamic Selected Solid Base finish color */}
              <div 
                className={`w-44 h-5 rounded-b-xl border-t shadow-md transition-all duration-500 relative ${
                  selectedColor === 'Quartz Silver'
                    ? 'from-slate-300 via-slate-100 to-slate-300 border-white/20'
                    : selectedColor === 'Obsidian Black'
                    ? 'from-slate-900 via-slate-800 to-slate-900 border-slate-700/80'
                    : 'from-amber-100 via-amber-200 to-amber-100 border-amber-300/10'
                }`}
                style={{ background: 'linear-gradient(to right, var(--tw-gradient-stops))' }}
              >
                {/* Silver highlights */}
                <div className="absolute top-0 inset-x-0 h-0.5 bg-white/20"></div>
              </div>

              {/* Laser Engraving Visual placeholder */}
              {hasEngraving && engravingText && (
                <div className="mt-2 text-center">
                  <span className="font-mono text-[9px] text-yellow-400/80 tracking-widest uppercase">
                    &ldquo;{engravingText.slice(0, 24)}&rdquo;
                  </span>
                </div>
              )}
            </div>

            {/* Sound Activate toggle button inside visual center */}
            <div className="absolute bottom-4 left-4 z-20">
              <button
                onClick={toggleSoundscape}
                className={`p-3 rounded-full flex items-center space-x-2 border transition-all duration-300 shadow-lg cursor-pointer ${
                  isAudioPlaying
                    ? 'bg-rose-500/10 border-rose-500 text-rose-400'
                    : 'bg-slate-900 border-slate-800 hover:border-cyan-500 text-cyan-400'
                }`}
              >
                {isAudioPlaying ? <VolumeX className="w-4 h-4 animate-bounce" /> : <Volume2 className="w-4 h-4" />}
                <span className="text-xs font-semibold font-mono tracking-wider pr-1">
                  {isAudioPlaying ? 'Mute Acoustic Sync' : 'Hear Acoustic Drone'}
                </span>
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: Configuration controllers */}
          <div className="lg:col-span-5 space-y-8" id="customizer-options">
            
            {/* Option Block 1: Device Finish Finish */}
            <div className="space-y-3">
              <span className="block text-xs uppercase tracking-widest text-cyan-400 font-mono font-semibold">
                STEP 01 — PHYSICAL COLOR SHELL
              </span>
              <h3 className="text-lg font-bold text-white font-sans">Anodized Base Color</h3>
              
              <div className="grid grid-cols-3 gap-3">
                {coreProduct.colorOptions?.map((color) => {
                  const active = selectedColor === color.name;
                  return (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`p-3 rounded-xl border flex flex-col items-center justify-between space-y-2 cursor-pointer transition-all duration-300 text-left ${
                        active 
                          ? 'bg-cyan-500/5 border-cyan-500 text-white shadow-lg' 
                          : 'bg-slate-900 hover:bg-slate-800/80 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <div className="w-6 h-6 rounded-full border border-white/10 shadow-inner relative" style={{ backgroundColor: color.hex }}>
                        {active && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Check className="w-3 h-3 text-slate-950 font-extrabold stroke-[3]" />
                          </div>
                        )}
                      </div>
                      <span className="text-xs font-medium font-sans text-center">{color.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Option Block 2: Lighting gradient aura preset */}
            <div className="space-y-3">
              <span className="block text-xs uppercase tracking-widest text-cyan-400 font-mono font-semibold">
                STEP 02 — OPTICAL AMBIENT PRESETS
              </span>
              <h3 className="text-lg font-bold text-white font-sans">Acoustic-Optical Wave Wavelength</h3>
              
              <div className="grid grid-cols-2 gap-3" id="gradient-presets">
                {MODES.map((mode) => {
                  const active = currentMode.id === mode.id;
                  return (
                    <button
                      key={mode.id}
                      onClick={() => setCurrentMode(mode)}
                      className={`p-3 rounded-xl border text-left cursor-pointer transition-all duration-300 relative overflow-hidden group ${
                        active 
                          ? 'bg-cyan-500/5 border-cyan-500 text-white shadow-lg' 
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <div className={`absolute top-0 right-0 w-8 h-8 rounded-bl-full bg-gradient-to-tr ${mode.gradient} opacity-50`}></div>
                      <span className="block text-xs font-bold text-white mb-1">{mode.name}</span>
                      <span className="block text-[11px] text-slate-400 leading-normal line-clamp-2">{mode.description}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Option Block 3: Dynamic Sliders */}
            <div className="space-y-4 bg-slate-950/40 p-5 rounded-2xl border border-slate-800">
              <div className="flex items-center space-x-2">
                <Sliders className="w-4 h-4 text-cyan-500" />
                <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400">Optical Fine-Tuning Simulator</h3>
              </div>

              {/* Slider 1: Amplitude */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400 font-sans">Wave Height (Amplitude)</span>
                  <span className="font-mono text-cyan-400">{amplitude}%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={amplitude}
                  onChange={(e) => setAmplitude(Number(e.target.value))}
                  className="w-full accent-cyan-500/70 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Slider 2: Pulse speed */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400 font-sans">Pulse Speed (Frequency)</span>
                  <span className="font-mono text-cyan-400">{speed}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="90"
                  value={speed}
                  onChange={(e) => setSpeed(Number(e.target.value))}
                  className="w-full accent-indigo-500/70 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>

            {/* Option Block 4: Luxury Premium Adds */}
            <div className="space-y-3" id="customizer-addons">
              <span className="block text-xs uppercase tracking-widest text-cyan-400 font-mono font-semibold">
                STEP 03 — SIGNATURE TOUCHES (OPTIONAL)
              </span>
              <h3 className="text-lg font-bold text-white font-sans">Premium Add-ons</h3>
              
              <div className="space-y-3">
                {/* Personalized Laser Engraving */}
                <div className={`p-4 rounded-xl border transition-all duration-300 ${hasEngraving ? 'bg-cyan-500/5 border-cyan-500/70' : 'bg-slate-900 border-slate-800'}`}>
                  <label className="flex items-start justify-between cursor-pointer">
                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        checked={hasEngraving}
                        onChange={(e) => setHasEngraving(e.target.checked)}
                        className="mt-1 accent-cyan-500 w-4 h-4 rounded"
                      />
                      <div>
                        <span className="block text-sm font-bold text-white">Custom Laser Engraving</span>
                        <p className="block text-xs text-slate-400 mt-1">Carve your initials, solar coordinates or name into the unibody base. (+ $20)</p>
                      </div>
                    </div>
                  </label>
                  {hasEngraving && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      className="mt-3 pl-7"
                    >
                      <input
                        type="text"
                        maxLength={24}
                        placeholder="Enter engraving text (max 24 characters)"
                        value={engravingText}
                        onChange={(e) => setEngravingText(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700 focus:border-cyan-500 focus:outline-none rounded-lg py-2 px-3 text-xs text-slate-200 font-mono tracking-wider"
                      />
                    </motion.div>
                  )}
                </div>

                {/* Extended Warranty Extended Protection */}
                <div className={`p-4 rounded-xl border transition-all duration-300 ${hasExtraCare ? 'bg-cyan-500/5 border-cyan-500/70' : 'bg-slate-900 border-slate-800'}`}>
                  <label className="flex items-start justify-between cursor-pointer">
                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        checked={hasExtraCare}
                        onChange={(e) => setHasExtraCare(e.target.checked)}
                        className="mt-1 accent-cyan-500 w-4 h-4 rounded"
                      />
                      <div>
                        <span className="block text-sm font-bold text-white">AuraCare 3-Year Extra Protection</span>
                        <p className="block text-xs text-slate-400 mt-1">Extended hardware replacement support covering drops, accidental spillages and optical alignment. (+ $15)</p>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Total checkout calculator with button CTA */}
            <div className="p-6 bg-slate-950 border border-slate-800/80 rounded-2xl flex flex-col sm:flex-row items-center sm:justify-between gap-4 justify-center">
              <div>
                <span className="block text-[10px] font-mono tracking-widest text-slate-500 uppercase">Estimated Total</span>
                <span className="text-3xl font-extrabold text-white font-sans tracking-tight">
                  ${totalPrice}
                </span>
                <span className="text-xs text-emerald-400 hover:underline block cursor-pointer mt-0.5">Free Premium Express Shipping Included</span>
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleAddToCartClick}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm tracking-wide shadow-lg shadow-cyan-500/10 flex items-center justify-center space-x-2.5 transition-all duration-300 cursor-pointer"
                id="btn-customizer-add-to-cart"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add Custom Unit To Cart</span>
              </motion.button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
